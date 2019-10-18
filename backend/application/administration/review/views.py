from administration.review.serializers import InquirerSerializer, UserQuestionSerializer, AnswerScoreSerializer
from testing.models import Inquirer, UserQuestion, UserAnswer
from utils.mixins import SuperuserRequiredMixin
from utils.rest import RestAPI, rest_response, rest_404, JSON_OK, rest_request


class InquirerList(SuperuserRequiredMixin, RestAPI):

    @rest_response(InquirerSerializer, many=True)
    def get(self, request):
        """
        Get inquirers list
        """
        return Inquirer.objects.all()


class InquirerQuestions(SuperuserRequiredMixin, RestAPI):

    @rest_response(UserQuestionSerializer, many=True)
    def get(self, request, inquirer_id):
        """Get user questions """
        return UserQuestion.objects.filter(question__manual_check=True,
                                           user_test__user_inquirer__inquirer_id=inquirer_id,
                                           answer__isnull=False
                                           ).select_related('question', 'user').prefetch_related('answer__answer')


class MarkAnswerView(SuperuserRequiredMixin, RestAPI):

    @rest_404
    @rest_request(AnswerScoreSerializer)
    def post(self, request, serializer, user_question_id):
        """Set answer points (score)"""
        answer = UserAnswer.objects.get(user_question_id=user_question_id, question__manual_check=True)
        answer.manual_score = serializer.validated_data['score']
        answer.save()
        return JSON_OK
