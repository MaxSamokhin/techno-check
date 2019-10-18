from testing.models import UserInquirer, UserTest, UserQuestion


def create_test_questions(user_test):
    for category in user_test.test.categories.all():
        for question in category.questions.all():
            user_question = UserQuestion(
                user=user_test.user,
                user_test=user_test,
                category=category,
                question=question
            )
            user_question.save()


def create_user_inquirer(user, inquirer):
    """
    Creates user inquirer with tests and questions
    """
    user_inquirer = UserInquirer(user=user, inquirer=inquirer)
    user_inquirer.save()

    for test in inquirer.tests.all():
        user_test = UserTest(
            user=user,
            user_inquirer=user_inquirer,
            test=test,
        )
        user_test.save()
        create_test_questions(user_test)
    return user_inquirer
