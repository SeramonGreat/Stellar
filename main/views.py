from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse, HttpResponse
from .models import Article

def index(request):
    if request.user_agent.is_mobile:
        return render(request, 'main/mobile.html')
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

def sitemap_view(request):
    sitemap_content = """<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://stellar-rtk5.onrender.com/</loc>
        <lastmod>2024-10-28</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://stellar-rtk5.onrender.com/about</loc>
        <lastmod>2024-10-28</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://stellar-rtk5.onrender.com/contacts</loc>
        <lastmod>2024-10-28</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://stellar-rtk5.onrender.com/installation</loc>
        <lastmod>2024-10-28</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://stellar-rtk5.onrender.com/news</loc>
        <lastmod>2024-10-28</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://stellar-rtk5.onrender.com/settings</loc>
        <lastmod>2024-10-28</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://stellar-rtk5.onrender.com/support</loc>
        <lastmod>2024-10-28</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://stellar-rtk5.onrender.com/team</loc>
        <lastmod>2024-10-28</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
    </urlset>"""
    return HttpResponse(sitemap_content, content_type="application/xml")

# Новые функции для мобильных страниц
def mobile_support(request):
    if request.user_agent.is_mobile:
        return render(request, 'main/mobile_support.html')
    return redirect('Support')

def mobile_contacts(request):
    if request.user_agent.is_mobile:
        return render(request, 'main/mobile_contacts.html')
    return redirect('Contacts')

def mobile_project(request):
    if request.user_agent.is_mobile:
        return render(request, 'main/mobile_project.html')
    return redirect('About')
