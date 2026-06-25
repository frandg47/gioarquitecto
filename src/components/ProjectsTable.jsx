import { useState, useEffect } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Swal from 'sweetalert2';
import EditProjectModal from './EditProjectModal';
import GalleryModal from './GalleryModal';
import CreateProjectModal from './CreateProjectModal';
import CoverImageModal from './CoverImageModal';

const ProjectsTable = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectToViewGallery, setProjectToViewGallery] = useState(null);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showCoverImage, setShowCoverImage] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectToCoverImage, setProjectToCoverImage] = useState(null);

  const handleOpenCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleSaveCreate = async (formData) => {
    try {
      await axiosInstance.post('/crear/proyecto', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await getProjects();
      Swal.fire('Creado', 'El proyecto fue creado con éxito.', 'success');
      handleCloseCreateModal();
    } catch (err) {
      console.error('Error al crear proyecto:', err);
      Swal.fire('Error', 'No se pudo crear el proyecto.', 'error');
    }
  };

  const getProjects = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/proyectos');
      setProjects(response.data.projects || []);
    } catch (error) {
      setProjects([]);
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el proyecto de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`eliminar/proyecto/${id}`);
        await getProjects();
        Swal.fire('¡Eliminado!', 'El proyecto ha sido eliminado.', 'success');
      } catch (err) {
        console.error('Error al eliminar', err);
        Swal.fire('Error', 'No se pudo eliminar el proyecto.', 'error');
      }
    }
  };

  const handleSaveEdit = async (updatedProject) => {
    setProjects((prev) => prev.map((p) => (p._id === updatedProject._id ? updatedProject : p)));
    handleCloseEditModal();
  };

  const handleGalleryUpdated = (updatedProject) => {
    setProjects((prev) => prev.map((proj) => (proj._id === updatedProject._id ? updatedProject : proj)));
    setProjectToViewGallery(updatedProject);
    getProjects();
  };

  const handleCoverImageSaved = (updatedProject) => {
    setProjects((prev) => prev.map((p) => (p._id === updatedProject._id ? updatedProject : p)));
    getProjects();
  };

  const handleViewGallery = (project) => {
    setProjectToViewGallery(project);
    setShowGalleryModal(true);
  };

  const handleViewCoverImage = (project) => {
    setProjectToCoverImage(project);
    setShowCoverImage(true);
  };

  const handleCloseGalleryModal = () => {
    setShowGalleryModal(false);
    setProjectToViewGallery(null);
  };

  const handleCloseCoverImage = () => {
    setShowCoverImage(false);
    setProjectToCoverImage(null);
  };

  const handleEdit = (project) => {
    setProjectToEdit({ ...project });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setProjectToEdit(null);
  };

  return (
    <div className="min-h-screen bg-light pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-display text-3xl text-primary font-light">Lista de Proyectos</h1>
          <button
            onClick={handleOpenCreateModal}
            className="bg-secondary text-white px-6 py-3 text-sm tracking-[0.15em] uppercase hover:bg-secondary/90 transition-colors duration-300"
          >
            Crear proyecto
          </button>
        </div>

        <div className="bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-xs tracking-wider uppercase">Nombre</th>
                  <th className="px-6 py-4 text-left text-xs tracking-wider uppercase">Descripción</th>
                  <th className="px-6 py-4 text-left text-xs tracking-wider uppercase">Categoría</th>
                  <th className="px-6 py-4 text-left text-xs tracking-wider uppercase">Portada</th>
                  <th className="px-6 py-4 text-left text-xs tracking-wider uppercase">Galería</th>
                  <th className="px-6 py-4 text-left text-xs tracking-wider uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-6 py-4"><Skeleton width={120} /></td>
                        <td className="px-6 py-4"><Skeleton count={2} /></td>
                        <td className="px-6 py-4"><Skeleton width={100} /></td>
                        <td className="px-6 py-4"><Skeleton width={80} height={32} /></td>
                        <td className="px-6 py-4"><Skeleton width={80} height={32} /></td>
                        <td className="px-6 py-4"><Skeleton width={150} height={32} /></td>
                      </tr>
                    ))
                  : projects.map((project) => (
                      <tr key={project._id} className="hover:bg-light/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-primary font-medium">{project.title}</td>
                        <td className="px-6 py-4 text-sm text-muted max-w-xs truncate">{project.description}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 text-xs tracking-wider uppercase bg-light text-primary">
                            {project.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {project.coverImage ? (
                            <button
                              onClick={() => handleViewCoverImage(project)}
                              className="text-sm text-secondary hover:text-secondary/80 transition-colors"
                            >
                              Ver Portada
                            </button>
                          ) : (
                            <span className="text-sm text-muted">Sin imagen</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleViewGallery(project)}
                            className="text-sm text-secondary hover:text-secondary/80 transition-colors"
                          >
                            Ver +{project.gallery.length}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleEdit(project)}
                              className="text-sm text-primary hover:text-secondary transition-colors"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(project._id)}
                              className="text-sm text-red-500 hover:text-red-700 transition-colors"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        <EditProjectModal show={showEditModal} onClose={handleCloseEditModal} project={projectToEdit} onSave={handleSaveEdit} />
        <GalleryModal show={showGalleryModal} onClose={handleCloseGalleryModal} project={projectToViewGallery} onGalleryUpdated={handleGalleryUpdated} />
        <CoverImageModal show={showCoverImage} onClose={handleCloseCoverImage} project={projectToCoverImage} onSave={handleCoverImageSaved} />
        <CreateProjectModal show={showCreateModal} onClose={handleCloseCreateModal} onSave={handleSaveCreate} />
      </div>
    </div>
  );
};

export default ProjectsTable;
