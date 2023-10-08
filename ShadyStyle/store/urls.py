from . import views
from django.urls import path

urlpatterns = [
    path('', views.index, name='index'),
    path('cart', views.cart, name='cart'),
    path('about', views.about, name='about'),
    path('glasses', views.glasses, name='glasses'),
    path('<int:id>', views.selected_sunglass_page, name='sunglass_page'),
    path('contact', views.contact, name='contact'),
    path('api/get_sunglass/<int:id>', views.add_to_cart, name='add_to_cart'),
]