from django.utils import timezone
from rest_framework import serializers


class DateTimeFieldWihTZ(serializers.DateTimeField):
    """
    Class to make output of a DateTime Field timezone aware
    """
    def __init__(self, *args, **kwargs):
        if not kwargs.get('format'):
            kwargs.update({'format': '%Y-%m-%dT%H:%M'})
        super().__init__(*args, **kwargs)

    def to_representation(self, value):
        value = timezone.localtime(value)
        return super(DateTimeFieldWihTZ, self).to_representation(value)
