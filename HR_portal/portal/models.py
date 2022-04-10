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


