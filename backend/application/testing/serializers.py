from rest_framework import serializers

from utils.serializers import DateTimeFieldWihTZ


class UserTestsSerializer(serializers.Serializer):
    userTestId = serializers.IntegerField(source="id")
    testTitle = serializers.CharField(source="test.title")
    timeLimit = serializers.TimeField(source="test.time_limit")


class UserInquirerSerializer(serializers.Serializer):
    userInquirerId = serializers.IntegerField(source="id")
    inquirerTitle = serializers.CharField(source="inquirer.title")
    userTests = UserTestsSerializer(many=True, source="tests")
    dateStart = DateTimeFieldWihTZ(source="inquirer.date_start")
    dateEnd = DateTimeFieldWihTZ(source="inquirer.date_end")


class AnswersSerializer(serializers.Serializer):
    answerId = serializers.IntegerField(source="id")
    answerTitle = serializers.CharField(source="title")


class QuestionDetailsSerializer(serializers.Serializer):
    questionId = serializers.IntegerField(source="id")
    questionTitle = serializers.CharField(source="question.title")
    questionType = serializers.CharField(source="question.type")
    answers = AnswersSerializer(many=True, source="question.answers")


class QuestionAnswerSerializer(serializers.Serializer):
    answerId = serializers.IntegerField(source="answer_id", required=False)
    answers = serializers.ListField(
        child=serializers.IntegerField(),
        required=False
    )
    answer = serializers.CharField(required=False)

    def validate(self, attrs):
        if 'answer_id' not in attrs and 'answer' not in attrs and 'answers' not in attrs:
            raise serializers.ValidationError("One field from [answer, answerId, answers] is required")
        elif len(attrs) != 1:
            raise serializers.ValidationError("Expected one of [answerId, answer], but both are provided")
        return super().validate(attrs)
