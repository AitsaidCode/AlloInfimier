import { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                    padding: '2rem',
                    textAlign: 'center',
                    gap: '1.5rem',
                }}>
                    <FaExclamationTriangle size={48} style={{ color: 'var(--color-warning, #F59E0B)' }} />
                    <h2 style={{ color: 'var(--color-text)' }}>Une erreur est survenue</h2>
                    <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px' }}>
                        Quelque chose s'est mal passé. Veuillez rafraîchir la page ou revenir à l'accueil.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button
                            className="btn btn--primary"
                            onClick={() => window.location.reload()}
                        >
                            <FaRedo /> Rafraîchir
                        </button>
                        <Link to="/" className="btn btn--outline">
                            <FaHome /> Accueil
                        </Link>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
