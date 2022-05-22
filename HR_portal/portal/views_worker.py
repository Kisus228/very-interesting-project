from .assistant import get_skills, get_filter_vacancy, get_liked_vacancy, send_email
from .views_head_department import *


@api_view(['GET'])
def get_filter(request: Request):
    """
    Фильтр скиллов
    Args:
        request:

    Returns:

    """
    skills = get_skills()
    return Response(skills)


@api_view(['GET'])
def get_vacancy(request: Request, *args, **kwargs):
    """
    Возвращает список вакансий, с возможность их фильтровки по скиллам
    Args:
        request:
        *args:
        **kwargs:

    Returns:

    """
    pk = kwargs.get('pk')
    worker = Worker.objects.get(user_id=request.user.id)
    if pk:
        try:
            vacancy = Vacancy.objects.get(pk=pk)
            record = vacancy.as_dict_full()
            is_liked = False
            if vacancy in get_liked_vacancy(worker.pk):
                is_liked = True
            is_registered = bool(len(JobApplications.objects.filter(vacancy_id=vacancy.pk).filter(worker_id=worker.pk)))
            record.update(
                is_liked=is_liked,
                author=str(vacancy.author),
                department=str(vacancy.author.department),
                is_registered=is_registered
            )
            return Response(record)
        except:
            return Response('Объекта не существует', status=400)
    try:
        answer = get_filter_vacancy(request.GET.get('skills'), worker)
        return Response(answer)
    except:
        return Response('Не правильно переданны аргументы', status=400)


@api_view(['GET'])
def get_liked_vacancy_(request: Request):
    worker = Worker.objects.get(user_id=request.user.id)
    liked_vacancy = get_liked_vacancy(worker.pk)
    answer = []
    for vacancy in liked_vacancy:
        if vacancy.is_open:
            record = vacancy.as_dict_short_to_worker()
            record.update(is_liked=True)
            answer.append(record)
    return Response(answer)


@api_view(['POST'])
def like_vacancy(request: Request):
    vacancy_id = request.data.get('id')
    user_id = request.user.id
    vacancy = Vacancy.objects.get(id=vacancy_id)
    worker: Worker = Worker.objects.get(user_id=user_id)
    liked_apps = worker.liked_apps.all()
    if vacancy not in liked_apps:
        worker.liked_apps.add(vacancy)
    else:
        worker.liked_apps.remove(vacancy)
    return Response(status=200)


@api_view(['POST'])
def send_request(request: Request):
    worker = Worker.objects.get(user_id=request.user.id)
    vacancy_id = request.data.get('id')
    if vacancy_id:
        vacancies = [j_a.vacancy.pk for j_a in JobApplications.objects.filter(worker_id=worker.pk)]
        if vacancy_id in vacancies:
            return Response({'mess': 'Заявка уже отправлена'}, status=200)
        vacancy = Vacancy.objects.get(pk=vacancy_id)
        JobApplications.objects.create(vacancy_id=vacancy_id, worker=worker)
        send_email(
            f'Новая заявка на вакансию {vacancy.name}',
            vacancy.author.user.email,
            f'Новая заявка на вакансию {vacancy.name} от пользователя {str(worker.user)} '
            f'посмотреть его резюме по ссылке http://localhost:3000/search/{worker.resume.pk}'
        )
        return Response(status=200)
    return Response(status=400)
