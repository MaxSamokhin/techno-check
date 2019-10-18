from django.db import transaction

from results.models import UserInquirerResult, UserTestResult, UserCategoryResult

from testing.models import QuestionTypes


def get_test_score(user_question):
    if user_question.answer.first():
        return user_question.answer.first().answer.score
    return 0


def get_multiple_test_score(user_question):
    scores = 0
    for answer in user_question.answer.all():
        scores += answer.answer.score
    return scores


def get_text_score(user_question):
    if user_question.answer.first():
        return user_question.answer.first().manual_score
    return 0


def get_video_score(user_question):
    if user_question.answer.first():
        return user_question.answer.first().manual_score
    return 0


CALC_MAP = {
    QuestionTypes.TEST.name: get_test_score,
    QuestionTypes.MULTIPLE_TEST.name: get_multiple_test_score,
    QuestionTypes.TEXT.name: get_text_score,
    QuestionTypes.VIDEO.name: get_video_score,
}


def get_question_score(user_question):
    getter = CALC_MAP.get(user_question.question.type)
    if not getter:
        raise NotImplementedError

    return getter(user_question)


def clear_previous_results(user_inquirer):
    try:
        inquirer_results = UserInquirerResult.objects.get(user_inquirer=user_inquirer)
    except UserInquirerResult.DoesNotExist:
        return
    inquirer_results.delete()


def calc_user_inquirer_results(user_inquirer):
    with transaction.atomic():
        clear_previous_results(user_inquirer)

        inquirer_results = UserInquirerResult(user_inquirer=user_inquirer, inquirer=user_inquirer.inquirer,
                                              user=user_inquirer.user, score=0)
        inquirer_results.save()

        for user_test in user_inquirer.tests.all():
            categories_map = {}
            test_results = UserTestResult(inquirer_results=inquirer_results, user_test=user_test, test=user_test.test,
                                          score=0)
            test_results.save()
            for category in user_test.test.categories.all():
                categories_map[category.id] = UserCategoryResult(test_results=test_results, category=category, score=0)

            for user_question in user_test.questions.all():
                category = user_question.category
                question_score = get_question_score(user_question)
                categories_map[category.id].score += question_score
                test_results.score += question_score

            inquirer_results.score += test_results.score
            inquirer_results.save()
            test_results.save()

            for key, item in categories_map.items():
                item.save()
