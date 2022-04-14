from rest_framework import status

from .models import Skills, GroupSkills, Vacancy, HeadDepartment


def get_skills():
    filters = []
    groups = GroupSkills.objects.all()
    for group in groups:
        skills = Skills.objects.filter(group_id=group.pk)
        category = {'category': group.group, 'skills': []}
        for skill in skills:
            category['skills'].append({'id': skill.pk, 'name': skill.name})
        filters.append(category)
    return filters


def get_vacancy_author(user):
    authors = HeadDepartment.objects.filter(user_id=user.pk)
    if authors:
        vacancies = Vacancy.objects.filter(author_id=authors[0])
        answer = []
        for vacancy in vacancies:
            answer.append(vacancy.as_dict())
        return answer
    else:
        return status.HTTP_400_BAD_REQUEST


def get_filter_vacancy(param):
    if param:
        answer = []
        skills = param[0].split(',')
        for vacancy in Vacancy.objects.all():
            for skill in skills:
                if int(skill) in [vac.pk for vac in vacancy.skills.all()] and vacancy.is_open:
                    answer.append(vacancy.as_dict())
    else:
        answer = [vacancy.as_dict() for vacancy in Vacancy.objects.all() if vacancy.is_open]
    return answer
