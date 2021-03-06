from django.urls import path
from .views_worker import (
    get_filter, VacancyApiView, get_vacancy, get_resume_responding_worker, get_resume,
    get_job_application, like_resume, get_liked_vacancy_, get_liked_resume_, send_request,
    open_close_vacancy, accept_application, like_vacancy, get_user_info, get_worker_applications,
    get_full_user_info, change_worker_info, change_headdepartment_info
)

urlpatterns = [
    path('get_filter/', get_filter),
    path('vacancy/', get_vacancy),
    path('vacancy/<int:pk>/', get_vacancy),
    path('authorvacancy/', VacancyApiView.as_view()),
    path('authorvacancy/<int:pk>/', VacancyApiView.as_view()),
    path('resume_responding_worker/', get_resume_responding_worker),  # Резюме ответивших воркеров
    path('resume/', get_resume),
    path('resume/<int:pk>/', get_resume),
    path('resumes_vacancy/<int:pk>/', get_job_application),
    path('like_resume/', like_resume),
    path('liked_vacancy/', get_liked_vacancy_),
    path('like_vacancy/', like_vacancy),
    path('liked_resume/', get_liked_resume_),
    path('send_request/', send_request),
    path('open_close_vacancy/', open_close_vacancy),
    path('accept_application/', accept_application),  # Приём заявки
    path('get_full_user_info/', get_full_user_info),  # Возвращает ВСЮ инфу о юзере, в зависимости от должности
    path('get_user_info/', get_user_info),
    path('get_worker_applications/', get_worker_applications),
    path('change_worker_info/', change_worker_info),  # Изменить профиль работника С РЕЗЮМЕ
    path('change_headdepartment_info/', change_headdepartment_info)  # Изменить профиль работодателя БЕЗ РЕЗЮМЕ
]
