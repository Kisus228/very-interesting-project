from django.db import models
from Users.models import CustomUser


class Department(models.Model):
    name = models.CharField(max_length=250, verbose_name='Название', blank=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Департамент'
        verbose_name_plural = 'Департаменты'


class HeadDepartment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='Руководитель', blank=False)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, verbose_name='Департамент', blank=False)

    class Meta:
        verbose_name = 'Руководитель депортамента'
        verbose_name_plural = 'Руководители депортаментов'

    def __str__(self):
        return str(self.user)


class GroupSkills(models.Model):
    group = models.CharField(max_length=256, blank=False, verbose_name='Группа')

    class Meta:
        verbose_name = 'Группа'
        verbose_name_plural = 'Группы'

    def __str__(self):
        return self.group


class Skills(models.Model):
    name = models.CharField(max_length=256, blank=False, verbose_name='Навык')
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
    free = models.IntegerField(verbose_name='Свободное количество мест')
    is_open = models.BooleanField(default=True, verbose_name='Открытая ли вакансия?')
    skills = models.JSONField(verbose_name='Навыки', blank=True)
    description = models.TextField(verbose_name='Описание вакансии')

    class Meta:
        verbose_name = 'Вакансия'
        verbose_name_plural = 'Вакансии'

    def __str__(self):
        return self.name


class Worker(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='Работник', blank=True)
    birthdate = models.DateField(verbose_name='Дата рождения', blank=True)
    liked_apps = models.JSONField(verbose_name='Понравившиеся заявки', blank=True)

    def __str__(self):
        return str(self.user)


class JobApplications(models.Model):
    vacancy_id = models.ForeignKey(Vacancy, on_delete=models.CASCADE, verbose_name='ID вакансии')
    worker_id = models.ForeignKey(Worker, on_delete=models.CASCADE, verbose_name='ID работника')

    class Meta:
        verbose_name = 'Заявка на вакансию'
        verbose_name_plural = 'Заявки на вакансии'

    def __str__(self):
        return self.vacancy_id


class Resume(models.Model):
    resume_id = models.IntegerField(verbose_name='ID резюме')
    vk_link = models.TextField(verbose_name='Ссылка на ВК')
    tg_link = models.TextField(verbose_name='Ссылка на Телеграм')
    github_link = models.TextField(verbose_name='Ссылка на GitHub')
    gitlab_link = models.TextField(verbose_name='Ссылка на GitLab')
    resume_text = models.TextField(verbose_name='Текст резюме')
    skills = models.JSONField(verbose_name='Список навыков')
    worker_id = models.ForeignKey(Worker, on_delete=models.CASCADE, verbose_name='ID работника')

    class Meta:
        verbose_name = 'Резюме'

    def __str__(self):
        return self.resume_id
