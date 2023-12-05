import {
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import { AgGridReact } from 'ag-grid-react';
import { IUserProfile } from '../../interfaces/user';
import { boardSummaryAPI } from '../../api/BoardSummaryAPI';
import { localStorageManager } from '../../utils/localStorageManager';
import { teamSummaryDefsList } from './TeamSummaryColumnDefs';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../api/UserAPI';

import useBoardIdLocation from '../../utils/useBoardIdLocation';

import './TeamSummary.scss';

const TeamSummary = () => {
  type RowDataItem = {
    columnId: string | undefined;
    cardComment: string;
    cardTags: string;
    cardReactions: any;
    cardAuthor: string;
  };

  const { getUserById } = userAPI();
  const { getLocalUserData } = localStorageManager();
  const localUser = getLocalUserData();
  const URLBoardId= useBoardIdLocation();
  const navigate = useNavigate();
  const { getBoardSummary } = boardSummaryAPI();
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<RowDataItem[]>([]);
  const [columnDefs, setColumnDefs] = useState(teamSummaryDefsList);

  const fetchBoardSummary = async (boardId: string) => {
    try {
      const boardSummary= await getBoardSummary(boardId);

      return boardSummary || null;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const userProfile: IUserProfile | undefined = await getUserById(localUser._id);

      if (!URLBoardId && userProfile && userProfile.boards?.finalized) {
        navigate(`/team_summary/${userProfile.boards.finalized}`);

        return;
      }
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!URLBoardId.length) {
      getUserData();
    }

    fetchBoardSummary(URLBoardId).then(rowData => {
      if (rowData) {
        setRowData(rowData);
      }
    });
  }, [URLBoardId]);

  const getRowId = useMemo(() => (params: any) =>
    params.data.cardAuthor + params.data.cardComment, []);

  return (
    <div className='teamSummaryContainer'>
      <div id='summary-grid' className='ag-theme-alpine'>
        <AgGridReact
          animateRows={true}
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection={'multiple'}
          getRowId={getRowId}
          defaultColDef={{ flex: 1 }}
          icons={{ filter: '<i class="bi bi-filter"></i>' }}
        />
      </div>
    </div>
  );
};

export default TeamSummary;
