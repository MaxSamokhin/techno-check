from users.models import User


def get_or_create_test_user(email):
    """creates or gets user without permission to login, used in tests (invitation by token)"""
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        user = User(username=email, email=email, test_user=True)
        user.save()
    return user
