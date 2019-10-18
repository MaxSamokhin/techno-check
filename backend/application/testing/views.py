import logging

from django.http import Http404

from testing.models import UserInquirer, UserTest, UserQuestion
from testing.serializers import UserInquirerSerializer, UserTestsSerializer, QuestionDetailsSerializer, \
    QuestionAnswerSerializer
from testing.service import save_answer, WrongDataFormatException, WrongDataException
from utils.mixins import UserRequiredMixin
from utils.rest import RestAPI, rest_response, rest_404, rest_request

logger = logging.getLogger(__name__)


class UserInquirersList(UserRequiredMixin, RestAPI):
    http_method_names = ['get']

    @rest_response(UserInquirerSerializer, many=True)
    def get(self, request):
        """List all inquirers available for current user"""
        return UserInquirer.objects.filter(user=request.user).select_related(
            'inquirer').prefetch_related('tests__test')


class UserInquirerDetailsView(UserRequiredMixin, RestAPI):
    http_method_names = ['get']

    @rest_404
    @rest_response(UserInquirerSerializer)
    def get(self, request, user_inquirer_id):
        return UserInquirer.objects.filter(id=user_inquirer_id, user=request.user).select_related(
            'inquirer').prefetch_related('tests__test')[:1].get()


class UserTestDetailsView(UserRequiredMixin, RestAPI):
    http_method_names = ['get']

    @rest_404
    @rest_response(UserTestsSerializer)
    def get(self, request, user_test_id):
        return UserTest.objects.filter(id=user_test_id, user=request.user).select_related('test')[:1].get()


class UserTestStart(UserRequiredMixin, RestAPI):
    http_method_names = ['post']

    @rest_404
    def post(self, request, user_test_id):
        user_test = UserTest.objects.get(id=user_test_id, user=request.user)
        user_test.set_started()

        next_question = user_test.get_next_question()
        if not next_question:
            user_test.set_finished()
            return {'status': 'finished'}
        return QuestionDetailsSerializer(next_question).data


class QuestionDetailView(UserRequiredMixin, RestAPI):
    http_method_names = ['get', 'post']

    serializer_class = QuestionAnswerSerializer

    @rest_404
    @rest_response(QuestionDetailsSerializer)
    def get(self, request, question_id):
        return UserQuestion.objects.select_related('question').prefetch_related('question__answers').get(
            user=request.user, id=question_id)

    @rest_404
    @rest_request(QuestionAnswerSerializer)
    def post(self, request, serializer, question_id):
        """Answer question takes 1 param from json, based on question type"""
        user_question = UserQuestion.objects.select_related('question').get(id=question_id, user=request.user)

        try:
            save_answer(serializer, user_question, request.user)
        except WrongDataFormatException:
            logger.warning('Question type format and provided data missmatch')
            raise Http404
        except WrongDataException:
            logger.warning('Provided data is wrong')
            raise Http404

        next_question = user_question.user_test.get_next_question()
        if not next_question:
            user_question.user_test.set_finished()
            return {'status': 'finished'}
        return QuestionDetailsSerializer(next_question).data
