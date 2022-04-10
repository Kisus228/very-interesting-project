from django.contrib import admin
from .models import Department, Skills, HeadDepartment, Vacancy, GroupSkills


class HeadDepartmentAdmin(admin.ModelAdmin):
    model = HeadDepartment
    list_display = ['user', 'department']


class VacancyAdmin(admin.ModelAdmin):
    model = Vacancy
    list_display = ['name', 'author', 'count', 'free', 'is_open', 'skills', 'description']
    list_editable = ['is_open',]


class SkillsAdmin(admin.ModelAdmin):
    model = Vacancy
    list_display = ['id', 'name', 'group']


admin.site.register(HeadDepartment, HeadDepartmentAdmin)
admin.site.register(Department)
admin.site.register(Skills, SkillsAdmin)
admin.site.register(Vacancy, VacancyAdmin)
admin.site.register(GroupSkills)