const Services = () => {
  const services = [
    {
      image: '/diseño-arquitectonico.jpg',
      title: 'Diseño Arquitectónico',
      description: 'Creación de planos y diseños innovadores que se ajustan a las necesidades y estética de cada cliente.',
    },
    {
      image: '/asesoria-tecnica.jpg',
      title: 'Asesoría Técnica',
      description: 'Asesoramiento experto para proyectos de construcción y remodelación, con un enfoque en la sostenibilidad y funcionalidad.',
    },
    {
      image: '/gestion-proyectos.jpg',
      title: 'Gestión de Proyectos',
      description: 'Planificación, coordinación y supervisión de la ejecución de proyectos arquitectónicos de principio a fin.',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-secondary tracking-[0.3em] uppercase text-sm mb-4 animate-fade-in-up">Lo que hacemos</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary font-light animate-fade-in-up animate-delay-100">
            Nuestros Servicios
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group animate-fade-in-up`}
              style={{ animationDelay: `${index * 150 + 300}ms` }}
            >
              <div className="aspect-[3/4] overflow-hidden mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-secondary font-display text-3xl font-light">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl text-primary">{service.title}</h3>
              </div>
              <p className="text-muted leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
