import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light px-6">
      <div className="text-center">
        <p className="text-secondary tracking-[0.4em] uppercase text-sm mb-4">Error</p>
        <h1 className="font-display text-8xl md:text-9xl text-primary font-light mb-6">404</h1>
        <p className="text-muted text-lg mb-10">La página que buscás no existe</p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-secondary transition-colors duration-500"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Error404;
