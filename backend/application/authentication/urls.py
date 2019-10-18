from django.urls import path

from authentication.views import AuthView, MeView, TokenAuthorisation, logout_view

urlpatterns = [
    path('/login', AuthView.as_view()),
    path('/logout', logout_view),
    path('/me', MeView.as_view()),
    path('/token', TokenAuthorisation.as_view())
]
