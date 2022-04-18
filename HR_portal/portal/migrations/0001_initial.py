# Generated by Django 4.0.3 on 2022-04-14 04:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, verbose_name='Название')),
            ],
            options={
                'verbose_name': 'Департамент',
                'verbose_name_plural': 'Департаменты',
            },
        ),
        migrations.CreateModel(
            name='GroupSkills',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group', models.CharField(max_length=256, verbose_name='Группа')),
            ],
            options={
                'verbose_name': 'Группа',
                'verbose_name_plural': 'Группы',
            },
        ),
        migrations.CreateModel(
            name='HeadDepartment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portal.department', verbose_name='Департамент')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Руководитель')),
            ],
            options={
                'verbose_name': 'Руководитель депортамента',
                'verbose_name_plural': 'Руководители депортаментов',
            },
        ),
        migrations.CreateModel(
            name='Skills',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256, verbose_name='Навык')),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portal.groupskills', verbose_name='Группа')),
            ],
            options={
                'verbose_name': 'Навык',
                'verbose_name_plural': 'Навыки',
            },
        ),
        migrations.CreateModel(
            name='Vacancy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, verbose_name='Название Вакансии')),
                ('count', models.IntegerField(default=1, verbose_name='Нужное количество человек')),
                ('free', models.IntegerField(default=1, verbose_name='Свободное количество мест')),
                ('is_open', models.BooleanField(default=True, verbose_name='Открытая ли вакансия?')),
                ('description', models.TextField(verbose_name='Описание вакансии')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portal.headdepartment', verbose_name='Автор вакансии')),
                ('skills', models.ManyToManyField(related_name='records', to='portal.skills')),
            ],
            options={
                'verbose_name': 'Вакансия',
                'verbose_name_plural': 'Вакансии',
            },
        ),
    ]
