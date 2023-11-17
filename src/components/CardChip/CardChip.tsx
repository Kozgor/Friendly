import { Chip } from '@mui/joy';
import { defaultTheme } from '../../theme/default';
import { possibleCardTags } from '../../types/cardTags';

const CardChip = (props: { tag: string }) => {
  const { tag } = props;

  const setChipColor = {
    [possibleCardTags[0]] : '#f5cd7780',
    [possibleCardTags[1]] : '#a3a4a5',
    [possibleCardTags[2]] : '#ffd7bf',
    [possibleCardTags[3]] : '#8ab4bc'
  };

  const setChipSize = {
    [possibleCardTags[0]] : '78px',
    [possibleCardTags[1]] : '68px',
    [possibleCardTags[2]] : '50px',
    [possibleCardTags[3]] : '62px'
  };

  return (
    <Chip
      data-testid='card-chip'
      key={tag}
      size='sm'
      sx={{
        textAlign: 'center',
        minWidth: setChipSize[tag],
        height: '26px',
        variant: 'solid',
        fontSize: '10px',
        fontWeight: '400',
        color: defaultTheme.color7,
        backgroundColor: setChipColor[tag],
        '&.MuiChip-root': {
          padding: 0
        }
      }}
    >{tag}</Chip>
  );
};

export default CardChip;
