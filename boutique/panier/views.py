from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Cart, CartItem
from .serializers import CartSerializer
from articles.models import Article

def get_or_create_cart(user):
    cart, created = Cart.objects.get_or_create(user=user)
    return cart

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def voir_panier(request):
    cart = get_or_create_cart(request.user)
    serializer = CartSerializer(cart, context={'request': request})
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ajouter_article(request):
    article_id = request.data.get('article_id')
    quantite = int(request.data.get('quantite', 1))
    if not article_id:
        return Response({'error': 'article_id est requis'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        article = Article.objects.get(pk=article_id, disponible=True)
    except Article.DoesNotExist:
        return Response({'error': 'Article non trouvé'}, status=status.HTTP_404_NOT_FOUND)
    if quantite > article.stock:
        return Response({'error': 'Stock insuffisant'}, status=status.HTTP_400_BAD_REQUEST)
    cart = get_or_create_cart(request.user)
    item, created = CartItem.objects.get_or_create(
        cart=cart,
        article=article,
        defaults={'quantite': quantite}
    )
    if not created:
        item.quantite += quantite
        item.save()
    serializer = CartSerializer(cart, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def modifier_quantite(request, item_id):
    quantite = int(request.data.get('quantite', 1))
    if quantite < 1:
        return Response({'error': 'La quantité doit être au moins 1'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        cart = get_or_create_cart(request.user)
        item = CartItem.objects.get(pk=item_id, cart=cart)
    except CartItem.DoesNotExist:
        return Response({'error': 'Article non trouvé dans le panier'}, status=status.HTTP_404_NOT_FOUND)
    if quantite > item.article.stock:
        return Response({'error': 'Stock insuffisant'}, status=status.HTTP_400_BAD_REQUEST)
    item.quantite = quantite
    item.save()
    serializer = CartSerializer(cart, context={'request': request})
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def supprimer_article(request, item_id):
    try:
        cart = get_or_create_cart(request.user)
        item = CartItem.objects.get(pk=item_id, cart=cart)
    except CartItem.DoesNotExist:
        return Response({'error': 'Article non trouvé dans le panier'}, status=status.HTTP_404_NOT_FOUND)
    item.delete()
    serializer = CartSerializer(cart, context={'request': request})
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def vider_panier(request):
    cart = get_or_create_cart(request.user)
    cart.items.all().delete()
    serializer = CartSerializer(cart, context={'request': request})
    return Response(serializer.data)