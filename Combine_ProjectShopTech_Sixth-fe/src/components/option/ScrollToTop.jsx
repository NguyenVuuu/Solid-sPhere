import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ScrollToTop = () => {
  const { t } = useTranslation();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;

// Updated: 2025-10-12T16:06:27.927Z

// Updated: 2025-10-12T16:08:56.020Z
