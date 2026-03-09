import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cart, loading, modifierQuantite, supprimerArticle, viderPanier } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) { navigate('/login'); return null; }

  const handleCommander = () => {
    if (!cart?.items?.length) { toast.error('Votre panier est vide !'); return; }
    let message = '🛍️ *Nouvelle Commande BoutiqueCongo*\n\n';
    cart.items.forEach((item) => {
      message += `▪️ ${item.article.titre}\n`;
      message += `   Quantité: ${item.quantite}\n`;
      message += `   Prix unitaire: ${Number(item.article.prix).toLocaleString()} FCFA\n`;
      message += `   Sous-total: ${Number(item.sous_total).toLocaleString()} FCFA\n\n`;
    });
    message += `━━━━━━━━━━━━━━━━\n`;
    message += `💰 *TOTAL: ${Number(cart.total).toLocaleString()} FCFA*\n\n`;
    message += `👤 Client: ${user.email}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/242069730689?text=${encodedMessage}`, '_blank');
  };

  if (loading) return (
    <div style={styles.loadingScreen}>
      <div style={styles.spinner} />
      <p style={styles.loadingText}>Chargement du panier...</p>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.pageTitle}>🛒 Mon Panier</h1>

        {!cart?.items?.length ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyIcon}>🛒</p>
            <p style={styles.emptyTitle}>Votre panier est vide</p>
            <p style={styles.emptySubtitle}>Ajoutez des articles pour commencer vos achats</p>
            <button onClick={() => navigate('/')} style={styles.shopBtn}>
              Découvrir nos produits →
            </button>
          </div>
        ) : (
          <div style={styles.layout}>

            {/* ── LISTE ARTICLES ── */}
            <div style={styles.itemsList}>
              {cart.items.map((item) => (
                <div key={item.id} style={styles.itemCard}>
                  <img
                    src={item.article.image_url || `https://picsum.photos/seed/${item.article.id}/120/120`}
                    alt={item.article.titre}
                    style={styles.itemImage}
                  />
                  <div style={styles.itemInfo}>
                    <h3 style={styles.itemTitle}>{item.article.titre}</h3>
                    <p style={styles.itemPrice}>
                      {Number(item.article.prix).toLocaleString('fr-FR')} FCFA / unité
                    </p>
                  </div>

                  <div style={styles.qtyControls}>
                    <button
                      onClick={() => modifierQuantite(item.id, item.quantite - 1)}
                      disabled={item.quantite <= 1}
                      style={styles.qtyBtn}
                    >−</button>
                    <span style={styles.qtyNum}>{item.quantite}</span>
                    <button
                      onClick={() => modifierQuantite(item.id, item.quantite + 1)}
                      style={styles.qtyBtn}
                    >+</button>
                  </div>

                  <div style={styles.itemSubtotal}>
                    <p style={styles.subtotalLabel}>Sous-total</p>
                    <p style={styles.subtotalAmount}>
                      {Number(item.sous_total).toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>

                  <button
                    onClick={() => supprimerArticle(item.id)}
                    style={styles.deleteBtn}
                    title="Supprimer"
                  >🗑️</button>
                </div>
              ))}
            </div>

            {/* ── RÉCAPITULATIF ── */}
            <div style={styles.summary}>
              <div style={styles.summaryHeader}>
                <h2 style={styles.summaryTitle}>Récapitulatif</h2>
                <span style={styles.summaryCount}>
                  {cart.items.length} article{cart.items.length > 1 ? 's' : ''}
                </span>
              </div>

              <div style={styles.summaryItems}>
                {cart.items.map(item => (
                  <div key={item.id} style={styles.summaryLine}>
                    <span style={styles.summaryItemName}>
                      {item.article.titre} × {item.quantite}
                    </span>
                    <span style={styles.summaryItemPrice}>
                      {Number(item.sous_total).toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                ))}
              </div>

              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Total</span>
                <span style={styles.totalAmount}>
                  {Number(cart.total).toLocaleString('fr-FR')} FCFA
                </span>
              </div>

              <button onClick={handleCommander} style={styles.whatsappBtn}>
                <span style={styles.whatsappBtnInner}>
                  <svg width="22" height="22" viewBox="0 0 32 32" fill="white">
                    <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.502L4 29l7.697-1.813A12.94 12.94 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 01-5.003-1.34l-.358-.214-4.57 1.076 1.107-4.464-.23-.37A9.96 9.96 0 016 15c0-5.523 4.477-10 10-10zm-3.8 5.5c-.2 0-.525.075-.8.375S10 12.1 10 13.225c0 1.125.825 2.213.938 2.363.112.15 1.612 2.575 3.987 3.512.557.213 1.013.338 1.363.438.575.162 1.1.138 1.512.088.463-.063 1.425-.563 1.625-1.113.2-.55.2-1.013.138-1.113-.063-.1-.237-.162-.5-.287-.262-.125-1.55-.763-1.788-.85-.237-.088-.412-.125-.587.125-.175.25-.675.85-.825 1.025-.15.175-.3.2-.563.075-.262-.125-1.1-.4-2.1-1.288-.775-.688-1.3-1.538-1.45-1.8-.15-.263-.012-.4.112-.525.113-.112.263-.3.388-.45.125-.15.163-.25.25-.425.088-.175.044-.325-.025-.45-.063-.125-.575-1.425-.8-1.95-.2-.5-.413-.425-.575-.425z"/>
                  </svg>
                  Commander via WhatsApp
                </span>
              </button>

              <button onClick={viderPanier} style={styles.viderBtn}>
                🗑️ Vider le panier
              </button>

              <button onClick={() => navigate('/')} style={styles.continuerBtn}>
                ← Continuer mes achats
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f0f4ff',
    padding: '2rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  loadingScreen: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    backgroundColor: '#f0f4ff',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #d0d8f0',
    borderTop: '3px solid #1a3adb',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: {
    color: '#4a5a8a',
    fontSize: '1rem',
  },
  pageTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '2.2rem',
    color: '#0d1b4b',
    marginBottom: '2rem',
    fontWeight: '700',
  },

  // Empty
  emptyState: {
    textAlign: 'center',
    padding: '5rem 2rem',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    border: '1px solid #d0d8f0',
  },
  emptyIcon: { fontSize: '4rem', marginBottom: '1rem' },
  emptyTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.8rem',
    color: '#0d1b4b',
    marginBottom: '0.5rem',
  },
  emptySubtitle: {
    color: '#8a9ac0',
    fontSize: '0.95rem',
    marginBottom: '2rem',
  },
  shopBtn: {
    backgroundColor: '#1a3adb',
    color: 'white',
    border: 'none',
    padding: '0.9rem 2rem',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
  },

  // Layout
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '2rem',
    alignItems: 'start',
  },

  // Items
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  itemCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    border: '1px solid #d0d8f0',
    boxShadow: '0 2px 12px rgba(26,58,219,0.06)',
    transition: 'box-shadow 0.2s ease',
  },
  itemImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '10px',
    border: '1px solid #e8eeff',
  },
  itemInfo: { flex: 1 },
  itemTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    color: '#0d1b4b',
    fontSize: '1.05rem',
    fontWeight: '600',
    marginBottom: '0.3rem',
  },
  itemPrice: {
    color: '#8a9ac0',
    fontSize: '0.85rem',
  },

  // Qty
  qtyControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: '#f0f4ff',
    padding: '0.4rem 0.8rem',
    borderRadius: '10px',
    border: '1px solid #d0d8f0',
  },
  qtyBtn: {
    backgroundColor: '#1a3adb',
    color: 'white',
    border: 'none',
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
  },
  qtyNum: {
    color: '#0d1b4b',
    fontSize: '1rem',
    fontWeight: '700',
    minWidth: '24px',
    textAlign: 'center',
  },

  // Subtotal
  itemSubtotal: { textAlign: 'right', minWidth: '130px' },
  subtotalLabel: {
    fontSize: '0.65rem',
    color: '#8a9ac0',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '0.2rem',
  },
  subtotalAmount: {
    color: '#1a3adb',
    fontWeight: '700',
    fontSize: '1rem',
    fontFamily: "'Cormorant Garamond', serif",
  },
  deleteBtn: {
    backgroundColor: '#fff0f0',
    border: '1px solid #ffd0d0',
    borderRadius: '8px',
    width: '36px',
    height: '36px',
    cursor: 'pointer',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Summary
  summary: {
    backgroundColor: '#1a3adb',
    borderRadius: '20px',
    padding: '1.75rem',
    position: 'sticky',
    top: '90px',
    boxShadow: '0 8px 40px rgba(26,58,219,0.3)',
  },
  summaryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
  },
  summaryTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    color: '#ffffff',
    fontSize: '1.4rem',
    fontWeight: '600',
  },
  summaryCount: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: 'rgba(255,255,255,0.8)',
    fontSize: '0.75rem',
    padding: '0.3rem 0.7rem',
    borderRadius: '20px',
  },
  summaryItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    marginBottom: '1.5rem',
  },
  summaryLine: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
  },
  summaryItemName: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.8rem',
    flex: 1,
  },
  summaryItemPrice: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: '0.85rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
    borderTop: '1px solid rgba(255,255,255,0.15)',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
    marginBottom: '1.5rem',
  },
  totalLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '1rem',
    fontWeight: '500',
  },
  totalAmount: {
    color: '#f0c96a',
    fontSize: '1.5rem',
    fontWeight: '700',
    fontFamily: "'Cormorant Garamond', serif",
  },
  whatsappBtn: {
    backgroundColor: '#25a244',
    color: 'white',
    border: 'none',
    padding: '1rem',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '0.75rem',
    boxShadow: '0 4px 20px rgba(37,162,68,0.4)',
  },
  whatsappBtnInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
  },
  viderBtn: {
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.7)',
    border: '1px solid rgba(255,255,255,0.2)',
    padding: '0.8rem',
    borderRadius: '10px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '0.75rem',
  },
  continuerBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.7)',
    border: 'none',
    padding: '0.8rem',
    borderRadius: '10px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    width: '100%',
  },
};

export default Cart;