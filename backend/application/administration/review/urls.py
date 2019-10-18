from django.urls import path

from .views import InquirerList, InquirerQuestions, MarkAnswerView

urlpatterns = [
    path('/inquirer', InquirerList.as_view()),
    path('/inquirer/<int:inquirer_id>', InquirerQuestions.as_view()),
    path('/answer/<int:user_question_id>/score', MarkAnswerView.as_view())
]
