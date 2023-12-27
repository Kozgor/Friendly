import ReactionsCellRenderer from './ReactionsCellRenderer';

const reactionsFormatter = (params: any) => {
  const { happy, unhappy } = params.value;

  return String(`happy: ${happy}, unhappy: ${unhappy}`);
};

export const boardSummaryDefsList = [{
  headerName: 'COLUMN',
  field: 'columnId',
  filter: 'agTextColumnFilter',
  maxWidth: 170
}, {
  headerName: 'COMMENT',
  field: 'cardComment',
  filter: 'agTextColumnFilter',
  flex: 2
}, {
  headerName: 'TAGS',
  field: 'cardTags',
  filter: 'agTextColumnFilter',
  maxWidth: 216
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
  flex: 1
}];
