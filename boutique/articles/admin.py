from django.contrib import admin
from .models import Article

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['titre', 'prix', 'stock', 'categorie', 'disponible', 'date_ajout']
    list_filter = ['categorie', 'disponible']
    search_fields = ['titre', 'description']
    list_editable = ['prix', 'stock', 'disponible']
    ordering = ['-date_ajout']