from .assistant import get_skills, get_filter_vacancy
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
    if pk:
        try:
            vacancy = Vacancy.objects.get(pk=pk)
            return Response(vacancy.as_dict_full())
        except:
            return Response('Объекта не существует', status=400)
    try:
        answer = get_filter_vacancy(request.GET.get('skills'))
        return Response(answer)
    except:
        return Response('Не правильно переданны аргументы', status=400)


