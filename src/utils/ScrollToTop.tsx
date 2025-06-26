import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Ce composant réinitialise la position de défilement à chaque changement de route
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Remettre le scroll en haut à chaque changement de page
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Ce composant ne rend rien
};

export default ScrollToTop;
