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
def get_user_info(request: Request):
    user_id = request.user.id
    user: CustomUser = CustomUser.objects.get(pk=user_id)
    user_info = {
        'name': user.first_name,
        'lastName': user.last_name,
        'patronymic': user.patronymic,
        'isHeadDepartment': False,
    }
    head_department = HeadDepartment.objects.filter(user_id=user_id)
    worker = Worker.objects.filter(user_id=user_id)
    try:
        if head_department:
            user_info['isHeadDepartment'] = True
            user_info['id'] = head_department[0].pk
        elif worker:
            user_info['id'] = worker[0].pk
        return Response(user_info)
    except:
        return Response('Объекта не существует', status=400)


@api_view(['GET'])
def get_full_user_info(request: Request):
    user_id = request.user.id
    worker = Worker.objects.filter(user_id=user_id)
    head_department = HeadDepartment.objects.filter(user_id=user_id)
    user: CustomUser = CustomUser.objects.get(pk=user_id)
    user_info = {
        'name': user.first_name,
        'lastName': user.last_name,
        'patronymic': user.patronymic,
        'email': user.email
    }
    try:
        if head_department:
            user_info.update({
                'department': head_department[0].department.name
            })
        elif worker:
            resume_info = worker[0].resume.as_dict_with_full_skills()
            user_info.update({
                'specialization': resume_info['specialization'],
                'experience': resume_info['experience'],
                'skills': resume_info['skills'],
                'vk': resume_info['vk'],
                'tg': resume_info['tg'],
                'gitlab': resume_info['gitlab'],
                'github': resume_info['github'],
                'resume': resume_info['resume_text'],
                'aboutMe': resume_info['about_me'],
                'birthDay': user.birthday
            })
        return Response(user_info)
    except:
        return Response('Объекта не существует', status=400)


@api_view(['GET'])
def get_worker_applications(request: Request):
    user_id = request.user.id
    try:
        worker = Worker.objects.get(user_id=user_id)
    except:
        return Response('Сотрудник не найден', status=400)
    job_applications = JobApplications.objects.filter(worker_id=worker.pk)
    if job_applications:
        result = [(app.vacancy.pk, app.vacancy.name, app.vacancy.description) for app in job_applications]
        return Response(result)
    else:
        return Response('Заявки не найдены', status=400)


@api_view(['PUT'])
def change_worker_info(request: Request):
    user_id = request.user.id
    try:
        user = CustomUser.objects.get(pk=user_id)
        worker = Worker.objects.get(user_id=user_id)
    except:
        return Response('Объекта не существует', status=400)
    resume_serializer = CreateResumeSerializer(data=request.data['resume'], instance=worker.resume)
    user_serializer = UserChangeSerializer(data=request.data['userdata'], instance=user)
    if resume_serializer.is_valid() and user_serializer.is_valid():
        resume_serializer.save()
        user_serializer.save()
        return Response(status=200, data='норм')
    else:
        return Response(status=400, data='Данные не валидны')


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
        try:
            send_email(
                f'Новая заявка на вакансию {vacancy.name}',
                vacancy.author.user.email,
                f'Новая заявка на вакансию {vacancy.name} от пользователя {str(worker.user)} '
                f'посмотреть его резюме по ссылке http://localhost:3000/search/{worker.resume.pk}'
            )
        except:
            print('Письмо не настроено')
        return Response(status=200)
    return Response(status=400)
