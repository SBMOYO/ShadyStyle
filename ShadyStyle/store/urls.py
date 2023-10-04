from . import views
from django.urls import path

urlpatterns = [
    path('', views.index, name='index'),
    path('shop', views.shop, name='shop'),
    path('about', views.about, name='about'),
    path('glasses', views.glasses, name='glasses'),
    path('contact', views.contact, name='contact'),
]