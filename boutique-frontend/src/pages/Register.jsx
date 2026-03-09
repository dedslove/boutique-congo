import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Email et mot de passe sont obligatoires');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    try {
      setLoading(true);
      await register(formData.email, formData.password, formData.nom, formData.prenom);
      toast.success('Inscription réussie ! Bienvenue !');
      navigate('/');
    } catch (error) {
      const msg = error.response?.data?.email?.[0] || "Erreur lors de l'inscription";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconWrap}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2 style={styles.title}>Inscription</h2>
          <p style={styles.subtitle}>Créez votre compte gratuitement</p>
        </div>

        {/* Form */}
        <div style={styles.form}>
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Prénom</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Dedslove"
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nom</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="OSSOMBO"
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mot de passe *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={styles.input}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={styles.btn}
          >
            {loading ? 'Inscription...' : 'Créer mon compte'}
          </button>
        </div>

        <p style={styles.footer}>
          Déjà un compte ?{' '}
          <Link to="/login" style={styles.link}>Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f0f4ff',
    backgroundImage: 'linear-gradient(135deg, #e8eeff 0%, #f0f4ff 50%, #e0e8ff 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '0.5rem',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '480px',
    border: '1px solid #d0d8f0',
    boxShadow: '0 20px 60px rgba(26,58,219,0.12)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  iconWrap: {
    width: '60px',
    height: '60px',
    backgroundColor: '#1a3adb',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
    boxShadow: '0 8px 24px rgba(26,58,219,0.3)',
  },
  title: {
    color: '#0d1b4b',
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '0.4rem',
  },
  subtitle: {
    color: '#8a9ac0',
    fontSize: '0.9rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    color: '#4a5a8a',
    fontSize: '0.85rem',
    fontWeight: '500',
  },
  input: {
    padding: '0.85rem 1rem',
    borderRadius: '10px',
    border: '1.5px solid #d0d8f0',
    backgroundColor: '#f0f4ff',
    color: '#0d1b4b',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
  },
  btn: {
    backgroundColor: '#1a3adb',
    color: 'white',
    border: 'none',
    padding: '1rem',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '0.5rem',
    boxShadow: '0 4px 16px rgba(26,58,219,0.3)',
    letterSpacing: '0.03em',
  },
  footer: {
    color: '#8a9ac0',
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '0.9rem',
  },
  link: {
    color: '#1a3adb',
    textDecoration: 'none',
    fontWeight: '700',
  },
};

export default Register;