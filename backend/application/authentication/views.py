import logging

from django.contrib.auth import login, logout
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from authentication.serializers import AuthSerializer, UserInfoSerializer, TokenSerializer, UserInquirerInfoSerializer
from testing.models import UserInquirer
from users.models import User
from utils.mixins import UserRequiredMixin
from utils.rest import RestAPI, rest_response, rest_request

logger = logging.getLogger(__name__)


class AuthView(RestAPI):
    http_method_names = ['post']

    serializer_class = AuthSerializer

    @rest_request(AuthSerializer)
    def post(self, request, credentials):
        email = credentials['email'].value
        password = credentials['password'].value

        try:
            user = User.objects.get(email=email, test_user=False)
        except User.DoesNotExist:
            logger.warn('User not found with email %s', email)
            return {'status': 'error', 'message': 'User not found'}

        if not user.check_password(password):
            logger.warn('Incorrect password for user with email %s', email)
            return {'status': 'error', 'message': 'User not found'}

        login(request, user)
        return {'status': 'ok'}


class MeView(UserRequiredMixin, RestAPI):
    http_method_names = ['get']

    @rest_response(UserInfoSerializer)
    def get(self, request):
        return request.user


class TokenAuthorisation(RestAPI):
    http_method_names = ['post']
    serializer_class = TokenSerializer

    @rest_request(TokenSerializer)
    @rest_response(UserInquirerInfoSerializer)
    def post(self, request, serializer):
        token = serializer['token'].value
        user_inquire = UserInquirer.objects.get_or_404(token=token)
        user = user_inquire.user
        login(request, user)
        return {'user': user, 'userInquirer': user_inquire}


@require_http_methods(["POST"])
def logout_view(request):
    logout(request)
    return JsonResponse({'status': 'success'})
