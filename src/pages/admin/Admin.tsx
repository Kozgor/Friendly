import Dashboard from '../../components/Dashboard/Dashboard';

import { BoardProvider } from '../../context/board/boardContext';

const AdminPage = () => (
    <>
      <BoardProvider>
        <Dashboard />
      </BoardProvider>
    </>
  );

export default AdminPage;
