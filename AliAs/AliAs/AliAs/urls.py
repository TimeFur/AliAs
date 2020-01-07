"""
Definition of urls for AliAs.
"""

from datetime import datetime
from django.urls import path
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from app import forms, views

import main.views as mainViews

urlpatterns = [
    path('', views.home, name='home'),
    path('contact/', views.contact, name='contact'),
    path('about/', views.about, name='about'),
    path('login/',
         LoginView.as_view
         (
             template_name='app/login.html',
             authentication_form=forms.BootstrapAuthenticationForm,
             extra_context=
             {
                 'title': 'Log in',
                 'year' : datetime.now().year,
             }
         ),
         name='login'),
    path('logout/', LogoutView.as_view(next_page='/'), name='logout'),
    path('admin/', admin.site.urls),

    #mainViews get/post request
    path('alias/', mainViews.main_page),
    path('search/', mainViews.search_page),
    path('searchVideo/', mainViews.searchVideo_page),
    path('imgsrc/', mainViews.get_imgSrc),
    path('imgsearch/', mainViews.imgSearch),
    path('getVideoUrl/', mainViews.get_VideoUrl),
    path('downloadVideo/', mainViews.videoDownload),
    path('editPage/', mainViews.changeToEdit, name="EditPage"),
]
