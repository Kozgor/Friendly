import { Chip } from '@mui/joy';
import { defaultTheme } from '../../theme/default';
import { possibleCardTags } from '../../types/cardTags';

const CardChip = (props: { tag: string }) => {
  const { tag } = props;

  const setChipColor = {
    [possibleCardTags[0]] : 'var(--friendly-palette-accent-100)',
    [possibleCardTags[1]] : 'var(--friendly-palette-neutral-100)',
    [possibleCardTags[2]] : 'var(--friendly-palette-secondary-200)',
    [possibleCardTags[3]] : 'var(--friendly-palette-primary-100)'
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
