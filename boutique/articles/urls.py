from django.urls import path
from . import views

urlpatterns = [
    path('', views.liste_articles, name='liste_articles'),
    path('<int:pk>/', views.detail_article, name='detail_article'),
    path('creer/', views.creer_article, name='creer_article'),
    path('modifier/<int:pk>/', views.modifier_article, name='modifier_article'),
    path('supprimer/<int:pk>/', views.supprimer_article, name='supprimer_article'),
]