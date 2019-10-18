from enum import Enum

from django.db import models

from testing.models import Inquirer
from utils.models import TimestampedMixin


class JobStatuses(Enum):
    NEW = 'NEW'
    IN_PROGRESS = 'IN_PROGRESS'
    DONE = 'DONE'


class InviteJob(TimestampedMixin, models.Model):
    file_path = models.CharField(max_length=256)
    inquirer = models.ForeignKey(Inquirer, on_delete=models.CASCADE)

    status = models.CharField(choices=[(tag.value, tag.name) for tag in JobStatuses], default=JobStatuses.NEW.name,
                              max_length=16)

    def set_in_progress(self, save=True):
        self.status = JobStatuses.IN_PROGRESS.name
        if save:
            self.save()

    def set_done(self, save=True):
        self.status = JobStatuses.DONE.name
        if save:
            self.save()
