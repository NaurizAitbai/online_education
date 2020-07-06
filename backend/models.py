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


class CourseSection(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='sections', verbose_name=_('Курс'))
    name = models.CharField(max_length=128, verbose_name=_('Название секции'))

    class Meta:
        db_table = 'sections'
        verbose_name = _('секция курса')
        verbose_name_plural = _('секции курсов')
    
    def __str__(self):
        return "{}: {}".format(self.course, self.name)


class CourseUnit(models.Model):
    section = models.ForeignKey(CourseSection, on_delete=models.CASCADE, related_name='units', verbose_name=_('Секция'))
    name = models.CharField(max_length=128, verbose_name=_('Название урока'))
    content = models.TextField(verbose_name=_('Содержание урока'))

    class Meta:
        db_table = 'units'
        verbose_name = _('урок в секции курса')
        verbose_name_plural = _('уроки в секции курса')
    
    def __str__(self):
        return "{} - {}".format(self.section, self.name)


RATING_CHOICES = (
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5)
)


class CourseReview(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='reviews', verbose_name=_('Курс'))
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews', verbose_name=_('Автор отзыва'))
    rating = models.IntegerField(choices=RATING_CHOICES, null=True, blank=True, verbose_name=_('Оценка'))
    text = models.CharField(max_length=255, null=True, blank=True, verbose_name=_('Комментария'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Дата и время создания'))
    modified_at = models.DateTimeField(auto_now=True, verbose_name=_('Дата и время изменения'))

    class Meta:
        db_table = 'reviews'
        verbose_name = _('отзыв курса')
        verbose_name_plural = _('отзывы курсов')

    def __str__(self):
        return "{}: {}".format(self.course, self.author)


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