# Generated by Django 3.0.8 on 2020-07-06 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_auto_20200706_1222'),
    ]

    operations = [
        migrations.AddField(
            model_name='courseunit',
            name='content',
            field=models.TextField(default='', verbose_name='Содержание урока'),
            preserve_default=False,
        ),
    ]