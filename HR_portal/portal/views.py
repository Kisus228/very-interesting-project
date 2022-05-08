from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Vacancy, HeadDepartment
from .assistant import get_skills, get_filter_vacancy
from .serilizer import CreateVacancySerializer, CreateHeadDepartmentSerializer


@api_view(['GET'])
def get_filter(request: Request):
    skills = get_skills()
    return Response(skills)


@api_view(['GET'])
def get_vacancy(request: Request, *args, **kwargs):
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

    @staticmethod
    def get(request, *args, **kwargs):
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
        author_request = HeadDepartment.objects.filter(user=request.user.id)
        author = request.data.get('author', None)

        if len(author_request) > 0 and author and int(author) == author_request[0].pk:
            serializer = CreateVacancySerializer(data=request.data)
            if serializer.is_valid():
                vacancy = serializer.save()
                return Response(vacancy.id, status=200)
            else:
                return Response(serializer.errors, status=400)
        else:
            return Response('Не верный пользователь', status=400)

    @staticmethod
    def put(request, *args, **kwargs):
        author_request = HeadDepartment.objects.filter(user=request.user.id)
        author = request.data.get('author', None)

        if len(author_request) > 0 and author and int(author) == author_request[0].pk:

            pk = kwargs.get('pk', None)
            if not pk:
                return Response(status=400)
            try:
                instance = Vacancy.objects.get(pk=pk)
            except Exception:
                return Response('Объект не существует', status=400)

            serializer = CreateVacancySerializer(data=request.data, instance=instance)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(status=400, data='Данные не валидны')

        else:
            return Response('Не верный пользователь', status=400)

    @staticmethod
    def delete(request, *args, **kwargs):
        author_request = HeadDepartment.objects.filter(user=request.user.id)
        author = request.data.get('author', None)

        if len(author_request) > 0 and author and int(author) == author_request[0].pk:
            pk = kwargs.get('pk', None)
            if not pk:
                return Response(status=400)
            try:
                vacancy = Vacancy.objects.get(pk=pk)
                vacancy.delete()
                return Response(status=200)
            except Exception:
                return Response('Объект не существует', status=400)
        else:
            return Response('Не верный пользователь', status=400)


class HeadDepartmentApiView(CreateAPIView):
    queryset = HeadDepartment.objects.all()
    serializer_class = CreateHeadDepartmentSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    @staticmethod
    def get(request, *args, **kwargs):
        users = HeadDepartment.objects.filter(user=request.user.id)
        user = users[0] if users else None
        pk = kwargs.get('pk', None)
        try:
            head_department = HeadDepartment.objects.get(pk=pk)
            return Response(head_department.as_dict())
        except:
            head_departments = HeadDepartment.objects.filter(user_id=user)
            return Response([head_department.as_dict() for head_department in head_departments])
