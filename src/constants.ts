export const adminTabList = [
  { title: 'New Board', path: '/admin/new_board', disabled: false },
  { title: 'Boards Management', path: '/admin/boards_management', disabled: false }
  // { title: 'Archive Boards', path: '/admin/archive_boards', disabled: true }
];

export const boardStepperButtons = {
  finalize: 'Finalize',
  archive: 'Archive'
};

export const cardTextareaPlaceholder = 'Start typing here...';

export const columnConfigurationPlaceholders = {
  inputTitle: {
    start: 'Start',
    continue: 'Continue',
    stop: 'Stop'
  },
  textareaSubtitle: 'Something short and simple here'
};

export const navigationBarTitles = {
  drawerHeader: 'friendly',
  drawerSubheader: 'Home',
  navigatingListHeader: 'MY BOARDS'
};

export const panelTitles = {
  newBoard: 'New Board',
  defaultBoard: 'Default Board',
  boardsManagement: 'Boards Management',
  boardSummary: 'Summary'
};

export const possibleBoardStatuses = {
  created: 'created',
  active: 'active',
  finalized: 'finalized',
  archived: 'archived'
};

export const tagsPlaceholder = 'Tags...';

export const STEPS_MAP = {
  first: 0,
  second: 1,
  third: 2,
  fourth: 3,
  fifth: 4
};

export const boardStepperLabels = [
  'Published',
  'Solo Board',
  'Finalized',
  'Shared Board'
];

export const CREATION_ERROR = 'Creation Error';
export const UPDATING_ERROR = 'Updating Error';
export const DELETING_ERROR = 'Deleting Error';
export const LOGIN_ERROR = 'Login Error';
export const LOGIN_EMPTY_FIELDS_MESSAGE = 'Empty login or password';
export const LOGIN_WRONG_FIELDS_DATA_MESSAGE = 'Wrong login or password';
export const BOARD_PUBLISH_MESSAGE = 'board was successfully published. Now your team can play with it';
export const BOARD_SUCCESS_FINISH_MESSAGE = 'board was sent successfully to your Project Manager';
export const BOARD_ERROR_FINISH_MESSAGE = 'board was not send. Please try again';
export const GET_BOARD_BY_ID_ERROR_MESSAGE = 'Failed to load board';
export const GET_FINALIZED_CARDS_TO_BOARD_ERROR_MESSAGE = 'Failed to load finalized cards for board';
export const GET_USER_CARDS_TO_BOARD_ERROR_MESSAGE = 'Failed to load user cards for board';
export const GET_USER_BY_ID_ERROR_MESSAGE = 'Failed to load user data';
export const DELETE_CARDS_ERROR_MESSAGE = 'Failed to delete cards';
export const GET_ALL_BOARDS_ERROR_MESSAGE = 'Failed to load all boards';
export const FINALIZED_BOARD_ERROR_MESSAGE = 'Failed to finalize board';
export const GET_BOARD_SUMMARY_ERROR_MESSAGE = 'Failed to get summary board data';
export const CREATE_CARD_ERROR_MESSAGE = 'Failed to create card';
export const UPDATE_CARD_ERROR_MESSAGE = 'Failed to update card';
export const UPDATE_CARD_REACTIONS_ERROR_MESSAGE = 'Failed to update card reactions';
export const GET_ALL_USERS_ERROR_MESSAGE = 'Failed to load all users';
export const CREATE_NEW_BOARD_ERROR_MESSAGE = 'Failed to create new board';
export const DOWNLOAD_CSV_REPORT = 'Download CSV Report';
export const NO_BOARDS_MESSAGE = 'No boards found';
export const SELECT_ALL = 'Select all';
export const THERE_ARE_NO_BOARDS_MESSAGE = 'There are no boards';
export const SUMMARY_LABEL_TAIL = '| Summary';
