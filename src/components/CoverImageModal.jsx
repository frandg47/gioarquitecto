import { useState } from 'react';
import Swal from 'sweetalert2';
import { axiosInstance } from '../config/axiosInstance';
import { compressImage } from '../helpers/compressImage';

const CoverImageModal = ({ show, onClose, project, onSave }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSave = async () => {
    if (!selectedFile) {
      Swal.fire('Error', 'Debes seleccionar una nueva imagen para la portada.', 'error');
      return;
    }

    setUploading(true);
    try {
      const compressed = await compressImage(selectedFile);
      const formData = new FormData();
      formData.append('coverImage', compressed);
      const res = await axiosInstance.put(`/editar/proyecto/${project._id}/actualizar-portada`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Swal.fire('Éxito', 'Portada actualizada correctamente.', 'success');
      setSelectedFile(null);
      onSave(res.data);
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo actualizar la portada.', 'error');
    } finally {
      setUploading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full max-w-2xl shadow-xl">
        <div className="px-8 py-6 border-b border-primary/10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-primary font-light">Portada de {project?.title}</h2>
            <button onClick={onClose} className="text-muted hover:text-primary transition-colors text-2xl">&times;</button>
          </div>
        </div>
        <div className="px-8 py-6">
          {project?.coverImage ? (
            <div className="mb-6">
              <img src={project.coverImage.url} alt="" className="w-full aspect-video object-cover" />
            </div>
          ) : (
            <p className="text-center text-muted py-8">No hay imagen.</p>
          )}
          <label className="block text-xs tracking-wider uppercase text-primary mb-2">Seleccionar nueva imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:tracking-wider file:uppercase file:bg-primary file:text-white hover:file:bg-secondary file:cursor-pointer"
          />
        </div>
        <div className="px-8 py-6 border-t border-primary/10 flex justify-end gap-4">
          <button onClick={onClose} disabled={uploading} className="px-6 py-3 border border-primary/20 text-primary text-sm tracking-wider uppercase hover:bg-light transition-colors disabled:opacity-50">
            Cerrar
          </button>
          <button onClick={handleSave} disabled={uploading} className="px-6 py-3 bg-primary text-white text-sm tracking-wider uppercase hover:bg-secondary transition-colors disabled:opacity-50">
            {uploading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverImageModal;
