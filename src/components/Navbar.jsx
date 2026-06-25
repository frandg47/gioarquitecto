import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/proyectos') return location.pathname.startsWith('/proyectos');
    return location.pathname === path;
  };

  const handleSectionClick = (sectionId) => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  const handleLogoClick = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkClass = (path) =>
    `text-sm tracking-[0.2em] uppercase transition-colors duration-300 ${
      isActive(path) ? 'text-secondary' : 'text-white/80 hover:text-white'
    }`;

  const hasBg = scrolled || menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hasBg ? 'bg-primary/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <span className="cursor-pointer" onClick={handleLogoClick}>
            <img src="/LOGO 2.png" alt="GIO" className="h-12 w-auto" />
          </span>

          <nav className="hidden md:flex items-center gap-10">
            <Link to="/" className={linkClass('/')}>Inicio</Link>
            <Link to="/proyectos" className={linkClass('/proyectos')}>Proyectos</Link>
            <button onClick={() => handleSectionClick('about')} className={linkClass('about')}>
              Nosotros
            </button>
            <button onClick={() => handleSectionClick('contact')} className={linkClass('contact')}>
              Contacto
            </button>
          </nav>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2 relative z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-primary shadow-xl transition-all duration-500 ease-out overflow-hidden ${
          menuOpen ? 'max-h-[80vh] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center py-8 px-6">
          {[
            { to: '/', label: 'Inicio', type: 'link' },
            { to: '/proyectos', label: 'Proyectos', type: 'link' },
            { label: 'Nosotros', type: 'button', section: 'about' },
            { label: 'Contacto', type: 'button', section: 'contact' },
          ].map((item, index) => (
            <div
              key={item.label}
              className={`w-full text-center transition-all duration-500 ease-out ${
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: menuOpen ? `${index * 80 + 100}ms` : '0ms' }}
            >
              {item.type === 'link' ? (
                <Link
                  to={item.to}
                  className="block py-4 text-lg tracking-[0.25em] uppercase text-white/80 hover:text-secondary transition-colors duration-300 border-b border-white/10 last:border-0"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={() => handleSectionClick(item.section)}
                  className="block w-full py-4 text-lg tracking-[0.25em] uppercase text-white/80 hover:text-secondary transition-colors duration-300 border-b border-white/10 last:border-0"
                >
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
