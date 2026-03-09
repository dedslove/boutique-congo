import { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtreCategorie, setFiltreCategorie] = useState('tous');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/articles/');
        setArticles(response.data);
      } catch (err) {
        setError('Erreur lors du chargement des articles');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const categories = [
    { id: 'tous', label: 'Tous les produits' },
    { id: 'electronique', label: '⚡ Électronique' },
    { id: 'vetements', label: '👗 Vêtements' },
    { id: 'chaussures', label: '👟 Chaussures' },
    { id: 'accessoires', label: '💎 Accessoires' },
    { id: 'maison', label: '🏠 Maison' },
    { id: 'beaute', label: '✨ Beauté' },
  ];

  const articlesFiltres = filtreCategorie === 'tous'
    ? articles
    : articles.filter(a => a.categorie === filtreCategorie);

  if (loading) return (
    <div style={styles.loadingScreen}>
      <div style={styles.loadingSpinner} />
      <p style={styles.loadingText}>Chargement de la boutique...</p>
    </div>
  );

  if (error) return (
    <div style={styles.loadingScreen}>
      <p style={styles.errorText}>{error}</p>
    </div>
  );

  return (
    <div style={styles.page}>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroBgShapes}>
          <div style={styles.shape1} />
          <div style={styles.shape2} />
          <div style={styles.shape3} />
        </div>
        <div style={styles.heroContent}>
          <p style={styles.heroEyebrow}>✦ Boutique en ligne · Brazzaville</p>
          <h1 style={styles.heroTitle}>
            Shopping Premium
            <br />
            <span style={styles.heroAccent}>au Congo</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Découvrez une sélection soigneuse de produits de qualité,
            livrés directement à Brazzaville et ses environs.
          </p>
          <div style={styles.heroCta}>
            <a href="#produits" style={styles.ctaBtn}>
              Découvrir les produits →
            </a>
            <div style={styles.ctaWhatsapp}>
              <span style={styles.ctaDot}>●</span>
              Commande via WhatsApp
            </div>
          </div>
          <div style={styles.heroStats}>
            <div style={styles.stat}>
              <span style={styles.statNum}>20+</span>
              <span style={styles.statLabel}>Produits</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <span style={styles.statNum}>6</span>
              <span style={styles.statLabel}>Catégories</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <span style={styles.statNum}>100%</span>
              <span style={styles.statLabel}>Qualité</span>
            </div>
          </div>
        </div>
      </section>

      {/* FILTRES */}
      <section style={styles.filtreSection}>
        <div style={styles.filtreInner}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFiltreCategorie(cat.id)}
              style={{
                ...styles.filtreBtn,
                ...(filtreCategorie === cat.id ? styles.filtreBtnActive : {}),
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* GRILLE PRODUITS */}
      <section id="produits" style={styles.gridSection}>
        <div style={styles.gridHeader}>
          <h2 style={styles.gridTitle}>Nos Produits</h2>
          <span style={styles.gridCount}>
            {articlesFiltres.length} article{articlesFiltres.length > 1 ? 's' : ''}
          </span>
        </div>
        <div style={styles.grid}>
          {articlesFiltres.map((article, index) => (
            <ProductCard key={article.id} article={article} index={index} />
          ))}
        </div>
        {articlesFiltres.length === 0 && (
          <div style={styles.emptyState}>
            <p style={styles.emptyIcon}>🔍</p>
            <p style={styles.emptyText}>Aucun article dans cette catégorie</p>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLeft}>
            <span style={styles.footerLogo}>✦ BoutiqueCongo</span>
            <p style={styles.footerDesc}>
              Votre boutique premium en ligne à Brazzaville.
              Qualité, confiance et livraison rapide.
            </p>
          </div>
          <div style={styles.footerCenter}>
            <p style={styles.footerSectionTitle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8973a" strokeWidth="2" style={{verticalAlign:'middle', marginRight:'8px'}}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16.92z"/>
              </svg>
              Commander
            </p>            <p style={styles.footerPhone}>+242 069 730 689</p>
            <p style={styles.footerCity}>📍 Brazzaville, République du Congo</p>
          </div>
          <div style={styles.footerRight}>
<p style={styles.footerSectionTitle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8973a" strokeWidth="2" style={{verticalAlign:'middle', marginRight:'8px'}}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Contactez-nous
            </p>            <a href="mailto:dedsloveossombo@gmail.com" style={styles.footerEmail}>
              dedsloveossombo@gmail.com
            </a>
            <p style={styles.footerCredit}>Créé par</p>
            <p style={styles.footerAuthor}>Dedslove VibeCodeur ✦</p>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.footerCopy}>
            © 2026 BoutiqueCongo · Tous droits réservés · 
          </p>
        </div>
      </footer>

    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f0f4ff',
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
  loadingSpinner: {
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
    letterSpacing: '0.05em',
  },
  errorText: {
    color: '#d64045',
    fontSize: '1.1rem',
  },
  hero: {
    position: 'relative',
    background: 'linear-gradient(135deg, #0d1b4b 0%, #1a3adb 50%, #0f2499 100%)',
    padding: '6rem 2rem 5rem',
    textAlign: 'center',
    overflow: 'hidden',
  },
  heroBgShapes: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  shape1: {
    position: 'absolute',
    top: '-80px',
    right: '-80px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'rgba(200,151,58,0.1)',
  },
  shape2: {
    position: 'absolute',
    bottom: '-60px',
    left: '-60px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)',
  },
  shape3: {
    position: 'absolute',
    top: '40%',
    left: '15%',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'rgba(200,151,58,0.06)',
  },
  heroContent: {
    position: 'relative',
    maxWidth: '700px',
    margin: '0 auto',
    animation: 'fadeInUp 0.8s ease both',
  },
  heroEyebrow: {
    color: '#c8973a',
    fontSize: '0.8rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    marginBottom: '1.5rem',
    fontWeight: '500',
  },
  heroTitle: {
    fontSize: 'clamp(2.8rem, 6vw, 5rem)',
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 1.1,
    marginBottom: '1.5rem',
  },
  heroAccent: {
    color: '#c8973a',
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: '1rem',
    lineHeight: 1.8,
    marginBottom: '2.5rem',
    fontWeight: '300',
  },
  heroCta: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    marginBottom: '3rem',
    flexWrap: 'wrap',
  },
  ctaBtn: {
    backgroundColor: '#c8973a',
    color: '#ffffff',
    padding: '0.9rem 2rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    boxShadow: '0 4px 20px rgba(200,151,58,0.4)',
  },
  ctaWhatsapp: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  ctaDot: {
    color: '#25a244',
    fontSize: '0.7rem',
  },
  heroStats: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '3rem',
    flexWrap: 'wrap',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.3rem',
  },
  statNum: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#c8973a',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  statDivider: {
    width: '1px',
    height: '40px',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  filtreSection: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #d0d8f0',
    position: 'sticky',
    top: '70px',
    zIndex: 100,
    boxShadow: '0 4px 16px rgba(26,58,219,0.06)',
  },
  filtreInner: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1rem 2rem',
    display: 'flex',
    gap: '0.6rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  filtreBtn: {
    backgroundColor: 'transparent',
    color: '#4a5a8a',
    border: '1px solid #d0d8f0',
    padding: '0.45rem 1.1rem',
    borderRadius: '30px',
    fontSize: '0.8rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  filtreBtnActive: {
    backgroundColor: '#1a3adb',
    color: '#ffffff',
    border: '1px solid #1a3adb',
    boxShadow: '0 4px 12px rgba(26,58,219,0.3)',
  },
  gridSection: {
    padding: '3rem 2rem 4rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  gridHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #d0d8f0',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  gridTitle: {
    fontSize: '2rem',
    color: '#0d1b4b',
    fontWeight: '600',
  },
  gridCount: {
    color: '#8a9ac0',
    fontSize: '0.85rem',
    backgroundColor: '#e8eeff',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '5rem 0',
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  emptyText: {
    color: '#8a9ac0',
    fontSize: '1rem',
  },
  footer: {
    backgroundColor: '#0d1b4b',
    borderTop: '3px solid #c8973a',
    marginTop: '2rem',
  },
  footerInner: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '3rem 2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '2rem',
    textAlign: 'center',
  },
  footerLeft: {},
  footerLogo: {
    fontSize: '1.4rem',
    color: '#c8973a',
    display: 'block',
    marginBottom: '0.75rem',
  },
  footerDesc: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: '0.85rem',
    lineHeight: 1.8,
  },
  footerCenter: {},
  footerSectionTitle: {
    color: '#c8973a',
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '0.75rem',
  },
  footerPhone: {
    color: '#ffffff',
    fontSize: '1.3rem',
    marginBottom: '0.5rem',
  },
  footerCity: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: '0.82rem',
  },
  footerRight: {},
  footerEmail: {
    color: '#c8973a',
    fontSize: '0.85rem',
    display: 'block',
    marginBottom: '1rem',
    textDecoration: 'underline',
    wordBreak: 'break-all',
  },
  footerCredit: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: '0.7rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '0.3rem',
  },
  footerAuthor: {
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: '700',
  },
  footerBottom: {
    borderTop: '1px solid rgba(255,255,255,0.08)',
    padding: '1.5rem 2rem',
    textAlign: 'center',
  },
  footerCopy: {
    color: 'rgba(255,255,255,0.25)',
    fontSize: '0.75rem',
    letterSpacing: '0.05em',
  },
};

export default Home;