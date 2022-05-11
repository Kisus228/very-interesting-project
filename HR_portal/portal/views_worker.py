from .assistant import get_skills, get_filter_vacancy, get_liked_vacancy
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
            record.update(is_liked=is_liked)
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
        record = vacancy.as_dict_short_to_worker()
        record.update(is_liked=True)
        answer.append(record)
    return Response(answer)


@api_view(['POST'])
def send_request(request: Request):
    worker = Worker.objects.get(user_id=request.user.id)
    vacancy_id = request.data.get('id')
    if vacancy_id:
        vacancy = [j_a.vacancy.pk for j_a in JobApplications.objects.filter(worker_id=worker.pk)]
        if vacancy_id in vacancy:
            return Response({'mess': 'Заявка уже отправлена'}, status=200)
        JobApplications.objects.create(vacancy_id=vacancy_id, worker=worker)
        return Response(status=200)
    return Response(status=400)
