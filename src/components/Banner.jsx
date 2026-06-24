import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

const Banner = () => {
  return (
    <section className="py-24 bg-light">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-secondary tracking-[0.3em] uppercase text-sm mb-4">Conectá con nosotros</p>
            <h2 className="font-display text-4xl md:text-5xl text-primary font-light mb-6">
              Seguinos en nuestras redes
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-10">
              Descubrí más sobre nuestros proyectos y servicios en nuestras plataformas digitales.
            </p>

            <div className="flex gap-6">
              <a
                href="https://www.facebook.com/profile.php?id=61565154660636"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://www.instagram.com/gio.estudio.arq/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@gio.arquitectura"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FaTiktok size={18} />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square overflow-hidden">
              <img src="/GIO MAS TIRA.png" alt="GIO" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
