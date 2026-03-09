from rest_framework import serializers
from .models import Cart, CartItem
from articles.serializers import ArticleSerializer

class CartItemSerializer(serializers.ModelSerializer):
    article = ArticleSerializer(read_only=True)
    article_id = serializers.IntegerField(write_only=True)
    sous_total = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = [
            'id',
            'article',
            'article_id',
            'quantite',
            'sous_total'
        ]

    def get_sous_total(self, obj):
        return obj.sous_total()

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = [
            'id',
            'items',
            'total',
            'date_modification'
        ]

    def get_total(self, obj):
        return obj.total()