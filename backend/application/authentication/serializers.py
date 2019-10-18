from rest_framework import serializers

from testing.serializers import UserInquirerSerializer


class AuthSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)


class UserInfoSerializer(serializers.Serializer):
    email = serializers.EmailField()
    is_superuser = serializers.BooleanField()


class TokenSerializer(serializers.Serializer):
    token = serializers.CharField()


class UserInquirerInfoSerializer(serializers.Serializer):
    user = UserInfoSerializer()
    userInquirer = UserInquirerSerializer()
