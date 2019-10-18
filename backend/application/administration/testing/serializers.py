from datetime import datetime

import pytz
from rest_framework import serializers

from testing.models import QuestionTypes
from utils.serializers import DateTimeFieldWihTZ

from application import settings


class QuestionSerializer(serializers.Serializer):
    questionId = serializers.IntegerField(source='id', read_only=True)
    questionTitle = serializers.CharField(source='title')

    questionType = serializers.CharField(source='type')

    questionManualCheck = serializers.BooleanField(source='manual_check', required=False)

    def validate_questionType(self, value):
        if value not in [tag.name for tag in QuestionTypes]:
            raise serializers.ValidationError({'questionType': 'Wrong question type, should be one of [{}]'.format(
                ', '.join([tag.name for tag in QuestionTypes]))})
        return value


class CategorySerializer(serializers.Serializer):
    categoryId = serializers.IntegerField(source='id', read_only=True)
    categoryTitle = serializers.CharField(source='title')


class TestSerializer(serializers.Serializer):
    testId = serializers.IntegerField(source='id', read_only=True)
    testTitle = serializers.CharField(source='title')
    timeLimit = serializers.TimeField(source='time_limit')


class InquirerSerializer(serializers.Serializer):
    inquirerId = serializers.IntegerField(source='id', read_only=True)
    inquirerTitle = serializers.CharField(source='title')
    inquirerStartDate = DateTimeFieldWihTZ(source='date_start')
    inquirerEndDate = DateTimeFieldWihTZ(source='date_end')

    def validate(self, data):
        if data['date_start'] >= data['date_end']:
            raise serializers.ValidationError({'inquirerStartDate': 'Дата начала не может быть больше даты окончания'})
        elif data['date_start'] <= datetime.now(pytz.timezone(settings.TIME_ZONE)):
            raise serializers.ValidationError({'inquirerStartDate': 'Дата начала не может быть в прошлом'})
        return data


class AnswerSerializer(serializers.Serializer):
    answerId = serializers.IntegerField(source='id', read_only=True)
    answerScore = serializers.IntegerField(source='score')
    answerTitle = serializers.CharField(source='title')


class QuestionDetailsSerializer(QuestionSerializer):
    answers = AnswerSerializer(required=False, many=True)


class AnswerIdSerializer(AnswerSerializer):
    answerId = serializers.IntegerField(source='id', required=False)


class QuestionDetailsIdSerializer(QuestionSerializer):
    answers = AnswerIdSerializer(many=True, required=False)


class CategoryDetailsSerializer(CategorySerializer):
    questions = QuestionDetailsSerializer(many=True)


class TestDetailsSerializer(TestSerializer):
    categories = CategoryDetailsSerializer(many=True)


class InquirerDetailsSerializer(InquirerSerializer):
    tests = TestDetailsSerializer(many=True)


class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
