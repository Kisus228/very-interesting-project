from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.generics import ListCreateAPIView, CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Vacancy, HeadDepartment
from .assistant import get_skills, get_vacancy_author, get_filter_vacancy
from .serilizer import CreateVacancySerializer


@api_view(['GET'])
def get_filter(request: Request):
    skills = get_skills()
    return Response(skills)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def get_author_vacancy_list(request: Request):
    return Response(get_vacancy_author(request.user))


@api_view(['GET'])
@permission_classes([AllowAny])
def get_vacancy_filter(request: Request):
    skills = request.GET.get('skills')
    return Response(get_filter_vacancy(skills))


class CreateVacancyView(CreateAPIView):
    queryset = Vacancy.objects.all()
    serializer_class = CreateVacancySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def post(self, request, *args, **kwargs):
        author = HeadDepartment.objects.filter(user=request.user.id)
        print(request.data)
        if len(author) > 0 and int(request.data['author']) == author[0].pk:
            serializer = CreateVacancySerializer(data=request.data)
            if serializer.is_valid():
                vacancy = serializer.save()
                return Response(vacancy.id, status=200)
            else:
                return Response(serializer.errors, status=400)
        else:
            return Response('Не верный пользователь', status=400)
