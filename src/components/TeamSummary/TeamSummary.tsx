import {
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import { AgGridReact } from 'ag-grid-react';
import { IUserProfile } from '../../interfaces/user';
import { columnAPI } from '../../api/ColumnAPI';
import { columnDefsList } from './ColumnsDefs';
import { localStorageManager } from '../../utils/localStorageManager';
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
  const { getFinalColumnCards } = columnAPI();
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<RowDataItem[]>([]);
  const [columnDefs, setColumnDefs] = useState(columnDefsList);

  const fetchFinalColumnCards = async (boardId: string) => {
    try {
      const columnsData = await getFinalColumnCards(boardId);

      if (columnsData) {
        const allCards = Object.values(columnsData).flat();
        const updatedRowData = allCards.map((card) => ({
          columnId: card.columnId,
          cardComment: card.cardComment,
          cardTags: card.cardTags ? card.cardTags.join(', ') : '',
          cardReactions: card.cardReactions,
          cardAuthor: card.cardAuthor
        }));

        return updatedRowData || null;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUserData = async () => {
    try {
      const userProfile: IUserProfile | undefined = await getUserById(localUser._id);

      if (!URLBoardId && userProfile && userProfile.boards) {
        navigate(`/boardDetails/${userProfile.boards.finalized}`);

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

    fetchFinalColumnCards(URLBoardId).then(rowData => {
      if (rowData) {
        setRowData(rowData);
      }
    });

  }, [URLBoardId]);

  const getRowId = useMemo(() => (params: any) =>
    params.data.cardAuthor + params.data.cardComment
  , []);

  return (
    <div id='myGrid' className='ag-theme-alpine'>
      <AgGridReact
        animateRows={true}
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection={'multiple'}
        getRowId={getRowId}
        defaultColDef={{
          flex: 1
        }}
        icons={{filter: '<i class="bi bi-filter"></i>'}}
      />
    </div>
  );
};

export default TeamSummary;
