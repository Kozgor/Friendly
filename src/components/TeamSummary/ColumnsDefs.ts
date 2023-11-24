import TeamSummaryCellRenderer from './CellRenderer';

export const columnDefsList = [
  { headerName: 'COLUMN', field: 'columnId', filter: 'agTextColumnFilter', maxWidth: 170, filterParams: {
    caseSensitive: true,
    defaultOption: 'startsWith'
  }, floatingFilter: true },
  { headerName: 'COMMENT', field: 'cardComment', filter: 'agTextColumnFilter', maxWidth: 538, filterParams: {
    caseSensitive: true,
    defaultOption: 'startsWith'
  }, floatingFilter: true },
  { headerName: 'TAGS', field: 'cardTags', filter: 'agTextColumnFilter', maxWidth: 216, filterParams: {
    caseSensitive: true,
    defaultOption: 'startsWith'
  }, floatingFilter: true },
  { headerName: 'REACTIONS', field: 'cardReactions', cellRenderer: TeamSummaryCellRenderer, maxWidth: 143 },
  { headerName: 'AUTHOR', field: 'cardAuthor', filter: 'agTextColumnFilter', maxWidth: 168, filterParams: {
    caseSensitive: true,
    defaultOption: 'startsWith'
  }, floatingFilter: true }
];
