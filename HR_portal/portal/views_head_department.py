from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Vacancy, HeadDepartment, JobApplications, Resume, Worker
from .serilizer import CreateVacancySerializer
from .assistant import get_liked_resume


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
def get_resume_responding_worker(request: Request, **kwargs):
    resume_id = kwargs.get('pk')
    head_depart = HeadDepartment.objects.get(user_id=request.user.id)
    liked_resume = get_liked_resume(head_depart.pk)
    vacancies = Vacancy.objects.filter(author_id=head_depart.pk)

    if resume_id:
        try:
            worker = Worker.objects.get(resume_id=int(resume_id))
            job_app_worker = JobApplications.objects.filter(worker_id=worker.pk)
            intersection = list(filter(lambda x: x.vacancy in vacancies, job_app_worker))
            answer = {
                'name': str(worker.user),
                'is_liked': worker.resume in liked_resume,
            }
            answer.update(worker.resume.as_dict_full())
            answer.update({'desired_vacancies': [
                {'name': j_a.vacancy.name, 'id_vacancy': j_a.vacancy.pk, 'id_job_app': j_a.pk}
                for j_a in intersection]})
            return Response(answer)
        except:
            return Response(status=400)
    else:
        job_apps = [JobApplications.objects.filter(vacancy_id=vacancy.pk) for vacancy in vacancies]
        workers_id = set()
        answer = []
        for job_app in job_apps:
            for j_a in job_app:
                if j_a.worker.pk not in workers_id:
                    record = {
                            'name': str(j_a.worker.user),
                            'is_liked': j_a.worker.resume in liked_resume,
                        }
                    record.update(j_a.worker.resume.as_dict_short())
                    answer.append(record)
        return Response(answer)