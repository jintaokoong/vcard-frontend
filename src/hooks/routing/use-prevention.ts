import { AuthenticationContext } from '@/providers/authentication-provider';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const usePrevention = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, hydrated } = useContext(AuthenticationContext);

  useEffect(() => {
    if (!hydrated) return;
    if (pathname === '/') {
      navigate(user == null ? '/login' : '/main');
    } else if (pathname === '/login' && user != null) {
      navigate('/main');
    } else if (pathname === '/main' && user == null) {
      navigate('/login');
    }
  }, [pathname, user, hydrated, navigate]);
};

export default usePrevention;
