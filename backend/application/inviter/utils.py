import hashlib
from datetime import datetime
from urllib import parse as urlparse

from django.core.mail import send_mail

from application import settings


def send_invitation(email, invite_link):
    # todo: make normal code
    # I am frustrating now
    send_mail(
        'Test invitation',
        f'Invitation link - {invite_link}',
        settings.SERVER_EMAIL,
        [email],
        fail_silently=False,
    )


def generate_token(user, inquirer):
    token = user.email + str(inquirer.id) + inquirer.title + settings.SALT
    token += datetime.now().strftime("%Y:%m:%d:%H:%M:%S:%f")
    m = hashlib.md5()
    m.update(token.encode('utf-8'))
    return m.hexdigest()


def invite_user(user_inquirer):
    user_inquirer.token = generate_token(user_inquirer.user, user_inquirer.inquirer)
    user_inquirer.save()
    send_invitation(user_inquirer.user.email, urlparse.urljoin(settings.HOST_URL, 'auth/' + user_inquirer.token))
