from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from backend.models import Course, CourseSection, CourseUnit, CourseReview, CourseMember, Profile


@admin.register(CourseReview)
class CourseReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'course', 'author', 'rating', 'text', 'created_at', 'modified_at')
    list_display_links = ('id', 'rating', 'text')
    search_fields = ('course__name', 'author__username', 'rating', 'text')


class CourseUnitInline(admin.StackedInline):
    model = CourseUnit


@admin.register(CourseSection)
class CourseSectionAdmin(admin.ModelAdmin):
    inlines = (CourseUnitInline,)

    list_display = ('id', 'course', 'name')
    list_display_links = ('id', 'name')
    search_fields = ('course__name', 'name')


class CourseSectionInline(admin.StackedInline):
    model = CourseSection


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    inlines = (CourseSectionInline,)

    list_display = ('id', 'author', 'name', 'created_at', 'modified_at', 'archived')
    list_display_links = ('id', 'name')
    search_fields = ('author__username', 'name')


@admin.register(CourseMember)
class CourseMemberAdmin(admin.ModelAdmin):
    list_display = ('id', 'course', 'user', 'created_at', 'modified_at')
    list_display_links = ('id',)
    search_fields = ('course__name', 'user__username')


class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = _('Профиль')
    fk_name = 'user'


class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInline,)

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(CustomUserAdmin, self).get_inline_instances(request, obj)


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)