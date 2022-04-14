from rest_framework.serializers import ModelSerializer

from .models import Vacancy


class CreateVacancySerializer(ModelSerializer):

    class Meta:
        model = Vacancy
        fields = '__all__'

    def is_valid(self, raise_exception=False):
        return super().is_valid() and self.data['count'] >= self.data['free']

    def save(self):
        vacancy = Vacancy.objects.create(
            name=self.validated_data['name'],
            author=self.validated_data['author'],
            count=self.validated_data['count'],
            free=self.validated_data['free'],
            is_open=self.validated_data['is_open'],
            description=self.validated_data['description']
        )
        for skill in self.validated_data['skills']:
            vacancy.skills.add(skill)
        vacancy.save()
        return vacancy
