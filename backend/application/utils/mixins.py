import logging

from django.http import Http404

logger = logging.getLogger(__name__)


class UserRequiredMixin:

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            logger.warn('User is not authenticated')
            raise Http404('Not authorized user')
        return super().dispatch(request, *args, **kwargs)


class SuperuserRequiredMixin:

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            logger.warn('User is not authenticated')
            raise Http404
        if not request.user.is_superuser:
            logger.warn('User is not superuser')
            raise Http404
        return super().dispatch(request, *args, **kwargs)
