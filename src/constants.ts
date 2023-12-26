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

export const BOARD_PUBLISH_MESSAGE = 'board was successfully published. Now your team can play with it';
export const DOWNLOAD_CSV_REPORT = 'Download CSV Report';
export const NO_BOARDS_MESSAGE = 'No boards found';
export const SELECT_ALL = 'Select all';
export const THERE_ARE_NO_BOARDS_MESSAGE = 'There are no boards';
export const SUMMARY_LABEL_TAIL = '| Summary';
