from rest_framework.fields import CharField
from rest_framework.serializers import Serializer, ModelSerializer
from rest_framework import serializers

from .models import CustomUser
from portal.models import Worker, Resume


class UserRegisterSerializer(ModelSerializer):
    firstname = serializers.CharField(source='user_first_name')
    lastname = serializers.CharField(source='user_last_name')

    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'password', 'firstname', 'lastname']

    def save(self, *args, **kwargs):
        user: CustomUser = CustomUser.objects.create_user(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            password=self.validated_data['password'],
            first_name=self.validated_data['user_first_name'],
            last_name=self.validated_data['user_last_name']
        )

        resume: Resume = Resume(
            vk_link='',
            tg_link='',
            github_link='',
            gitlab_link='',
            resume_text='',
            experience=0,
            about_me='',
            specialization=''
        )
        resume.save()

        worker: Worker = Worker(
            resume_id=resume.pk,
            user_id=user.pk
        )
        worker.save()

        user.save()
        return user


class LoginSerializer(Serializer):
    model = CustomUser

    username = CharField(required=True)
    password = CharField(required=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'password']