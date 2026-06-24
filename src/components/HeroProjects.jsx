import { useState, useEffect } from 'react';

const HeroProjects = () => {
  const [current, setCurrent] = useState(0);
  const images = ['/proyecto2.png', '/proyecto4.png', '/proyecto1.jpg'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {images.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: index === current ? 1 : 0 }}
        >
          <div
            className="h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${img}')` }}
          >
            <div className="absolute inset-0 bg-primary/50" />
          </div>
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center">
          <p className="text-secondary tracking-[0.4em] uppercase text-sm mb-4">Portfolio</p>
          <h1 className="font-display text-5xl md:text-7xl text-white font-light">PROYECTOS</h1>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? 'bg-secondary w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroProjects;
