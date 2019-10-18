from administration.results.serializers import InquirerResultSerializer
from results.models import UserInquirerResult
from utils.mixins import SuperuserRequiredMixin
from utils.rest import RestAPI, rest_response


class InquirerResults(SuperuserRequiredMixin, RestAPI):

    @rest_response(InquirerResultSerializer, many=True)
    def get(self, request, inquirer_id):
        """
        Get inquirer results
        """

        return UserInquirerResult.objects.filter(inquirer_id=inquirer_id).prefetch_related(
            'test_results__category_results', 'test_results__test',
            'test_results__category_results__category').select_related('inquirer')
