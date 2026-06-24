import '../css/projectdetail.css';

import { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { axiosInstance } from '../config/axiosInstance';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axiosInstance.get(`/proyectos/${id}`);
        setProject(res.data.project);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar el proyecto',
          text: error.response?.data?.mensaje || 'Error desconocido',
        });
      } finally {
        setLoading(false);
      }
    };

    getProject();
  }, [id]);

  const slides = project?.gallery?.map((img) => ({ src: img.url })) || [];

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-[70vh] flex items-end"
        style={{
          backgroundImage: loading
            ? 'none'
            : `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${project?.coverImage?.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-primary/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16 w-full">
          {loading ? (
            <Skeleton height={50} width="60%" baseColor="#333" highlightColor="#555" />
          ) : (
            <>
              <p className="text-secondary tracking-[0.3em] uppercase text-sm mb-4">Proyecto</p>
              <h1 className="font-display text-4xl md:text-6xl text-white font-light">
                {project.title.toUpperCase()}
              </h1>
            </>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-muted hover:text-secondary transition-colors duration-300 mb-12"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>

          {loading ? (
            <div className="space-y-6">
              <Skeleton count={3} height={20} />
              <div className="grid sm:grid-cols-2 gap-6 mt-12">
                {[1, 2, 3, 4].map((_, i) => (
                  <Skeleton key={i} height={250} className="rounded-none" />
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="max-w-3xl mb-16">
                <p className="text-lg text-muted leading-relaxed mb-6">{project.description}</p>
                <p className="text-muted leading-relaxed">{project.details}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {project.gallery.map((image, idx) => (
                  <div
                    key={idx}
                    className="aspect-[4/3] overflow-hidden cursor-pointer group"
                    onClick={() => {
                      setIndex(idx);
                      setOpen(true);
                    }}
                  >
                    <img
                      src={image.url}
                      alt={`Imagen ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {open && (
                <Lightbox
                  open={open}
                  close={() => setOpen(false)}
                  slides={slides}
                  index={index}
                  plugins={[Zoom]}
                  zoom={{ maxZoomPixelRatio: 2, doubleTapDelay: 300 }}
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ProjectDetails;
