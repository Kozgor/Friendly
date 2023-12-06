import { findKey, isEmpty } from 'lodash';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { IPageSubheaderNavigation } from '../../interfaces/pageSubheaderNavigation';
import { IconButton } from '@mui/joy';
import { icons } from '../../theme/icons/icons';
import { localStorageManager } from '../../utils/localStorageManager';
import { pathConstants } from '../../router/pathConstants';

import classes from './PageSubheader.module.scss';

const PageSubheader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getLocalBoardDatails } = localStorageManager();
  const currentBoardDetails = getLocalBoardDatails();
  const [backward, setBackward] = useState<string|null>(null);
  const [forward, setForward] = useState<string|null>(null);
  const [backwardLabel, setBackwardLabel] = useState<string|null>(null);
  const [forwardLabel, setForwardLabel] = useState<string|null>(null);
  const [element, setElement] = useState<ReactNode|null>();
  const gridRef = useRef<AgGridReact>(null);

  const getCSVFile = () => {
    gridRef.current?.api.exportDataAsCsv({
      suppressQuotes: true
    });
  };

  const subheaderTitles = {
    newBoard: 'New Board',
    defaultBoard: 'Default Board',
    boardsManagement: 'Boards Management',
    boardSummary: 'Summary',
    board: currentBoardDetails.currentBoardName
  };

  const setNavigationAndTitles = (params: IPageSubheaderNavigation) => {
    const { backward, forward, backwardLabel, forwardLabel } = params;

    setBackward(backward || null);
    setForward(forward || null);
    setBackwardLabel(backwardLabel || null);
    setForwardLabel(forwardLabel || null);
    setElement(<button onClick={getCSVFile}>Download csv file</button>);
  };

  const headerNavigationConditions = {
    '/board/' : {
      backward: pathConstants.ADMIN,
      forward: `${pathConstants.BOARD_SUMMARY}/${currentBoardDetails.currentBoardId}`,
      backwardLabel: `${subheaderTitles.board}`,
      forwardLabel: subheaderTitles.boardSummary
    },
    '/board_summary/' : {
      backward: `${pathConstants.BOARD}/${currentBoardDetails.currentBoardId}`,
      backwardLabel: `${currentBoardDetails.currentBoardName} | ${subheaderTitles.boardSummary}`,
      element: element
    },
    '/admin/new_board/default_board' : {
      backwardLabel: subheaderTitles.defaultBoard
    },
    '/admin/new_board' : {
      backwardLabel: subheaderTitles.newBoard
    },
    '/admin/boards_management' : {
      backwardLabel: subheaderTitles.boardsManagement
    }
  };

  const setupHeaderNavigation = (path: string) => {
    const resultKey = findKey(headerNavigationConditions, (value, key) => path.startsWith(key));

    if (resultKey) {
      setNavigationAndTitles(headerNavigationConditions[resultKey]);
    }
  };

  const onBackward = () => {
    if (backward) {
      navigate(backward);
    }
  };

  const onForward = () => {
    if (forward) {
      navigate(forward);
    }
  };

  useEffect(() => {
    setupHeaderNavigation(location.pathname);
  }, [location.pathname]);

  return(
    <div className={classes.subheaderContainer}>
      {!isEmpty(backward) &&
        <span className={classes.subheaderContainerBackward}>
          <IconButton
            variant="solid"
            onClick={onBackward}
            sx={{
              backgroundColor: '#ffa62b',
              '&:hover': {
                backgroundColor: '#ffa62b'
              }
            }}
          >
            {icons.shewronDoubleLeft}
          </IconButton>
        </span>
      }
      {!isEmpty(backwardLabel) &&
        <span className={classes.subheaderContainerFirstTitle}>
          <h2>{backwardLabel}</h2>
        </span>}
      {!isEmpty(forwardLabel) &&
        <span className={classes.subheaderContainerSecondTitle}>
          <h2>{forwardLabel}</h2>
        </span>}
      {!isEmpty(forward) &&
        <span className={classes.subheaderContainerForward}>
          <IconButton
            variant="solid"
            onClick={onForward}
            sx={{
              backgroundColor: '#ffa62b',
              '&:hover': {
                backgroundColor: '#ffa62b'
              }
            }}
          >
            {icons.shewronDoubleRigth}
          </IconButton>
        </span>
      }
      {element &&
        <span className={classes.subheaderContainerForward}>
          {element}
        </span>
      }
    </div>
  );
};

export default PageSubheader;
