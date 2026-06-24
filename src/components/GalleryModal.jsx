import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { axiosInstance } from '../config/axiosInstance';
import { compressImages } from '../helpers/compressImage';

const GalleryModal = ({ show, onClose, project, onGalleryUpdated }) => {
  const [uploading, setUploading] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    if (project?.gallery) {
      setExistingImages(project.gallery);
    }
  }, [project]);

  const handleDeleteImage = (imageToDelete) => {
    Swal.fire({
      title: '¿Eliminar imagen?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setExistingImages((prev) => prev.filter((img) => img.url !== imageToDelete.url));
      }
    });
  };

  const handleSaveChanges = async () => {
    setUploading(true);
    try {
      const compressedFiles = await compressImages(selectedFiles);
      const formData = new FormData();
      compressedFiles.forEach((file) => formData.append('gallery', file));
      formData.append('existingImages', JSON.stringify(existingImages));
      const { data } = await axiosInstance.put(`/editar/proyecto/${project._id}/actualizar-galeria`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Swal.fire('Éxito', 'Galería actualizada correctamente', 'success');
      if (onGalleryUpdated) onGalleryUpdated(data);
      onClose();
    } catch (error) {
      console.error('Error al actualizar galería:', error);
      Swal.fire('Error', 'No se pudo actualizar la galería', 'error');
    } finally {
      setUploading(false);
      setSelectedFiles([]);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full max-w-3xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="px-8 py-6 border-b border-primary/10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-primary font-light">Galería de {project?.title}</h2>
            <button onClick={onClose} className="text-muted hover:text-primary transition-colors text-2xl">&times;</button>
          </div>
        </div>
        <div className="px-8 py-6">
          {existingImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {existingImages.map((img, index) => (
                <div key={index} className="relative group aspect-square">
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => handleDeleteImage(img)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-sm"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted py-8">No hay imágenes en la galería.</p>
          )}

          <div className="border-t border-primary/10 pt-6">
            <label className="block text-xs tracking-wider uppercase text-primary mb-2">Agregar nuevas imágenes</label>
            <input
              type="file"
              multiple
              onChange={(e) => setSelectedFiles(e.target.files)}
              accept="image/*"
              className="w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:tracking-wider file:uppercase file:bg-primary file:text-white hover:file:bg-secondary file:cursor-pointer"
            />
          </div>
        </div>
        <div className="px-8 py-6 border-t border-primary/10 flex justify-end gap-4">
          <button onClick={onClose} disabled={uploading} className="px-6 py-3 border border-primary/20 text-primary text-sm tracking-wider uppercase hover:bg-light transition-colors disabled:opacity-50">
            Cancelar
          </button>
          <button onClick={handleSaveChanges} disabled={uploading} className="px-6 py-3 bg-primary text-white text-sm tracking-wider uppercase hover:bg-secondary transition-colors disabled:opacity-50">
            {uploading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
