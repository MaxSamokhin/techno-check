from django.urls import path

from .views import InquirerListView, InquirerDetailsView, TestListView, TestDetailsView, QuestionDetailView, \
    CategoriesListView, CategoryDetailView, QuestionsListView, AnswersListView, AnswerDetailView, InquirerUsersList

urlpatterns = [
    path('/inquirer', InquirerListView.as_view()),
    path('/inquirer/<int:inquirer_id>', InquirerDetailsView.as_view()),

    path('/inquirer/<int:inquirer_id>/users', InquirerUsersList.as_view()),

    path('/inquirer/<int:inquirer_id>/tests', TestListView.as_view()),
    path('/test/<int:test_id>', TestDetailsView.as_view()),

    path('/test/<int:test_id>/categories', CategoriesListView.as_view()),
    path('/category/<int:category_id>', CategoryDetailView.as_view()),

    path('/category/<int:category_id>/questions', QuestionsListView.as_view()),
    path('/question/<int:question_id>', QuestionDetailView.as_view()),

    path('/question/<int:question_id>/answers', AnswersListView.as_view()),
    path('/answer/<int:answer_id>', AnswerDetailView.as_view())
]
