import { Chip } from '@mui/joy';
import { defaultTheme } from '../../theme/default';
import { possibleCardTags } from '../../types/cardTags';

const CardTagChip = (props: { tag: string }) => {
  const { tag } = props;

  const setChipColor = {
    [possibleCardTags[0]] : 'rgba(245, 205, 119, 0.5)',
    [possibleCardTags[1]] : 'rgba(163, 164, 165, 1)',
    [possibleCardTags[2]] : 'rgba(255, 215, 191, 1)',
    [possibleCardTags[3]] : 'rgba(138, 180, 188, 1)'
  };

  const setChipSize = {
    [possibleCardTags[0]] : '78px',
    [possibleCardTags[1]] : '68px',
    [possibleCardTags[2]] : '50px',
    [possibleCardTags[3]] : '62px'
  };

  return (
    <Chip
      data-testid='card-tag-chip'
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

export default CardTagChip;
