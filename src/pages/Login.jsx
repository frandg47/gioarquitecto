import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axiosInstance.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: 'Inicio de sesión exitoso',
        confirmButtonColor: '#c9a96e',
      });
      navigate('/admin/proyectos');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: error.response?.data?.mensaje || 'Credenciales incorrectas',
        confirmButtonColor: '#c9a96e',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="text-secondary tracking-[0.3em] uppercase text-sm mb-4">Admin</p>
          <h1 className="font-display text-4xl text-primary font-light">Iniciar Sesión</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-10 shadow-sm">
          <div>
            <label htmlFor="email" className="block text-sm tracking-wider uppercase text-primary mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-0 py-3 bg-transparent border-0 border-b border-primary/20 text-primary placeholder:text-muted/50 focus:outline-none focus:border-secondary transition-colors duration-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm tracking-wider uppercase text-primary mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-0 py-3 bg-transparent border-0 border-b border-primary/20 text-primary placeholder:text-muted/50 focus:outline-none focus:border-secondary transition-colors duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-4 text-sm tracking-[0.2em] uppercase hover:bg-secondary transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
