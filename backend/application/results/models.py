from django.db import models

from testing.models import Inquirer, UserInquirer, Category, UserTest, Test
from users.models import User


class UserInquirerResult(models.Model):
    user_inquirer = models.ForeignKey(UserInquirer, on_delete=models.CASCADE)
    inquirer = models.ForeignKey(Inquirer, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    score = models.IntegerField(null=True)


class UserTestResult(models.Model):
    inquirer_results = models.ForeignKey(UserInquirerResult, on_delete=models.CASCADE, related_name='test_results')
    user_test = models.ForeignKey(UserTest, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)

    score = models.IntegerField(null=True)


class UserCategoryResult(models.Model):
    test_results = models.ForeignKey(UserTestResult, on_delete=models.CASCADE, related_name='category_results')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    score = models.IntegerField(null=True)
