from django.urls import path
from . import views

urlpatterns = [
    path('', views.voir_panier, name='voir_panier'),
    path('ajouter/', views.ajouter_article, name='ajouter_article'),
    path('modifier/<int:item_id>/', views.modifier_quantite, name='modifier_quantite'),
    path('supprimer/<int:item_id>/', views.supprimer_article, name='supprimer_article'),
    path('vider/', views.vider_panier, name='vider_panier'),
]