import Dashboard from '../../components/Dashboard/Dashboard';

import { BoardProvider } from '../../context/board/board-context';

const AdminPage = () => (
    <>
      <BoardProvider>
        <Dashboard />
      </BoardProvider>
    </>
  );

export default AdminPage;
