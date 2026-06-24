import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { axiosInstance } from '../config/axiosInstance';

const EditProjectModal = ({ show, onClose, project, onSave }) => {
  const [formData, setFormData] = useState({ title: '', description: '', category: '', details: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        category: project.category || '',
        details: project.details || '',
      });
    }
  }, [project]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.put(`/editar/proyecto/${project._id}`, formData);
      Swal.fire('Actualizado', response.data.mensaje || 'Proyecto actualizado', 'success');
      onSave({ ...project, ...formData });
    } catch (err) {
      console.error(err);
      Swal.fire('Error', err.response?.data?.mensaje || 'No se pudo actualizar', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full max-w-lg shadow-xl">
        <div className="px-8 py-6 border-b border-primary/10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-primary font-light">Editar Proyecto</h2>
            <button onClick={onClose} className="text-muted hover:text-primary transition-colors text-2xl">&times;</button>
          </div>
        </div>
        <div className="px-8 py-6 space-y-5">
          <div>
            <label className="block text-xs tracking-wider uppercase text-primary mb-2">Título</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-3 border border-primary/20 text-primary focus:outline-none focus:border-secondary transition-colors" />
          </div>
          <div>
            <label className="block text-xs tracking-wider uppercase text-primary mb-2">Descripción</label>
            <textarea name="description" rows={3} value={formData.description} onChange={handleInputChange} className="w-full px-4 py-3 border border-primary/20 text-primary focus:outline-none focus:border-secondary transition-colors resize-none" />
          </div>
          <div>
            <label className="block text-xs tracking-wider uppercase text-primary mb-2">Categoría</label>
            <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-3 border border-primary/20 text-primary focus:outline-none focus:border-secondary transition-colors bg-white">
              <option value="Residencial">Residencial</option>
              <option value="Comercial">Comercial</option>
            </select>
          </div>
          <div>
            <label className="block text-xs tracking-wider uppercase text-primary mb-2">Detalles</label>
            <input type="text" name="details" value={formData.details} onChange={handleInputChange} className="w-full px-4 py-3 border border-primary/20 text-primary focus:outline-none focus:border-secondary transition-colors" />
          </div>
        </div>
        <div className="px-8 py-6 border-t border-primary/10 flex justify-end gap-4">
          <button onClick={onClose} disabled={isSubmitting} className="px-6 py-3 border border-primary/20 text-primary text-sm tracking-wider uppercase hover:bg-light transition-colors disabled:opacity-50">
            Cancelar
          </button>
          <button onClick={handleSubmit} disabled={isSubmitting} className="px-6 py-3 bg-primary text-white text-sm tracking-wider uppercase hover:bg-secondary transition-colors disabled:opacity-50">
            {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
