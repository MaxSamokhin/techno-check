from rest_framework import serializers

from authentication.serializers import UserInfoSerializer


class AnswerSerializer(serializers.Serializer):
    userAnswerId = serializers.IntegerField(source='id')
    answerTitle = serializers.CharField(source='answer.title', required=False)
    answerText = serializers.CharField(source='text', required=False)
    answerScore = serializers.IntegerField(source='manual_score')


class UserQuestionSerializer(serializers.Serializer):
    user = UserInfoSerializer()
    userQuestionId = serializers.IntegerField(source='id')
    questionId = serializers.IntegerField(source='question.id')
    questionTitle = serializers.CharField(source='question.title')
    questionType = serializers.CharField(source='question.type')
    questionManual = serializers.CharField(source='question.manual_check')
    answers = AnswerSerializer(source='answer', many=True)


class InquirerSerializer(serializers.Serializer):
    inquirerId = serializers.IntegerField(source='id')
    inquirerTitle = serializers.CharField(source='title')


class AnswerScoreSerializer(serializers.Serializer):
    answerScore = serializers.IntegerField(source='score')
