import { useLocation } from 'react-router-dom';

const useLastPartLocation = () => {
    const location = useLocation();
    const pathnameParts = location.pathname.split('/');
    const lastPart = pathnameParts[pathnameParts.length - 1];

    return lastPart;
};

export default useLastPartLocation;
