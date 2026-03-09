from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = [
            'id',
            'titre',
            'description',
            'prix',
            'stock',
            'categorie',
            'image',
            'image_url',
            'date_ajout',
            'disponible'
        ]

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None