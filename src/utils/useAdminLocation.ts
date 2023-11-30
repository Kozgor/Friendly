import { useLocation } from 'react-router-dom';

const useAdminLocation = () => {
  const location = useLocation();
  const match = location.pathname.match(/\/admin\/([^/]+)/);

  return match ? match[1] : '';
};

export default useAdminLocation;
