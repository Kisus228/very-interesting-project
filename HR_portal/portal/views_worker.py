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
