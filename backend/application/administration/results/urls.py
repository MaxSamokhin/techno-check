from django.urls import path

from .views import InquirerResults

urlpatterns = [
    path('/inquirer/<int:inquirer_id>', InquirerResults.as_view()),
]
