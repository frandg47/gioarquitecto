import { useState } from 'react';
import { compressImage, compressImages } from '../helpers/compressImage';

const CreateProjectModal = ({ show, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('Residencial');
  const [coverImage, setCoverImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [compressing, setCompressing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!title || !coverImage) {
      alert('El título y la imagen de portada son obligatorios.');
      setIsSubmitting(false);
      return;
    }

    try {
      setCompressing(true);
      const compressedCover = await compressImage(coverImage);
      const compressedGallery = gallery.length > 0 ? await compressImages(gallery) : [];
      setCompressing(false);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('details', details);
      formData.append('category', category);
      formData.append('coverImage', compressedCover);
      compressedGallery.forEach((file) => formData.append('gallery', file));

      await onSave(formData);
      handleClose();
    } catch (error) {
      console.error('Error al guardar el proyecto:', error);
    } finally {
      setIsSubmitting(false);
      setCompressing(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setDetails('');
    setCategory('Residencial');
    setCoverImage(null);
    setGallery([]);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="px-8 py-6 border-b border-primary/10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-primary font-light">Crear Proyecto</h2>
            <button onClick={handleClose} className="text-muted hover:text-primary transition-colors text-2xl">&times;</button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-8 py-6 space-y-5">
            <div>
              <label className="block text-xs tracking-wider uppercase text-primary mb-2">Título *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-4 py-3 border border-primary/20 text-primary focus:outline-none focus:border-secondary transition-colors" />
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-primary mb-2">Descripción</label>
              <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 border border-primary/20 text-primary focus:outline-none focus:border-secondary transition-colors resize-none" />
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-primary mb-2">Detalles</label>
              <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} className="w-full px-4 py-3 border border-primary/20 text-primary focus:outline-none focus:border-secondary transition-colors" />
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-primary mb-2">Categoría</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 border border-primary/20 text-primary focus:outline-none focus:border-secondary transition-colors bg-white">
                <option value="Residencial">Residencial</option>
                <option value="Comercial">Comercial</option>
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-primary mb-2">Imagen de portada *</label>
              <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} required className="w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:tracking-wider file:uppercase file:bg-primary file:text-white hover:file:bg-secondary file:cursor-pointer" />
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-primary mb-2">Galería (opcional)</label>
              <input type="file" accept="image/*" multiple onChange={(e) => setGallery(Array.from(e.target.files))} className="w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:tracking-wider file:uppercase file:bg-primary file:text-white hover:file:bg-secondary file:cursor-pointer" />
            </div>
          </div>
          <div className="px-8 py-6 border-t border-primary/10 flex justify-end gap-4">
            <button type="button" onClick={handleClose} className="px-6 py-3 border border-primary/20 text-primary text-sm tracking-wider uppercase hover:bg-light transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting || compressing} className="px-6 py-3 bg-secondary text-white text-sm tracking-wider uppercase hover:bg-secondary/90 transition-colors disabled:opacity-50">
              {compressing ? 'Comprimiendo...' : isSubmitting ? 'Creando...' : 'Crear Proyecto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
