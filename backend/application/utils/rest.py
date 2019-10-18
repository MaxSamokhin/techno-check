from functools import wraps
from json import JSONDecodeError

from django.db import models
from django.http import JsonResponse, Http404
from rest_framework.utils import json
from rest_framework.views import APIView

STATUS_BAD_REQUEST = 400
STATUS_NOT_FOUND = 404

JSON_OK = {'status': 'ok'}


def rest_request(serializer, many=False):
    def decorator(func):
        @wraps(func)
        def wrapped(*args, **kwargs):
            request = args[1]
            if request.content_type != 'application/json' or not request.body:
                return JsonResponse({'error': 'true', 'message': 'No JSON data provided'},
                                    status=STATUS_BAD_REQUEST)
            if request.body:
                try:
                    serialized = serializer(data=json.loads(request.body), many=many)
                except JSONDecodeError:
                    return JsonResponse({'status': 'error', 'message': 'Bad JSON format'})
                if serialized.is_valid(raise_exception=True):
                    return func(*(args + (serialized,)), **kwargs)

        return wrapped

    return decorator


def rest_response(serializer, many=False):
    def decorator(func):
        @wraps(func)
        def wrapped(*args, **kwargs):
            response = func(*args, **kwargs)
            return serializer(response, many=many).data

        return wrapped

    return decorator


def rest_404(func):
    @wraps(func)
    def wrapped(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except models.ObjectDoesNotExist:
            raise Http404

    return wrapped


class RestAPI(APIView):
    http_method_names = ['get', 'post']

    serializer_class = None

    def get_serializer(self, *args, **kwargs):
        if self.serializer_class:
            return self.serializer_class(*args, **kwargs)
        return False

    def finalize_response(self, request, response, *args, **kwargs):
        if not (isinstance(response, JsonResponse) or hasattr(response, 'exception') and response.exception):
            response = JsonResponse(response, safe=False)
        return super().finalize_response(request, response, *args, **kwargs)
