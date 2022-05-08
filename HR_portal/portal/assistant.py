from .models import Skills, GroupSkills, Vacancy, JobApplications, Resume, HeadDepartment


def get_skills():
    """Возвращает список скиллов"""
    filters = []
    groups = GroupSkills.objects.all()
    for group in groups:
        category = {'category': group.group, 'skills': []}
        for skill in Skills.objects.filter(group_id=group.pk):
            category['skills'].append({'id': skill.pk, 'name': skill.name})
        filters.append(category)
    return filters


def get_filter_vacancy(param):
    """Возвращает список вакансий по фильтрам"""
    if param:
        vacancies_id = set()
        answer = []
        skills = param.split(',')
        for vacancy in Vacancy.objects.all():
            for skill in skills:
                if int(skill) in [vac.pk for vac in vacancy.skills.all()] and vacancy.is_open:
                    if vacancy.pk not in vacancies_id:
                        vacancies_id.add(vacancy.pk)
                        answer.append(vacancy.as_dict())
    else:
        answer = [vacancy.as_dict() for vacancy in Vacancy.objects.all() if vacancy.is_open]
    return answer


def get_filter_resume(param):
    """Возвращает список резюме по фильтрам"""
    if param:
        resume_id = set()
        answer = []
        skills = param.split(',')
        for resume in Resume.objects.all():
            for skill in skills:
                if int(skill) in [vac.pk for vac in resume.skills.all()]:
                    if resume.pk not in resume_id:
                        resume_id.add(resume.pk)
                        answer.append(resume.as_dict())
    else:
        answer = [resume.as_dict() for resume in Resume.objects.all()]
    return answer


def get_liked_resume(head_depart_id):
    head_department: HeadDepartment = HeadDepartment.objects.get(pk=head_depart_id)
    return head_department.liked_resume.all()
