import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ article, index = 0 }) => {
  const { user } = useAuth();
  const { ajouterAuPanier } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAjouter = async () => {
    if (!user) {
      toast.warning('Connectez-vous pour ajouter au panier !');
      navigate('/login');
      return;
    }
    try {
      setLoading(true);
      await ajouterAuPanier(article.id);
      setAdded(true);
      toast.success(`${article.titre} ajouté au panier !`);
      setTimeout(() => setAdded(false), 2500);
    } catch (error) {
      toast.error("Erreur lors de l'ajout au panier");
    } finally {
      setLoading(false);
    }
  };

  const categorieLabel = {
    electronique: '⚡ Électronique',
    vetements: '👗 Vêtements',
    chaussures: '👟 Chaussures',
    accessoires: '💎 Accessoires',
    maison: '🏠 Maison',
    beaute: '✨ Beauté',
  }[article.categorie] || article.categorie;

  return (
    <div
      style={{
        ...styles.card,
        backgroundColor: hovered ? '#1a3adb' : '#ffffff',
        transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? '0 24px 60px rgba(26,58,219,0.35), 0 0 0 2px rgba(26,58,219,0.5)'
          : '0 4px 24px rgba(26,58,219,0.08)',
        animationDelay: `${index * 0.05}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={styles.imageWrap}>
        <img
          src={article.image_url || `https://picsum.photos/seed/${article.id}/400/280`}
          alt={article.titre}
          style={{
            ...styles.image,
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />
        <div style={styles.imageOverlay} />
        <span style={{
          ...styles.categorieBadge,
          backgroundColor: hovered ? 'rgba(255,255,255,0.15)' : 'rgba(240,244,255,0.95)',
          color: hovered ? '#ffffff' : '#1a3adb',
          border: hovered ? '1px solid rgba(255,255,255,0.3)' : '1px solid #d0d8f0',
        }}>
          {categorieLabel}
        </span>

        {article.stock === 0 && (
          <div style={styles.ruptureOverlay}>
            <span style={styles.ruptureText}>Rupture de stock</span>
          </div>
        )}
        {article.stock > 0 && article.stock <= 5 && (
          <span style={styles.stockBadge}>Plus que {article.stock} !</span>
        )}
      </div>

      {/* Contenu */}
      <div style={styles.content}>
        <h3 style={{
          ...styles.titre,
          color: hovered ? '#ffffff' : '#0d1b4b',
        }}>
          {article.titre}
        </h3>

        <p style={{
          ...styles.description,
          color: hovered ? 'rgba(255,255,255,0.7)' : '#8a9ac0',
        }}>
          {article.description}
        </p>

        <div style={{
          ...styles.footer,
          borderTop: hovered
            ? '1px solid rgba(255,255,255,0.15)'
            : '1px solid #d0d8f0',
        }}>
          <div>
            <div style={{
              ...styles.prixLabel,
              color: hovered ? 'rgba(255,255,255,0.5)' : '#8a9ac0',
            }}>
              Prix
            </div>
            <div style={{
              ...styles.prix,
              color: hovered ? '#f0c96a' : '#1a3adb',
            }}>
              {Number(article.prix).toLocaleString('fr-FR')}
              <span style={{
                ...styles.prixCurrency,
                color: hovered ? 'rgba(255,255,255,0.5)' : '#8a9ac0',
              }}>
                {' '}FCFA
              </span>
            </div>
          </div>

          <button
            onClick={handleAjouter}
            disabled={loading || article.stock === 0}
            style={{
              ...styles.btn,
              ...(added ? styles.btnAdded : {}),
              ...(article.stock === 0 ? styles.btnDisabled : {}),
              backgroundColor: added
                ? '#25a244'
                : article.stock === 0
                ? '#cccccc'
                : hovered
                ? '#ffffff'
                : '#1a3adb',
              color: added
                ? '#ffffff'
                : article.stock === 0
                ? '#888888'
                : hovered
                ? '#1a3adb'
                : '#ffffff',
            }}
          >
            {loading ? '...' : added ? '✓ Ajouté' : '+ Panier'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid #d0d8f0',
    transition: 'all 0.35s ease',
    animation: 'fadeInUp 0.5s ease both',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  imageWrap: {
    position: 'relative',
    height: '200px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.15), transparent)',
    pointerEvents: 'none',
  },
  categorieBadge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    fontSize: '0.65rem',
    fontWeight: '600',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    padding: '0.3rem 0.7rem',
    borderRadius: '20px',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.3s ease',
  },
  ruptureOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(255,255,255,0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ruptureText: {
    color: '#d64045',
    fontWeight: '600',
    fontSize: '0.9rem',
    border: '1px solid #d64045',
    padding: '0.4rem 1rem',
    borderRadius: '4px',
    backgroundColor: 'white',
  },
  stockBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    backgroundColor: '#d64045',
    color: 'white',
    fontSize: '0.65rem',
    fontWeight: '700',
    padding: '0.3rem 0.6rem',
    borderRadius: '20px',
  },
  content: {
    padding: '1.25rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  titre: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.05rem',
    fontWeight: '600',
    lineHeight: 1.3,
    transition: 'color 0.3s ease',
  },
  description: {
    fontSize: '0.8rem',
    lineHeight: 1.6,
    flex: 1,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    transition: 'color 0.3s ease',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: '0.5rem',
    paddingTop: '0.75rem',
    transition: 'border-color 0.3s ease',
  },
  prixLabel: {
    fontSize: '0.65rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '0.2rem',
    transition: 'color 0.3s ease',
  },
  prix: {
    fontWeight: '700',
    fontSize: '1.1rem',
    fontFamily: "'Cormorant Garamond', serif",
    transition: 'color 0.3s ease',
  },
  prixCurrency: {
    fontSize: '0.75rem',
    fontWeight: '400',
    fontFamily: "'Jost', sans-serif",
    transition: 'color 0.3s ease',
  },
  btn: {
    border: 'none',
    padding: '0.55rem 1.1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    transition: 'all 0.25s ease',
    minWidth: '90px',
  },
  btnAdded: {
    backgroundColor: '#25a244',
    color: 'white',
  },
  btnDisabled: {
    cursor: 'not-allowed',
  },
};

export default ProductCard;