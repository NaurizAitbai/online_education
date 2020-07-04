from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _


class Course(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses', verbose_name=_('Автор курса'))
    name = models.CharField(max_length=128, verbose_name=_('Имя курса'))
    archived = models.BooleanField(default=False, verbose_name=_('Архивирован'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Дата и время создания'))
    modified_at = models.DateTimeField(auto_now=True, verbose_name=_('Дата и время изменения'))

    class Meta:
        db_table = 'courses'
        verbose_name = _('курс')
        verbose_name_plural = _('курсы')
    
    def __str__(self):
        return self.name