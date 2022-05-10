from django.db import models
from Users.models import CustomUser


class Department(models.Model):
    name = models.CharField(max_length=250, verbose_name='Название')

    class Meta:
        verbose_name = 'Департамент'
        verbose_name_plural = 'Департаменты'

    def __str__(self):
        return self.name


class GroupSkills(models.Model):
    group = models.CharField(max_length=256, verbose_name='Группа')

    class Meta:
        verbose_name = 'Группа навыков'
        verbose_name_plural = 'Группы навыков'

    def __str__(self):
        return self.group


class Skills(models.Model):
    name = models.CharField(max_length=256, verbose_name='Навык')
    group = models.ForeignKey(GroupSkills, on_delete=models.CASCADE, verbose_name='Группа')

    class Meta:
        verbose_name = 'Навык'
        verbose_name_plural = 'Навыки'

    def __str__(self):
        return self.name


class Resume(models.Model):     # возможно ссылки передавать одним джейсон стетхэмом файлом вида: {'соцсеть': 'ссылка'}
    vk_link = models.TextField(verbose_name='Ссылка на ВК', blank=True, null=True)
    tg_link = models.TextField(verbose_name='Ссылка на Телеграм', blank=True, null=True)
    github_link = models.TextField(verbose_name='Ссылка на GitHub', blank=True, null=True)
    gitlab_link = models.TextField(verbose_name='Ссылка на GitLab', blank=True, null=True)
    resume_text = models.TextField(verbose_name='Текст резюме', null=True)
    skills = models.ManyToManyField(Skills, verbose_name='Список навыков', null=True)
    experience = models.IntegerField(verbose_name='Лет стажа', blank=True, null=True)
    about_me = models.TextField(verbose_name='О себе', blank=True, null=True)
    specialization = models.TextField(verbose_name='Специальность', blank=True, null=True)

    class Meta:
        verbose_name = 'Резюме'
        verbose_name_plural = 'Резюме'

    def as_dict_short(self):
        skills = [skill.name for skill in self.skills.all()]
        return {
            'id': self.pk,
            'specialization': self.specialization,
            'experience': self.experience,
            'skills': skills
        }

    def as_dict_full(self):
        resume_short = self.as_dict_short()
        resume_full = {
            'vk': self.vk_link,
            'tg': self.tg_link,
            'gitlab': self.gitlab_link,
            'github': self.github_link,
            'resume_text': self.resume_text,
            'about_me': self.about_me,
        }
        resume_full.update(resume_short)
        return resume_full


class HeadDepartment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='Руководитель')
    department = models.ForeignKey(Department, on_delete=models.CASCADE, verbose_name='Департамент')
    liked_resume = models.ManyToManyField(Resume, verbose_name='Понравившиеся заявки', blank=True, null=True)

    class Meta:
        verbose_name = 'Руководитель депортамента'
        verbose_name_plural = 'Руководители депортаментов'

    def __str__(self):
        return str(self.user)


class Vacancy(models.Model):
    name = models.CharField(max_length=250, verbose_name='Название Вакансии')
    salary = models.IntegerField(blank=True, verbose_name='Зарплата', null=True)
    author = models.ForeignKey(HeadDepartment, on_delete=models.CASCADE, verbose_name='Автор вакансии')
    count = models.IntegerField(verbose_name='Нужное количество человек', default=1)
    free = models.IntegerField(verbose_name='Свободное количество мест', default=1)
    is_open = models.BooleanField(default=True, verbose_name='Открытая ли вакансия?')
    skills = models.ManyToManyField(Skills, related_name='records')
    description = models.TextField(verbose_name='Описание вакансии', blank=True)
    type_employment = models.TextField(verbose_name='Тип занятости', blank=True)
    specialization = models.TextField(verbose_name='Специализация', blank=True)
    work_schedule = models.TextField(verbose_name='График работы', blank=True)
    conditions = models.TextField(verbose_name='Условия', blank=True)
    requirements = models.TextField(verbose_name='Требования', blank=True)
    additionally = models.TextField(verbose_name='дополнительно', blank=True)
    duties = models.TextField(verbose_name='Обязанности', blank=True)

    class Meta:
        verbose_name = 'Вакансия'
        verbose_name_plural = 'Вакансии'

    def __str__(self):
        return self.name

    def as_dict_short_to_worker(self):
        skills = [skill.name for skill in self.skills.all()]
        return {
            'name': self.name,
            'free': self.free,
            'id': self.pk,
            'skills': skills,
            'description': self.description
        }

    def as_dict_short_to_head_depart(self):
        return {
            'name': self.name,
            'count': self.count,
            'free': self.free,
            'is_open': self.is_open,
            'id': self.pk
        }

    def as_dict_full(self):
        skills = [skill.name for skill in self.skills.all()]
        record = self.as_dict_short_to_head_depart()
        record.update({
            'salary': self.salary,
            'specialization': self.specialization,
            'description': self.description,
            'type_employment': self.type_employment,
            'work_schedule': self.work_schedule,
            'conditions': self.conditions,
            'duties': self.duties,
            'skills': skills,
            'requirements': self.requirements,
            'additionally': self.additionally
        })
        return record


class Worker(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='Работник')
    liked_apps = models.ManyToManyField(Vacancy, verbose_name='Понравившиеся вакансии', blank=True, null=True)
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, verbose_name='Резюме', blank=True, null=True)

    def __str__(self):
        return str(self.user)

    class Meta:
        verbose_name = 'Работник'
        verbose_name_plural = 'Работники'

    def as_dict(self):
        return {
            'name': str(self.user),
            'email': self.user.email,
            'birthday': self.user.birthday
        }


class JobApplications(models.Model):
    vacancy = models.ForeignKey(Vacancy, on_delete=models.CASCADE, verbose_name='ID вакансии')
    worker = models.ForeignKey(Worker, on_delete=models.CASCADE, verbose_name='ID работника')

    class Meta:
        verbose_name = 'Заявка на вакансию'
        verbose_name_plural = 'Заявки на вакансии'

    def __str__(self):
        return str(self.vacancy)


class AcceptedEmployees(models.Model):
    vacancy = models.ForeignKey(Vacancy, on_delete=models.CASCADE, verbose_name='ID вакансии')
    worker = models.ForeignKey(Worker, on_delete=models.CASCADE, verbose_name='ID работника')

    class Meta:
        verbose_name = 'Принятый работник'
        verbose_name_plural = 'Принятые работники'

