import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FORM_SCHEMA } from '../helpers/validationsSchemas';
import Swal from 'sweetalert2';
import { axiosInstance } from '../config/axiosInstance';

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(FORM_SCHEMA) });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axiosInstance.post('/enviar/formulario', data);
      Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado',
        text: '¡Pronto nos pondremos en contacto!',
        confirmButtonColor: '#c9a96e',
      });
      reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrió un error',
        text: error.response?.data?.mensaje || 'Intenta nuevamente más tarde',
        confirmButtonColor: '#c9a96e',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-secondary tracking-[0.3em] uppercase text-sm mb-4">Contacto</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary font-light">
            Hablemos de tu proyecto
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm tracking-wider uppercase text-primary mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="José Martinez"
                  {...register('name')}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-primary/20 text-primary placeholder:text-muted/50 focus:outline-none focus:border-secondary transition-colors duration-300 text-lg"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm tracking-wider uppercase text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="nombre@ejemplo.com"
                  {...register('email')}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-primary/20 text-primary placeholder:text-muted/50 focus:outline-none focus:border-secondary transition-colors duration-300 text-lg"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm tracking-wider uppercase text-primary mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Escribe tu mensaje aquí..."
                  {...register('message')}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-primary/20 text-primary placeholder:text-muted/50 focus:outline-none focus:border-secondary transition-colors duration-300 text-lg resize-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-2">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-4 text-sm tracking-[0.2em] uppercase hover:bg-secondary transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <h4 className="text-sm tracking-[0.2em] uppercase text-secondary mb-2">Email</h4>
                <p className="text-primary text-lg">gio.arquitectura.d@gmail.com</p>
              </div>
              <div>
                <h4 className="text-sm tracking-[0.2em] uppercase text-secondary mb-2">Teléfono</h4>
                <p className="text-primary text-lg">+54 3814199809</p>
              </div>
              <div className="pt-8">
                <img
                  src="/contacto.jpg"
                  alt="Contacto"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
