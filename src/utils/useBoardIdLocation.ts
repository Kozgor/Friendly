import { useLocation } from 'react-router-dom';

const useBoardIdLocation = () => {
    const location = useLocation();
    const match = location.pathname.match(/\/board\/([^/]+)/) || location.pathname.match(/\/boardDetails\/([^/]+)/);

    return match ? match[1] : '';
};

export default useBoardIdLocation;
