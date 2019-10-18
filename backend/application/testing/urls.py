from django.urls import path

from testing.views import UserInquirerDetailsView, UserTestDetailsView, UserTestStart, QuestionDetailView, \
    UserInquirersList

urlpatterns = [
    path('inquirers', UserInquirersList.as_view()),
    path('inquirer/<int:user_inquirer_id>', UserInquirerDetailsView.as_view()),
    path('test/<int:user_test_id>', UserTestDetailsView.as_view()),

    path('test/<int:user_test_id>/start', UserTestStart.as_view()),

    path('question/<int:question_id>', QuestionDetailView.as_view()),
]
