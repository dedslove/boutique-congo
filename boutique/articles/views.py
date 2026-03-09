from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from .models import Article
from .serializers import ArticleSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def liste_articles(request):
    articles = Article.objects.filter(disponible=True)
    categorie = request.query_params.get('categorie')
    if categorie:
        articles = articles.filter(categorie=categorie)
    serializer = ArticleSerializer(
        articles,
        many=True,
        context={'request': request}
    )
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def detail_article(request, pk):
    try:
        article = Article.objects.get(pk=pk, disponible=True)
    except Article.DoesNotExist:
        return Response(
            {'error': 'Article non trouvé'},
            status=status.HTTP_404_NOT_FOUND
        )
    serializer = ArticleSerializer(
        article,
        context={'request': request}
    )
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def creer_article(request):
    serializer = ArticleSerializer(
        data=request.data,
        context={'request': request}
    )
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'PATCH'])
@permission_classes([IsAdminUser])
def modifier_article(request, pk):
    try:
        article = Article.objects.get(pk=pk)
    except Article.DoesNotExist:
        return Response(
            {'error': 'Article non trouvé'},
            status=status.HTTP_404_NOT_FOUND
        )
    serializer = ArticleSerializer(
        article,
        data=request.data,
        partial=True,
        context={'request': request}
    )
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def supprimer_article(request, pk):
    try:
        article = Article.objects.get(pk=pk)
    except Article.DoesNotExist:
        return Response(
            {'error': 'Article non trouvé'},
            status=status.HTTP_404_NOT_FOUND
        )
    article.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)