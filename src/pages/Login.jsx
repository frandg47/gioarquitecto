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
    <div className="relative min-h-screen flex items-center justify-center px-6">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/proyecto4.png')` }}
      >
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />
      </div>

      {/* Form */}
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <img src="/LOGO SOLO.png" alt="GIO" className="h-16 w-auto mx-auto mb-6" />
          <p className="text-secondary tracking-[0.3em] uppercase text-sm mb-4">Admin</p>
          <h1 className="font-display text-4xl text-white font-light">Iniciar Sesión</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 backdrop-blur-md border border-white/20 p-10">
          <div>
            <label htmlFor="email" className="block text-sm tracking-wider uppercase text-white/80 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/30 text-white placeholder:text-white/40 focus:outline-none focus:border-secondary transition-colors duration-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm tracking-wider uppercase text-white/80 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/30 text-white placeholder:text-white/40 focus:outline-none focus:border-secondary transition-colors duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-secondary text-primary py-4 text-sm tracking-[0.2em] uppercase hover:bg-white transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed mt-4 font-medium"
          >
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
