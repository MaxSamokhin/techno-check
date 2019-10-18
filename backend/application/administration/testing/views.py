from django.http import Http404

from inviter.models import InviteJob
from inviter.tasks import load_users
from testing.models import Inquirer, Test, Question, Category, Answer
from users.models import User
from utils.filemanager import save_tmp_file
from utils.mixins import SuperuserRequiredMixin
from utils.rest import RestAPI, rest_response, rest_request, JSON_OK
from .serializers import InquirerDetailsSerializer, InquirerSerializer, TestDetailsSerializer, TestSerializer, \
    QuestionDetailsSerializer, CategoryDetailsSerializer, CategorySerializer, AnswerSerializer, \
    UserSerializer, QuestionDetailsIdSerializer


class InquirerListView(SuperuserRequiredMixin, RestAPI):
    serializer_class = InquirerSerializer

    @rest_response(InquirerDetailsSerializer, many=True)
    def get(self, request):
        """
        Get all inquirers
        """
        return Inquirer.objects.all_joined()

    @rest_request(InquirerSerializer)
    @rest_response(InquirerDetailsSerializer)
    def post(self, request, serializer, *args, **kwargs):
        """Create new inquirer"""
        serialized = Inquirer(**serializer.validated_data)
        serialized.save()
        return serialized


class InquirerDetailsView(SuperuserRequiredMixin, RestAPI):
    http_method_names = ['post', 'get', 'delete']
    serializer_class = InquirerSerializer

    @rest_response(InquirerDetailsSerializer)
    def get(self, request, inquirer_id):
        """Get inquirer info (with related data)"""
        return Inquirer.objects.get_or_404_joined(pk=inquirer_id)

    @rest_request(InquirerSerializer)
    @rest_response(InquirerDetailsSerializer)
    def post(self, request, serialized, inquirer_id):
        """Modify inquirer data (only inquirer, related data stays untouched)"""
        inquirer = Inquirer.objects.filter(pk=inquirer_id)
        if len(inquirer) != 1:
            raise Http404
        inquirer.update(**serialized.validated_data)
        return inquirer.first()

    def delete(self, request, inquirer_id):
        """Delete inquirer"""
        inquirer = Inquirer.objects.get_or_404(pk=inquirer_id)
        inquirer.delete()
        return JSON_OK


class InquirerUsersList(SuperuserRequiredMixin, RestAPI):

    @rest_response(UserSerializer, many=True)
    def get(self, request, inquirer_id):
        """Get invited users"""
        users = User.objects.filter(user_inquirer__inquirer__id=inquirer_id)
        return users

    def post(self, request, inquirer_id):
        """Load users form csv file. Each row is single email"""
        file = request.FILES.get('file')

        inquirer = Inquirer.objects.get_or_404(id=inquirer_id)

        if not file:
            return {'status': 'error', 'message': 'No file provided'}
        if file.content_type not in ('text/csv',):
            return {'status': 'error', 'message': 'Unsupported file format'}

        file_path = save_tmp_file(file)

        invite_job = InviteJob(inquirer=inquirer, file_path=file_path)
        invite_job.save()
        load_users.apply_async(args=(invite_job.id,))
        return {'status': 'ok', 'jobId': invite_job.id}


class TestListView(SuperuserRequiredMixin, RestAPI):
    serializer_class = TestSerializer

    @rest_response(TestDetailsSerializer, many=True)
    def get(self, request, inquirer_id):
        """List all tests in current inquirer"""
        tests = Test.objects.filter(inquirer__id=inquirer_id)
        return tests

    @rest_request(TestSerializer)
    @rest_response(TestDetailsSerializer)
    def post(self, request, serialized, inquirer_id):
        """Add new test to inquirer"""
        inquirer = Inquirer.objects.get_or_404(pk=inquirer_id)
        test = Test(**serialized.validated_data)
        test.inquirer = inquirer
        test.save()
        return test


class TestDetailsView(SuperuserRequiredMixin, RestAPI):
    http_method_names = ['get', 'post', 'delete']

    serializer_class = TestSerializer

    @rest_response(TestDetailsSerializer)
    def get(self, request, test_id):
        """Get test info"""
        return Test.objects.get_or_404(pk=test_id)

    @rest_request(TestSerializer)
    @rest_response(TestDetailsSerializer)
    def post(self, request, serialized, test_id):
        """Modify test"""
        test = Test.objects.filter(pk=test_id)

        if len(test) != 1:
            raise Http404

        test.update(**serialized.validated_data)
        return test.first()

    def delete(self, request, test_id):
        """Delete test"""
        test = Test.objects.get_or_404(pk=test_id)
        test.delete()
        return JSON_OK


class CategoriesListView(SuperuserRequiredMixin, RestAPI):
    serializer_class = CategorySerializer

    @rest_response(CategoryDetailsSerializer, many=True)
    def get(self, request, test_id):
        """List all categories in current test"""
        return Category.objects.filter(test__id=test_id)

    @rest_request(CategorySerializer)
    @rest_response(CategoryDetailsSerializer)
    def post(self, request, serializer, test_id):
        """Create new category in current test"""
        test = Test.objects.get_or_404(id=test_id)
        category = Category(**serializer.validated_data)
        category.test = test
        category.save()
        return category


class CategoryDetailView(SuperuserRequiredMixin, RestAPI):
    http_method_names = ['get', 'post', 'delete']
    serializer_class = CategorySerializer

    @rest_response(CategoryDetailsSerializer)
    def get(self, request, category_id):
        """Get category info"""
        return Category.objects.get_or_404_joined(id=category_id)

    @rest_request(CategorySerializer)
    @rest_response(CategoryDetailsSerializer)
    def post(self, request, serializer, category_id):
        """Modify category"""
        category = Category.objects.filter(id=category_id)
        if len(category) != 1:
            raise Http404
        category.update(**serializer.validated_data)
        return category.first()

    def delete(self, request, category_id):
        """Delete category"""
        category = Category.objects.get_or_404(id=category_id)
        category.delete()
        return JSON_OK


class QuestionsListView(SuperuserRequiredMixin, RestAPI):
    serializer_class = QuestionDetailsSerializer

    @rest_response(QuestionDetailsSerializer, many=True)
    def get(self, request, category_id):
        """Get questions list in current category"""
        return Question.objects.filter(category__id=category_id)

    @rest_request(QuestionDetailsSerializer)
    @rest_response(QuestionDetailsSerializer)
    def post(self, request, serializer, category_id):
        """Create new question, provide answers (method supports related saving)"""
        category = Category.objects.get_or_404(pk=category_id)
        data = serializer.validated_data
        manual_check = data['manual_check'] if 'manual_check' in data else False
        question = Question(type=data['type'], title=data['title'], manual_check=manual_check)
        question.category = category
        question.save()
        if 'answers' in data:
            for item in data['answers']:
                answer = Answer(**item)
                answer.question = question
                answer.save()
        return question


class QuestionDetailView(SuperuserRequiredMixin, RestAPI):
    http_method_names = ['get', 'post', 'delete']
    serializer_class = QuestionDetailsIdSerializer

    @rest_response(QuestionDetailsSerializer)
    def get(self, request, question_id):
        """Get question info"""
        return Question.objects.get_or_404_joined(id=question_id)

    @rest_request(QuestionDetailsIdSerializer)
    @rest_response(QuestionDetailsSerializer)
    def post(self, request, serializer, question_id):
        """Update question, provide related data (not provided questions wouldn't be deleted)"""
        question = Question.objects.filter(id=question_id)

        if len(question) != 1:
            raise Http404

        data = serializer.validated_data
        manual_check = data['manual_check'] if 'manual_check' in data else False
        question.update(type=data['type'], title=data['title'], manual_check=manual_check)
        if 'answers' in data:
            for item in data['answers']:
                if 'id' in item:
                    answer = Answer.objects.filter(id=item['id'])
                    answer.update(**item)
                    continue
                answer = Answer(**item)
                answer.question = question.first()
                answer.save()
        return question.first()

    def delete(self, request, question_id):
        """Delete question"""
        question = Question.objects.get_or_404(id=question_id)
        question.delete()
        return JSON_OK


class AnswersListView(SuperuserRequiredMixin, RestAPI):
    serializer_class = AnswerSerializer

    @rest_response(AnswerSerializer)
    def get(self, request, question_id):
        """List answers in current question"""
        return Answer.objects.get_or_404_joined(question_id=question_id)

    @rest_request(AnswerSerializer)
    @rest_response(AnswerSerializer)
    def post(self, request, serializer, question_id):
        """Create answer"""
        question = Question.objects.get_or_404(pk=question_id)
        answer = Answer(**serializer.validated_data)
        answer.question = question
        answer.save()
        return answer


class AnswerDetailView(SuperuserRequiredMixin, RestAPI):
    http_method_names = ['get', 'post', 'delete']
    serializer_class = AnswerSerializer

    @rest_response(AnswerSerializer)
    def get(self, request, answer_id):
        """Get answer"""
        return Answer.objects.get_or_404(id=answer_id)

    @rest_request(AnswerSerializer)
    @rest_response(AnswerSerializer)
    def post(self, request, serializer, answer_id):
        """Modify answer"""
        answer = Answer.objects.filter(id=answer_id)
        answer.update(**serializer.validated_data)
        return answer.first()

    def delete(self, request, answer_id):
        """Delete answer"""
        answer = Answer.objects.get_or_404(id=answer_id)
        answer.delete()
        return JSON_OK
