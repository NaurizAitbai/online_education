# Generated by Django 3.0.8 on 2020-07-04 18:18

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
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, verbose_name='Имя курса')),
                ('archived', models.BooleanField(default=False, verbose_name='Архивирован')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания')),
                ('modified_at', models.DateTimeField(auto_now=True, verbose_name='Дата и время изменения')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses', to=settings.AUTH_USER_MODEL, verbose_name='Автор курса')),
            ],
            options={
                'verbose_name': 'курс',
                'verbose_name_plural': 'курсы',
                'db_table': 'courses',
            },
        ),
    ]
