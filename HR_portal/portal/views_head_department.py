from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Vacancy, HeadDepartment, JobApplications,\
    Resume, Worker, AcceptedEmployees, CustomUser, Department
from .serilizer import CreateVacancySerializer
from .assistant import get_liked_resume, get_resume_by_filter, get_short_resume, send_email


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
        author = HeadDepartment.objects.get(user_id=request.user.id)
        pk = kwargs.get('pk', None)
        try:
            vacancy = Vacancy.objects.get(pk=pk)
            job_apps = JobApplications.objects.filter(vacancy_id=vacancy.pk)
            job_apps_answer = []
            accepted = [str(acc.worker) for acc in AcceptedEmployees.objects.filter(vacancy_id=vacancy.pk)]
            for job_app in job_apps:
                job_apps_answer.append({
                    'username': str(job_app.worker),
                    'job_app_id': job_app.pk,
                    'resume_id': job_app.worker.resume.pk
                })
            answer = vacancy.as_dict_full()
            answer.update(accepted=accepted)
            answer.update(job_apps=job_apps_answer)
            return Response(answer)
        except:
            vacancies = Vacancy.objects.filter(author_id=author)
            answer = []
            for vacancy in vacancies:
                if vacancy.is_open == is_open:
                    count_job_app = len(JobApplications.objects.filter(vacancy_id=vacancy.pk))
                    record = vacancy.as_dict_short_to_head_depart()
                    record.update({'count_job_app': count_job_app})
                    answer.append(record)
            return Response(answer)

    def post(self, request, *args):
        author_request = HeadDepartment.objects.get(user=request.user.id)
        serializer = CreateVacancySerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['author'] = author_request
            vacancy = serializer.save()
            return Response(vacancy.id, status=200)
        else:
            return Response(serializer.errors, status=400)

    @staticmethod
    def put(request, *args, **kwargs):
        author_request = HeadDepartment.objects.get(user=request.user.id)
        pk = kwargs.get('pk', None)
        if not pk:
            return Response(status=400)
        try:
            instance = Vacancy.objects.get(pk=pk)
        except Exception:
            return Response('Объект не существует', status=400)

        serializer = CreateVacancySerializer(data=request.data, instance=instance)
        if serializer.is_valid(raise_exception=True):
            serializer.validated_data['author'] = author_request
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(status=400, data='Данные не валидны')


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
    head_depart = HeadDepartment.objects.get(user_id=request.user.id)
    liked_resume = get_liked_resume(head_depart.pk)
    vacancies = Vacancy.objects.filter(author_id=head_depart.pk)
    job_apps = [JobApplications.objects.filter(vacancy_id=vacancy.pk) for vacancy in vacancies]
    workers_id = set()
    answer = []
    for job_app in job_apps:
        for j_a in job_app:
            if j_a.worker.pk not in workers_id:
                worker = j_a.worker
                record = get_short_resume(worker, liked_resume)
                answer.append(record)
    return Response(answer)


@api_view(['GET'])
def get_resume(request: Request, **kwargs):
    head_depart = HeadDepartment.objects.get(user_id=request.user.id)
    liked_resume = get_liked_resume(head_depart.pk)
    vacancies = Vacancy.objects.filter(author_id=head_depart.pk)
    skills_param = request.GET.get('skills')
    resume_id = kwargs.get('pk')
    if resume_id:
        try:
            worker = Worker.objects.get(resume_id=int(resume_id))
            job_app_worker = JobApplications.objects.filter(worker_id=worker.pk)
            intersection = list(filter(lambda x: x.vacancy in vacancies, job_app_worker))
            answer = {
                'name': str(worker.user),
                'is_liked': worker.resume in liked_resume,
                'email': worker.user.email
            }
            answer.update(worker.resume.as_dict_full())
            answer.update({'desired_vacancies': [
                {'name': j_a.vacancy.name, 'id_vacancy': j_a.vacancy.pk, 'id_job_app': j_a.pk}
                for j_a in intersection]})
            return Response(answer)
        except:
            return Response(status=400)
    else:
        resume_filter = get_resume_by_filter(skills_param, head_depart)
        return Response(resume_filter)


@api_view(['GET'])
def get_job_application(request, **kwargs):
    """Смотрть резюме из вакансии"""
    head_depart = HeadDepartment.objects.get(user_id=request.user.id)
    liked_resume = get_liked_resume(head_depart.pk)
    vacancy_id = kwargs.get('pk')
    answer = []
    workers = [job_app.worker for job_app in JobApplications.objects.filter(vacancy_id=int(vacancy_id))]
    for worker in workers:
        record = get_short_resume(worker, liked_resume)
        answer.append(record)
    return Response(answer)


@api_view(['POST'])
def like_resume(request: Request):
    resume_id = request.data.get('id')
    user_id = request.user.id
    resume = Resume.objects.get(id=resume_id)
    head_depart: HeadDepartment = HeadDepartment.objects.get(user_id=user_id)
    liked_resume = head_depart.liked_resume.all()
    if resume not in liked_resume:
        head_depart.liked_resume.add(resume)
    else:
        head_depart.liked_resume.remove(resume)
    return Response(status=200)


@api_view(['GET'])
def get_liked_resume_(request: Request):
    head_depart = HeadDepartment.objects.get(user_id=request.user.id)
    liked_resume = get_liked_resume(head_depart.pk)
    answer = []
    for resume in liked_resume:
        worker = Worker.objects.get(resume_id=resume.pk)
        record = resume.as_dict_short()
        record.update(is_liked=True, name=str(worker.user))
        answer.append(record)
    return Response(answer)


@api_view(['POST'])
def open_close_vacancy(request: Request):
    vacancy_id = request.data.get('id')
    try:
        vacancy = Vacancy.objects.get(pk=int(vacancy_id))
        head_depart = HeadDepartment.objects.get(user_id=request.user.id)
        if vacancy.author == head_depart:
            vacancy.is_open = not vacancy.is_open
            vacancy.save()
            return Response(status=200)
        else:
            return Response(status=400)
    except:
        return Response(status=400)


@api_view(['POST'])
def accept_application(request: Request):
    j_a = request.data.get('id')
    j_a: JobApplications = JobApplications.objects.get(pk=j_a)
    if j_a:
        AcceptedEmployees.objects.create(vacancy_id=j_a.vacancy.pk, worker_id=j_a.worker.pk)
        send_email(
            f'Вас взяли на работу',
            j_a.worker.user.email,
            f'Ваша заявка на вакансию {j_a.vacancy.name} одобрена'
            f'http://localhost:3000/search/{j_a.vacancy.pk}'
        )
        vacancy: Vacancy = j_a.vacancy
        vacancy.free -= 1
        vacancy.save()
        j_a.delete()
        return Response(status=200)
    return Response(status=400)
