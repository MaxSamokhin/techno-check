import datetime
from enum import Enum

from django.db import models

from testing.managers import InquirerManager, TestManager, CategoryManager, QuestionManager, AnswerManager, \
    UserTestManager
from users.models import User
from utils.manager import BaseManager
from utils.models import TimestampedMixin

TITLE_LENGTH = 256


class QuestionTypes(Enum):
    TEST = "TEST"
    MULTIPLE_TEST = "MULTIPLE_TEST"
    VIDEO = "VIDEO"
    TEXT = "TEXT"


class TestStatuses(Enum):
    NEW = "NEW"
    STARTED = "STARTED"
    FINISHED = "FINISHED"


class Inquirer(TimestampedMixin, models.Model):
    title = models.CharField(max_length=TITLE_LENGTH)
    date_start = models.DateTimeField()
    date_end = models.DateTimeField()

    objects = InquirerManager()

    def __str__(self):
        return f'Inquirer: {self.title}'

    class Meta:
        ordering = ('id',)


class Test(TimestampedMixin, models.Model):
    title = models.CharField(max_length=TITLE_LENGTH)

    time_limit = models.TimeField()

    inquirer = models.ForeignKey(Inquirer, on_delete=models.CASCADE, related_name='tests')

    objects = TestManager()

    def __str__(self):
        return f'Test: {self.title}'

    class Meta:
        ordering = ('id',)


class Category(TimestampedMixin, models.Model):
    title = models.CharField(max_length=TITLE_LENGTH)

    test = models.ForeignKey(Test, on_delete=models.CASCADE, related_name='categories')

    objects = CategoryManager()

    def __str__(self):
        return f'Category: {self.title}'

    class Meta:
        ordering = ('id',)


class Question(TimestampedMixin, models.Model):
    title = models.CharField(max_length=TITLE_LENGTH)

    type = models.CharField(choices=[(tag.value, tag.name) for tag in QuestionTypes], max_length=16)

    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='questions')

    manual_check = models.BooleanField(default=False)

    objects = QuestionManager()

    def __str__(self):
        return f'Question: {self.title}'

    class Meta:
        ordering = ('id',)


class Answer(TimestampedMixin, models.Model):
    title = models.CharField(max_length=TITLE_LENGTH)
    score = models.IntegerField()

    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')

    objects = AnswerManager()

    def __str__(self):
        return f'Answer: {self.title}'

    class Meta:
        ordering = ('id',)


class UserInquirer(TimestampedMixin, models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_inquirer')

    inquirer = models.ForeignKey(Inquirer, on_delete=models.CASCADE)

    token = models.CharField(max_length=128)

    objects = BaseManager()


class UserTest(TimestampedMixin, models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    user_inquirer = models.ForeignKey(UserInquirer, on_delete=models.CASCADE, related_name="tests")
    test = models.ForeignKey(Test, on_delete=models.CASCADE)

    status = models.CharField(choices=[(tag.value, tag.name) for tag in TestStatuses], max_length=16)

    started_at = models.DateTimeField(null=True, blank=True)
    finished_at = models.DateTimeField(null=True, blank=True)

    objects = UserTestManager()

    def set_started(self, save=True):
        self.status = TestStatuses.STARTED.name

        test_time = self.test.time_limit

        self.started_at = datetime.datetime.now()
        self.finished_at = self.started_at + datetime.timedelta(
            hours=test_time.hour,
            minutes=test_time.minute,
            seconds=test_time.second
        )
        if save:
            self.save()

    def set_finished(self, save=True):
        from inviter.tasks import calc_user_results
        self.status = TestStatuses.FINISHED.name
        calc_user_results.apply_async(args=[self.user_inquirer.id])
        if save:
            self.save()

    def get_next_question(self):
        return self.questions.filter(answer__isnull=True).first()


class UserQuestion(TimestampedMixin, models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    user_test = models.ForeignKey(UserTest, on_delete=models.CASCADE, related_name='questions')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    objects = BaseManager()


class UserAnswer(TimestampedMixin, models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    user_question = models.ForeignKey(UserQuestion, on_delete=models.CASCADE, related_name='answer')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, blank=True, null=True)

    manual_score = models.IntegerField(default=0)

    text = models.TextField(blank=True, null=True)

    objects = BaseManager()
