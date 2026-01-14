import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetError } from '../redux/user/userSlice';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, loading, error } = useSelector(state => state.user);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        dispatch(resetError());
    }, [dispatch]);

    useEffect(() => {
        // Si ya esta registrado que no vuelva a entrar aca
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
    };

    return (
        <section className="auth-section container section-padding" style={{ paddingTop: '120px', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="auth-card" style={{ background: 'var(--bg-secondary)', padding: '40px', borderRadius: '15px', width: '100%', maxWidth: '400px', border: '1px solid var(--primary-color)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Crear Cuenta</h2>
                {error && <p style={{ color: 'red', marginBottom: '20px', textAlign: 'center' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Nombre Completo</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Tu nombre"
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', background: 'white', color: 'black' }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="tu@email.com"
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', background: 'white', color: 'black' }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', background: 'white', color: 'black' }}
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} disabled={loading}>
                        {loading ? <><span className="spinner"></span> Registrando...</> : 'Registrarse'}
                    </button>
                </form>
                <p style={{ marginTop: '20px', textAlign: 'center' }}>
                    ¿Ya tienes cuenta? <Link to="/login" style={{ color: 'var(--primary-color)' }}>Inicia Sesión</Link>
                </p>
            </div>
        </section>
    );
};
export default Register;
