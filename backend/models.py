from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _


class Course(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses', verbose_name=_('Автор курса'))
    name = models.CharField(max_length=128, verbose_name=_('Имя курса'))
    thumbnail = models.ImageField(upload_to='%Y/%m/%d/', null=True, blank=True, verbose_name=_('Изображение курса'))
    short_description = models.CharField(max_length=255, verbose_name=_('Короткое описание'))
    long_description = models.TextField(verbose_name=_('Детальное описание'))
    archived = models.BooleanField(default=False, verbose_name=_('Архивирован'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Дата и время создания'))
    modified_at = models.DateTimeField(auto_now=True, verbose_name=_('Дата и время изменения'))

    class Meta:
        db_table = 'courses'
        verbose_name = _('курс')
        verbose_name_plural = _('курсы')
    
    def __str__(self):
        return self.name


class CourseMember(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='members', verbose_name=_('Курс'))
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='member_of_courses', verbose_name=_('Пользователь'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Дата и время создания'))
    modified_at = models.DateTimeField(auto_now=True, verbose_name=_('Дата и время изменения'))

    class Meta:
        db_table = 'members'
        verbose_name = _('участник курса')
        verbose_name_plural = _('участники курсов')

    def __str__(self):
        return "{}: {}".format(self.course, self.user)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', verbose_name=_('Пользователь'))
    avatar = models.ImageField(upload_to='%Y/%m/%d/', null=True, blank=True, verbose_name=_('Изображение пользователя'))

    class Meta:
        db_table = 'profiles'
        verbose_name = _('профиль')
        verbose_name_plural = _('профили')

    def __str__(self):
        return str(self.user)


def create_profile(sender, instance, created, **kwargs):
    if created:
        profile, created = Profile.objects.get_or_create(user=instance)

post_save.connect(create_profile, sender=User)