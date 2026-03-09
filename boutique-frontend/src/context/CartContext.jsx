import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get('/panier/');
      setCart(response.data);
    } catch (error) {
      console.error('Erreur chargement panier:', error);
    } finally {
      setLoading(false);
    }
  };

  const ajouterAuPanier = async (article_id, quantite = 1) => {
    const response = await api.post('/panier/ajouter/', {
      article_id,
      quantite,
    });
    setCart(response.data);
    return response.data;
  };

  const modifierQuantite = async (item_id, quantite) => {
    const response = await api.patch(`/panier/modifier/${item_id}/`, {
      quantite,
    });
    setCart(response.data);
  };

  const supprimerArticle = async (item_id) => {
    const response = await api.delete(`/panier/supprimer/${item_id}/`);
    setCart(response.data);
  };

  const viderPanier = async () => {
    const response = await api.delete('/panier/vider/');
    setCart(response.data);
  };

  const totalArticles = cart?.items?.reduce(
    (acc, item) => acc + item.quantite, 0
  ) || 0;

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      ajouterAuPanier,
      modifierQuantite,
      supprimerArticle,
      viderPanier,
      totalArticles,
      fetchCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);