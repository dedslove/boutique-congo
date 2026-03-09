from django.db import models
from django.core.validators import MinValueValidator

class Article(models.Model):
    CATEGORIES = [
        ('electronique', 'Électronique'),
        ('vetements', 'Vêtements'),
        ('chaussures', 'Chaussures'),
        ('accessoires', 'Accessoires'),
        ('maison', 'Maison'),
        ('beaute', 'Beauté'),
    ]

    titre = models.CharField(max_length=200)
    description = models.TextField()
    prix = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0.01)]
    )
    stock = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    categorie = models.CharField(
        max_length=50,
        choices=CATEGORIES,
        default='accessoires'
    )
    image = models.ImageField(
        upload_to='products/',
        blank=True,
        null=True
    )
    date_ajout = models.DateTimeField(auto_now_add=True)
    disponible = models.BooleanField(default=True)

    def __str__(self):
        return self.titre

    class Meta:
        ordering = ['-date_ajout']
        verbose_name = 'Article'
        verbose_name_plural = 'Articles'