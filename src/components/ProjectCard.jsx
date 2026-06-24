import { Link } from 'react-router-dom';

const ProjectCard = ({ _id, coverImage, title, description }) => {
  return (
    <Link to={`/proyectos/${_id}`} className="group block">
      <div className="aspect-[3/4] overflow-hidden relative">
        <img
          src={coverImage.url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <h3 className="font-display text-xl text-white mb-2">{title}</h3>
          <p className="text-white/70 text-sm line-clamp-2">{description}</p>
        </div>
      </div>
      <div className="pt-4">
        <h3 className="font-display text-lg text-primary group-hover:text-secondary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted text-sm mt-1 line-clamp-1">{description}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
