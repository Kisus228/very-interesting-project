from rest_framework.serializers import ModelSerializer

from .models import Vacancy, Worker, Resume, CustomUser


class CreateVacancySerializer(ModelSerializer):

    class Meta:
        model = Vacancy
        fields = '__all__'

    def is_valid(self, raise_exception=False):
        return super().is_valid() and self.validated_data['count'] >= self.validated_data['free']


class CreateWorkerSerializer(ModelSerializer):

    class Meta:
        model = Worker
        fields = '__all__'


class CreateResumeSerializer(ModelSerializer):

    class Meta:
        model = Resume
        fields = '__all__'


class UserChangeSerializer(ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['email', 'first_name', 'last_name', 'patronymic', 'phone', 'birthday']

