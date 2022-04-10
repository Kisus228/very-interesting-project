from rest_framework.fields import CharField
from rest_framework.serializers import Serializer

from .models import CustomUser


class LoginRequestSerializer(Serializer):
    model = CustomUser

    username = CharField(required=True)
    password = CharField(required=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'password']