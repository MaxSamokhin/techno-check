from utils.manager import BaseManager


class InquirerManager(BaseManager):
    prefetch = 'tests__categories__questions__answers'


class TestManager(BaseManager):
    prefetch = 'categories__questions__answers'


class CategoryManager(BaseManager):
    prefetch = 'questions__answers'


class QuestionManager(BaseManager):
    prefetch = 'answers'


class AnswerManager(BaseManager):
    pass


class UserTestManager(BaseManager):
    pass
