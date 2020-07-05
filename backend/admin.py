from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from backend.models import Course, Profile


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'name', 'created_at', 'modified_at', 'archived')
    list_display_links = ('id', 'name')
    search_fields = ('author__username', 'name')


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