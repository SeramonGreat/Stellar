# Generated by Django 5.0.4 on 2024-08-15 16:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='article',
            options={'verbose_name': 'Новость', 'verbose_name_plural': 'Новости'},
        ),
        migrations.AddField(
            model_name='article',
            name='type',
            field=models.CharField(choices=[('problem', 'Проблема'), ('update', 'Обновление')], default='update', max_length=10, verbose_name='Тип'),
        ),
    ]
