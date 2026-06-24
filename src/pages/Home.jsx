import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../components/Banner';
import Contact from '../components/Contact';
import Hero from '../components/Hero';
import ProjectsCarousel from '../components/ProjectsCarousel';
import Services from '../components/Services';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (scrollTo) {
      setTimeout(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <Services />
      <ProjectsCarousel />
      <Banner />
      <Contact />
    </>
  );
};

export default Home;
