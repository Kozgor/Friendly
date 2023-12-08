import {
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { IUserProfile } from '../../interfaces/user';
import { PropsChildren } from '../../interfaces/interactivePanelChildren';
import { RowDataItem } from '../../interfaces/boardSummaryRowData';
import { boardSummaryAPI } from '../../api/BoardSummaryAPI';
import { boardSummaryDefsList } from './BoardSummaryColumnDefs';
import { localStorageManager } from '../../utils/localStorageManager';
import { pathConstants } from '../../router/pathConstants';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../api/UserAPI';

import DownloadBoardSummaryCSVButton from './DownloadCSVButton';
import InteractivePanel from '../InteractivePanel/InteractivePanel';
import useBoardIdLocation from '../../utils/useBoardIdLocation';

import './BoardSummary.scss';

const BoardSummary = () => {
  const { getUserById } = userAPI();
  const { getLocalUserData } = localStorageManager();
  const localUser = getLocalUserData();
  const URLBoardId= useBoardIdLocation();
  const navigate = useNavigate();
  const { getBoardSummary } = boardSummaryAPI();
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<RowDataItem[]>([]);
  const [boardName, setBoardName] = useState<string>('');
  const [isSummaryDownload, enableDownloadSummaryCSV] = useState<boolean>(false);

  const downloadCSV = () => {
    if (gridRef) {
      gridRef.current?.api.exportDataAsCsv({
        suppressQuotes: true
      });
    }
  };

  const fetchBoardSummary = async (boardId: string) => {
    try {
      const boardSummary = await getBoardSummary(boardId);

      if (boardSummary[0].columnId) {
        enableDownloadSummaryCSV(true);
        setRowData(boardSummary);
        setBoardName(boardSummary[0].boardName);

        return;
      }

      enableDownloadSummaryCSV(false);
      setBoardName(boardSummary[0].boardName);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const userProfile: IUserProfile | undefined = await getUserById(localUser._id);

      if (!URLBoardId && userProfile && userProfile.boards?.finalized) {
        navigate(`/board_summary/${userProfile.boards.finalized}`);

        return;
      }
    } catch(error) {
      console.log(error);
    }
  };

  const childrenConfig: PropsChildren[] = [
    {
      element: `${pathConstants.BOARD}/${URLBoardId}`,
      label: `${boardName} | Summary`,
      position: 'left'
    }, {
      element: <DownloadBoardSummaryCSVButton
        isDisabled={!isSummaryDownload}
        onClick={downloadCSV}
      />,
      position: 'rigth'
    }
  ];

  useEffect(() => {
    if (!URLBoardId.length) {
      getUserData();
    }

    fetchBoardSummary(URLBoardId);
  }, [URLBoardId]);

  const getRowId = useMemo(() => (params: any) =>
    params.data.cardAuthor + params.data.cardComment, []);

  return (
    <div className='boardSummaryContainer'>
      <InteractivePanel childrenConfig={childrenConfig} />
      <div id='summary-grid' className='ag-theme-alpine'>
        <AgGridReact
          animateRows={true}
          ref={gridRef}
          rowData={rowData}
          columnDefs={boardSummaryDefsList}
          rowSelection={'multiple'}
          getRowId={getRowId}
          defaultColDef={{ flex: 1 }}
          icons={{ filter: '<i class="bi bi-filter"></i>' }}
        />
      </div>
    </div>
  );
};

export default BoardSummary;
