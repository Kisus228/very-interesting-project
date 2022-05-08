from rest_framework.serializers import ModelSerializer

from .models import Vacancy, HeadDepartment


class CreateVacancySerializer(ModelSerializer):

    class Meta:
        model = Vacancy
        fields = '__all__'

    def is_valid(self, raise_exception=False):
        return super().is_valid() and self.validated_data['count'] >= self.validated_data['free']


class CreateHeadDepartmentSerializer(ModelSerializer):

    class Meta:
        model = HeadDepartment
        field = '__all__'
