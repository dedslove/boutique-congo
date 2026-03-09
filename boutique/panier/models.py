from django.db import models
from django.conf import settings
from articles.models import Article

class Cart(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='cart'
    )
    date_creation = models.DateTimeField(auto_now_add=True)
    date_modification = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Panier de {self.user.email}"

    def total(self):
        return sum(item.sous_total() for item in self.items.all())

class CartItem(models.Model):
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name='items'
    )
    article = models.ForeignKey(
        Article,
        on_delete=models.CASCADE
    )
    quantite = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantite} x {self.article.titre}"

    def sous_total(self):
        return self.quantite * self.article.prix

    class Meta:
        unique_together = ['cart', 'article']