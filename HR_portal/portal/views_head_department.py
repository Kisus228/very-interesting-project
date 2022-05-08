from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Vacancy, HeadDepartment, JobApplications, Resume
from .serilizer import CreateVacancySerializer
from .assistant import get_filter_resume


class VacancyApiView(CreateAPIView):
    """Простор, создание, удаление, редактирование вакансий """
    queryset = Vacancy.objects.all()
    serializer_class = CreateVacancySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    @staticmethod
    def get(request, *args, **kwargs):
        """
        Если в параметрах is_open = True возвращает открытые вакансии, иначе закрытые
        Args:
            request:
            *args:
            **kwargs:

        Returns:

        """
        is_open = request.GET.get('is_open') == 'True'
        authors = HeadDepartment.objects.filter(user=request.user.id)
        author = authors[0] if authors else None
        pk = kwargs.get('pk', None)
        try:
            vacancy = Vacancy.objects.get(pk=pk)
            return Response(vacancy.as_dict())
        except:
            vacancies = Vacancy.objects.filter(author_id=author)
            return Response([vacancy.as_dict() for vacancy in vacancies if vacancy.is_open == is_open])

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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def get_job_applications(request: Request):
    """
    Заявки на работу
    Args:
        request:

    Returns:

    """
    vacancy_id = request.GET.get('vacancy')
    job_applications = JobApplications.objects.filter(vacancy_id=vacancy_id)
    return Response([job.brief_information() for job in job_applications])


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def get_favorites_job_app(request: Request):
    user_id = request.user.id
    try:
        author = HeadDepartment.objects.get(user_id=user_id)
    except:
        return Response({'Куда полез хохол?'}, status=400)
    job_applications = JobApplications.objects.filter(author_id=author.pk)
    return Response([j_a.brief_information() for j_a in job_applications if j_a.is_liked])


@api_view(['GET'])
def get_resume(request: Request, *args, **kwargs):
    id = kwargs.get('pk')
    if id:
        try:
            resume = Resume.objects.get(id=id)
        except:
            return Response(status=400)
        return Response(resume.as_dict())
    try:
        answer = get_filter_resume(request.GET.get('skills'))
        return Response(answer)
    except Exception as ex:
        print(ex)
        return Response('Не правильно переданны аргументы', status=400)
