import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
import { axiosInstance } from '../config/axiosInstance.js';

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('todos');
  const [loading, setLoading] = useState(true);

  const getProjects = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/proyectos');
      setProjects(response.data.projects || []);
    } catch (error) {
      setProjects([]);
      Swal.fire({
        icon: 'error',
        title: `Error ${error.response?.data?.status || ''}`,
        text: error.response?.data?.mensaje || 'Error desconocido',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const filteredProjects =
    activeFilter === 'todos'
      ? projects
      : projects.filter((p) => p.category?.toLowerCase() === activeFilter);

  const filters = ['todos', 'residencial', 'comercial'];

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-8 py-3 text-sm tracking-[0.15em] uppercase transition-all duration-300 border ${
                activeFilter === filter
                  ? 'bg-primary text-white border-primary'
                  : 'bg-transparent text-primary border-primary/20 hover:border-primary'
              }`}
            >
              {filter === 'todos' ? 'Todos' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? [...Array(6)].map((_, i) => (
                <div key={i}>
                  <Skeleton height={350} className="rounded-none" />
                  <Skeleton height={20} width="60%" className="mt-4" />
                  <Skeleton height={16} width="40%" className="mt-2" />
                </div>
              ))
            : filteredProjects.map((project) => (
                <ProjectCard key={project._id} {...project} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
