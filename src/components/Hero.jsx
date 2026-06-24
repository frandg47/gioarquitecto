import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-scale-in"
          style={{ backgroundImage: `url('/proyecto2.png')` }}
        >
          <div className="absolute inset-0 bg-primary/60" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-secondary tracking-[0.4em] uppercase text-sm mb-6 font-medium animate-fade-in-up">
            Arquitectura & Diseño
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white font-light leading-tight mb-8 animate-fade-in-up animate-delay-200">
            Hacemos posible
            <br />
            <span className="font-medium italic">tu proyecto</span>
          </h1>
          <Link
            to="/proyectos"
            className="inline-block border border-secondary text-secondary px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-secondary hover:text-primary transition-all duration-500 animate-fade-in-up animate-delay-400"
          >
            Nuestros proyectos
          </Link>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <p className="text-secondary tracking-[0.3em] uppercase text-sm mb-4">Sobre nosotros</p>
              <h2 className="font-display text-4xl md:text-5xl text-primary font-light mb-2">
                GIO
              </h2>
              <p className="text-muted text-lg mb-8">Construcción & Diseño</p>
              <div className="w-16 h-px bg-secondary mb-8" />
              <p className="text-muted leading-relaxed text-lg">
                Somos un estudio joven que diseña con los pies en la tierra. Nos especializamos en crear
                proyectos funcionales, estéticos y, sobre todo, ajustados al bolsillo del cliente. Sabemos
                lo que cuesta construir, por eso cada diseño está pensado para ser posible, accesible y
                bien resuelto desde el primer boceto hasta el último detalle.
              </p>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/casa 2.jpg"
                  alt="GIO Arquitectura"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-secondary p-8 max-w-xs">
                <p className="font-display text-3xl text-primary font-light">10+</p>
                <p className="text-primary/80 text-sm tracking-wider uppercase mt-1">Años de experiencia</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
