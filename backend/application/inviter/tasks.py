from application.celery import celery
from authentication.utils import get_or_create_test_user
from inviter.models import InviteJob
from inviter.utils import invite_user
from results.service import calc_user_inquirer_results
# from testing.models import UserInquirer
from testing.utils import create_user_inquirer
from utils.filemanager import iter_tmp_file


# todo: move to inviter
@celery.task
def load_users(job_id):
    """
    loads user form csv file, creates user_inquirer with tests and questions
    and sends invites
    """
    invite_job = InviteJob.objects.get(id=job_id)

    invite_job.set_in_progress()

    user_inquirers = []

    file_reader = iter_tmp_file(invite_job.file_path)

    for email in file_reader:
        user = get_or_create_test_user(email)
        # todo: fix this shit later
        # existing_inquirer = UserInquirer.objects.filter(user=user, inquirer=invite_job.inquirer).first()
        if True:  # not existing_inquirer:
            user_inquirers.append(create_user_inquirer(user, invite_job.inquirer))

    for user_inquirer in user_inquirers:
        invite_user(user_inquirer)

    invite_job.set_done()


@celery.task
def calc_user_results(user_inquirer_id):
    from testing.models import UserInquirer
    user_inquirer = UserInquirer.objects.get(id=user_inquirer_id)
    calc_user_inquirer_results(user_inquirer)
