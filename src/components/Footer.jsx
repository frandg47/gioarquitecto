const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src="/LOGO SOLO.png" alt="GIO" className="h-10 w-auto" />
            <div className="h-8 w-px bg-white/20" />
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} GIO Construcción & Diseño
            </p>
          </div>
          <p className="text-white/40 text-sm">Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
