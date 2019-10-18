from rest_framework import serializers

from authentication.serializers import UserInfoSerializer


class CategoeyResultSerializer(serializers.Serializer):
    categoryId = serializers.IntegerField(source='category.id')
    categoryTitle = serializers.CharField(source='category.title')
    categoryScore = serializers.IntegerField(source='score')


class TestResultSerializer(serializers.Serializer):
    testId = serializers.IntegerField(source='test.id')
    testTitle = serializers.CharField(source='test.title')
    testScore = serializers.IntegerField(source='score')
    testCategories = CategoeyResultSerializer(many=True, source='category_results')


class InquirerResultSerializer(serializers.Serializer):
    user = UserInfoSerializer()
    inquirerId = serializers.IntegerField(source='inquirer.id')
    inquirerTitle = serializers.CharField(source='inquirer.title')
    inquirerScore = serializers.IntegerField(source='score')
    inquirerTests = TestResultSerializer(many=True, source='test_results')
