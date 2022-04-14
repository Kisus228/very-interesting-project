from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class CustomUser(AbstractUser):
    first_name = models.CharField(_("first name"), max_length=150)
    last_name = models.CharField(_("last name"), max_length=150)
    patronymic = models.CharField(max_length=20, verbose_name='Отчество')
    email = models.EmailField(_('email address'), unique=True)
    photo = models.ImageField(upload_to='photos', blank=True)
    phone = models.CharField(max_length=12, verbose_name='Номер телефона', blank=True)
    birthday = models.DateField(blank=True, null=True)

    def __str__(self):
        return f'{self.last_name} {self.first_name} {self.patronymic} ({self.username})'