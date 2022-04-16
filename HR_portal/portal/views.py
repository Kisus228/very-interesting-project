from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.generics import ListCreateAPIView, CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Vacancy, HeadDepartment
from .assistant import get_skills, get_filter_vacancy
from .serilizer import CreateVacancySerializer


@api_view(['GET'])
def get_filter(request: Request):
    skills = get_skills()
    return Response(skills)


class VacancyList(ListAPIView):
    queryset = Vacancy.objects.all()
    serializer_class = CreateVacancySerializer
    permission_classes = [AllowAny]

    def get(self, request: Request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if pk:
            try:
                vacancy = Vacancy.objects.get(pk=pk)
                return Response(vacancy.as_dict())
            except:
                return Response('Объекта не существует', status=400)
        try:
            answer = get_filter_vacancy(request.GET.get('skills'))
            return Response(answer)
        except:
            return Response('Не правильно переданны аргументы', status=400)


class VacancyApiView(CreateAPIView):
    queryset = Vacancy.objects.all()
    serializer_class = CreateVacancySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def get(self, request, *args, **kwargs):
        authors = HeadDepartment.objects.filter(user=request.user.id)
        author = authors[0] if authors else None
        pk = kwargs.get('pk', None)
        try:
            vacancy = Vacancy.objects.get(pk=pk)
            return Response(vacancy.as_dict())
        except:
            vacancies = Vacancy.objects.filter(author_id=author)
            return Response([vacancy.as_dict() for vacancy in vacancies])

    def post(self, request, *args):
        author = HeadDepartment.objects.filter(user=request.user.id)
        if len(author) > 0 and int(request.data['author']) == author[0].pk:
            serializer = CreateVacancySerializer(data=request.data)
            if serializer.is_valid():
                vacancy = serializer.save()
                return Response(vacancy.id, status=200)
            else:
                return Response(serializer.errors, status=400)
        else:
            return Response('Не верный пользователь', status=400)

    def put(self,  request, *args, **kwargs):
        author = HeadDepartment.objects.filter(user=request.user.id)
        if len(author) > 0 and int(request.data['author']) == author[0].pk:

            pk = kwargs.get('pk', None)
            if not pk:
                return Response(status=400)
            try:
                instance = Vacancy.objects.get(pk=pk)
            except Exception:
                return Response({'error': 'Объект не существует'}, status=400)

            serializer = CreateVacancySerializer(data=request.data, instance=instance)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(status=400, data={'error': 'Данные не валидны'})

        else:
            return Response('Не верный пользователь', status=400)

    def delete(self, request, *args, **kwargs):
        author = HeadDepartment.objects.filter(user=request.user.id)
        if len(author) > 0 and int(request.data['author']) == author[0].pk:
            pk = kwargs.get('pk', None)
            if not pk:
                return Response(status=400)
            try:
                vacancy = Vacancy.objects.get(pk=pk)
                vacancy.delete()
                return Response(status=200)
            except Exception:
                return Response({'error': 'Объект не существует'}, status=400)
        else:
            return Response('Не верный пользователь', status=400)
