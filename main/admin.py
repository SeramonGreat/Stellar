from django.contrib import admin
from .models import Article

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'anons', 'date', 'type')
    list_filter = ('date', 'type')
    search_fields = ('title', 'anons')

admin.site.register(Article, ArticleAdmin)
