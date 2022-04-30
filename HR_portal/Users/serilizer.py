from rest_framework.fields import CharField
from rest_framework.serializers import Serializer, ModelSerializer
from rest_framework import serializers

from .models import CustomUser


class RegisterSerializer(ModelSerializer):
    firstname = serializers.CharField(source='user_first_name')
    lastname = serializers.CharField(source='user_last_name')

    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'password', 'firstname', 'lastname']

    def save(self, *args, **kwargs):
        user = CustomUser.objects.create_user(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            password=self.validated_data['password'],
            first_name=self.validated_data['user_first_name'],
            last_name=self.validated_data['user_last_name']
        )
        user.save()
        return user



class LoginSerializer(Serializer):
    model = CustomUser

    username = CharField(required=True)
    password = CharField(required=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'password']