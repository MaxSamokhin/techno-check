from django.db import models
from django.http import Http404


class BaseManager(models.Manager):
    """copypaste of code in methods makes it faster"""

    prefetch = ''

    def _filter_or_404(self, *args, **kwargs):
        item = self.filter(*args, **kwargs)
        if len(item) != 1:
            raise Http404
        return item

    def get_or_404(self, *args, **kwargs):
        item = self._filter_or_404(*args, **kwargs)
        return item[0]

    def get_or_404_joined(self, *args, prefetch=None, **kwargs):
        if not prefetch:
            prefetch = self.prefetch
        item = self.filter(*args, **kwargs).prefetch_related(prefetch)[:1]
        if len(item) != 1:
            raise Http404
        return item[0]

    def all_joined(self):
        return self.all().prefetch_related(self.prefetch)
