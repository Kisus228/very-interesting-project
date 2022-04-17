from django.db import models
from Users.models import CustomUser


class Department(models.Model):
    name = models.CharField(max_length=250, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Департамент'
        verbose_name_plural = 'Департаменты'


class HeadDepartment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='Руководитель')
    department = models.ForeignKey(Department, on_delete=models.CASCADE, verbose_name='Департамент')

    class Meta:
        verbose_name = 'Руководитель депортамента'
        verbose_name_plural = 'Руководители депортаментов'

    def __str__(self):
        return str(self.user)


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

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Навык'
        verbose_name_plural = 'Навыки'


class Vacancy(models.Model):
    name = models.CharField(max_length=250, verbose_name='Название Вакансии')
    author = models.ForeignKey(HeadDepartment, on_delete=models.CASCADE, verbose_name='Автор вакансии')
    count = models.IntegerField(verbose_name='Нужное количество человек', default=1)
    free = models.IntegerField(verbose_name='Свободное количество мест', default=1)
    is_open = models.BooleanField(default=True, verbose_name='Открытая ли вакансия?')
    skills = models.ManyToManyField(Skills, related_name='records')
    description = models.TextField(verbose_name='Описание вакансии')

    def as_dict(self):
        skills = [skill.name for skill in self.skills.all()]
        return {'pk': self.pk, 'name': self.name, 'count': self.count, 'free': self.free,
                'is_open': self.is_open, 'skills': skills, 'description': self.description}

    class Meta:
        verbose_name = 'Вакансия'
        verbose_name_plural = 'Вакансии'

    def __str__(self):
        return self.name


class Resume(models.Model):     # возможно ссылки передавать одним джейсон стетхэмом файлом вида: {'соцсеть': 'ссылка'}
    vk_link = models.TextField(verbose_name='Ссылка на ВК')
    tg_link = models.TextField(verbose_name='Ссылка на Телеграм')
    github_link = models.TextField(verbose_name='Ссылка на GitHub')
    gitlab_link = models.TextField(verbose_name='Ссылка на GitLab')
    resume_text = models.TextField(verbose_name='Текст резюме')
    skills = models.ManyToManyField(Skills, verbose_name='Список навыков')

    class Meta:
        verbose_name = 'Резюме'
        verbose_name_plural = 'Резюме'


class Worker(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='Работник', blank=True)
    liked_apps = models.ManyToManyField(Vacancy, verbose_name='Понравившиеся заявки', blank=True)
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, verbose_name='Резюме')

    def __str__(self):
        return str(self.user)


class JobApplications(models.Model):
    vacancy = models.ForeignKey(Vacancy, on_delete=models.CASCADE, verbose_name='ID вакансии')
    worker = models.ForeignKey(Worker, on_delete=models.CASCADE, verbose_name='ID работника')

    class Meta:
        verbose_name = 'Заявка на вакансию'
        verbose_name_plural = 'Заявки на вакансии'

    def __str__(self):
        return self.vacancy
