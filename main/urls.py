from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='Home'),
    path('about', views.about, name='About'),
    path('contacts', views.contacts, name='Contacts'),
    path('installation', views.installation, name='Installation'),
    path('news', views.news, name='News'),
    path('settings', views.settings, name='Settings'),
    path('support', views.support, name='Support'),
    path('team', views.team, name='Team'),
    path('get_news/<int:news_id>/', views.get_news_detail, name='get_news_detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)