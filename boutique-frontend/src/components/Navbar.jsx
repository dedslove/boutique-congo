import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalArticles } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate('/'); };
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>✦</span>
          <div>
            <div style={styles.logoText}>BoutiqueCongo</div>
            <div style={styles.logoSub}>Brazzaville · Congo</div>
          </div>
        </Link>

        <div style={styles.links}>
          <Link to="/" style={{...styles.link, ...(isActive('/') ? styles.linkActive : {})}}>
            Accueil
          </Link>
          {user && (
            <Link to="/panier" style={{...styles.link, ...(isActive('/panier') ? styles.linkActive : {})}}>
              🛒 Panier
              {totalArticles > 0 && <span style={styles.badge}>{totalArticles}</span>}
            </Link>
          )}
        </div>

        <div style={styles.actions}>
          {user ? (
            <>
              <span style={styles.userInfo}>👤 {user.email}</span>
              <button onClick={handleLogout} style={styles.btnOutline}>Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.btnGhost}>Connexion</Link>
              <Link to="/register" style={styles.btnGold}>S'inscrire</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: '#ffffff',
    borderBottom: '2px solid #c8973a',
    boxShadow: '0 2px 20px rgba(28,43,58,0.08)',
  },
  inner: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logoIcon: {
    fontSize: '1.8rem',
    color: '#c8973a',
  },
  logoText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#1c2b3a',
    lineHeight: 1.2,
  },
  logoSub: {
    fontSize: '0.6rem',
    color: '#c8973a',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    flex: 1,
    justifyContent: 'center',
  },
  link: {
    color: '#5a6a7a',
    fontSize: '0.85rem',
    fontWeight: '500',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    transition: 'color 0.2s',
  },
  linkActive: {
    color: '#c8973a',
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#d64045',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '0.65rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  userInfo: {
    color: '#5a6a7a',
    fontSize: '0.8rem',
    maxWidth: '160px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  btnGhost: {
    color: '#1c2b3a',
    fontSize: '0.85rem',
    fontWeight: '500',
    padding: '0.5rem 1rem',
  },
  btnOutline: {
    backgroundColor: 'transparent',
    color: '#5a6a7a',
    border: '1px solid #e8e0d0',
    padding: '0.5rem 1.2rem',
    borderRadius: '6px',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  btnGold: {
    backgroundColor: '#c8973a',
    color: '#ffffff',
    padding: '0.55rem 1.4rem',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
  },
};

export default Navbar;