from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from .models import Article

def index(request):
    return render(request, 'main/index.html')

def about(request):
    return render(request, 'main/about.html')

def team(request):
    return render(request, 'main/team.html')

def contacts(request):
    return render(request, 'main/contacts.html')

def installation(request):
    return render(request, 'main/installation.html')

def news(request):
    news = Article.objects.order_by('-date')
    return render(request, 'main/news.html', {'news': news})

def settings(request):
    return render(request, 'main/settings.html')

def support(request):
    return render(request, 'main/support.html')

def custom_404_view(request, exception):
    return redirect('Home')

def get_news_detail(request, news_id):
    news = get_object_or_404(Article, id=news_id)
    data = {
        'title': news.title,
        'content': news.full_text,
        'image': news.image.url if news.image else None,
    }
    return JsonResponse(data)