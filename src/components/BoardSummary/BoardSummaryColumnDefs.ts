import ReactionsCellRenderer from './ReactionsCellRenderer';

const reactionsFormatter = (params: any) => {
  const { happy, unhappy } = params.value;

  return String(`happy: ${happy}, unhappy: ${unhappy}`);
};

export const boardSummaryDefsList = [{
    headerName: 'COLUMN',
    field: 'columnId',
    filter: 'agTextColumnFilter',
    maxWidth: 170,
    filterParams: {
      caseSensitive: true,
      defaultOption: 'startsWith'
    },
    floatingFilter: true
  }, {
    headerName: 'COMMENT',
    field: 'cardComment', filter:
    'agTextColumnFilter',
    filterParams: {
      caseSensitive: true,
      defaultOption: 'startsWith'
    },
    floatingFilter: true,
    flex: 2
  }, {
    headerName: 'TAGS',
    field: 'cardTags',
    filter: 'agTextColumnFilter',
    maxWidth: 216,
    filterParams: {
      caseSensitive: true,
      defaultOption: 'startsWith'
    }, floatingFilter: true
  }, {
    headerName: 'REACTIONS',
    field: 'cardReactions',
    valueFormatter: reactionsFormatter,
    cellRenderer: ReactionsCellRenderer,
    maxWidth: 143
  }, {
    headerName: 'AUTHOR',
    field: 'cardAuthor',
    filter: 'agTextColumnFilter',
    filterParams: {
      caseSensitive: true,
      defaultOption: 'startsWith'
    },
    floatingFilter: true,
    flex: 1
}];
