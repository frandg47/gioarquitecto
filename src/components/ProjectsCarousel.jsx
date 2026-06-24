import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProjectsCarousel = () => {
  const projects = [
    { image: '/proyecto1.jpg', title: 'POLO TECNOLOGICO' },
    { image: '/proyecto2.png', title: 'DUPLEX' },
    { image: '/proyecto3.png', title: 'SEDRINK' },
    { image: '/proyecto4.png', title: 'CASA LZ' },
  ];

  return (
    <section className="py-24 lg:py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-secondary tracking-[0.3em] uppercase text-sm mb-4">Portfolio</p>
          <h2 className="font-display text-4xl md:text-5xl text-white font-light">
            Nuestros Proyectos
          </h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="group relative aspect-[3/4] overflow-hidden cursor-pointer">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-display text-2xl text-white mb-4">{project.title}</h3>
                  <Link
                    to="/proyectos"
                    className="inline-block border border-secondary text-secondary px-6 py-2 text-xs tracking-[0.2em] uppercase hover:bg-secondary hover:text-primary transition-all duration-300"
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
