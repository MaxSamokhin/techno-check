from django.db import IntegrityError

from testing.models import QuestionTypes, UserAnswer


class WrongDataFormatException(Exception):
    pass


class WrongDataException(Exception):
    pass


def save_test(serialized_data, user_question, user):
    try:
        answer_id = serialized_data.validated_data['answer_id']
    except KeyError:
        raise WrongDataFormatException
    answer = UserAnswer(
        user_question=user_question,
        question=user_question.question,
        answer_id=answer_id,
        user=user
    )
    answer.save()


def save_text(serialized_data, user_question, user):
    try:
        text = serialized_data.validated_data['answer']
    except KeyError:
        raise WrongDataFormatException
    answer = UserAnswer(
        user_question=user_question,
        question=user_question.question,
        text=text,
        user=user
    )
    answer.save()


def save_multiple_answers(serialized_data, user_question, user):
    try:
        for answer_id in serialized_data.validated_data['answers']:
            answer = UserAnswer(
                user_question=user_question,
                question=user_question.question,
                answer_id=answer_id,
                user=user
            )
            answer.save()
    except KeyError:
        raise WrongDataFormatException


SAVE_MAP = {
    QuestionTypes.TEST.name: save_test,
    QuestionTypes.TEXT.name: save_text,
    QuestionTypes.MULTIPLE_TEST.name: save_multiple_answers
}


def save_answer(serialized_data, user_question, user):
    # deleting old answers if user is changing his answer
    UserAnswer.objects.filter(user_question=user_question).delete()

    saver = SAVE_MAP.get(user_question.question.type)

    if not saver:
        raise NotImplementedError('Save [%s] is not implemented' % user_question.question.type)

    try:
        return saver(serialized_data, user_question, user)
    except IntegrityError:
        raise WrongDataException()
