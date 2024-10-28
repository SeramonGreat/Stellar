from django.db import models

class Article(models.Model):
    TYPE_CHOICES = (
        ('problem', 'Проблема'),
        ('update', 'Обновление'),
    )

    title = models.CharField('Название', max_length=50)
    anons = models.CharField('Анонс', max_length=250)
    full_text = models.TextField('Статья')
    date = models.DateField('Дата публикации')
    type = models.CharField('Тип', max_length=10, choices=TYPE_CHOICES, default='update')
    image = models.ImageField('Изображение', upload_to='news_images/', blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'