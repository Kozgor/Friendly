import { useMemo } from 'react';

import { Avatar, Tooltip } from '@mui/joy';
import { ICardAvatar } from '../../interfaces/cardAvatar';
import { defaultTheme } from '../../theme/default';
import { getInitials } from '../../utils/userInitials';
import { icons } from '../../theme/icons/icons';

const CardAvatar = (props: ICardAvatar) => {
  const { cardAuthor, cardAuthorAvatar, isBorder, borderColor, onToggle } = props;
  const avatar = useMemo(() => {
    const isIncognito = (cardAuthor === 'Incognito' || cardAuthorAvatar === 'Incognito');
    const isInitials = (!cardAuthorAvatar || cardAuthorAvatar.length <= 2) && cardAuthor !== 'Incognito';
    const isAvatar = (cardAuthorAvatar && cardAuthorAvatar.length > 2) && cardAuthor !== 'Incognito';
    const customBoxShadow = isBorder ? `0 0 0 5px ${borderColor}` : 'none';

    if (isIncognito) {
      return (
        <Tooltip title={cardAuthor}>
          <Avatar
            data-testid='incognito-avatar'
            onClick={onToggle}
            sx={{
              cursor: 'pointer',
              boxShadow: customBoxShadow,
              '&.MuiAvatar-variantSoft': { backgroundColor: defaultTheme.color1 } }}
          >
            {icons.incognito}
          </Avatar>
        </Tooltip>
        );
      }
      if (isInitials) {
        return (
          <Tooltip title={cardAuthor}>
            <Avatar
              data-testid='initials-avatar'
              onClick={onToggle}
              sx={{
                cursor: 'pointer',
                boxShadow: customBoxShadow,
                color: 'var(--friendly-palette-shades-50)',
                '&.MuiAvatar-variantSoft': { backgroundColor: defaultTheme.color1 }
              }}
            >
              {getInitials(cardAuthor)}
            </Avatar>
          </Tooltip>
        );
      }
      if (isAvatar) {
        return (
          <Tooltip title={cardAuthor}>
            <Avatar
              data-testid='card-avatar'
              onClick={onToggle}
              alt={cardAuthorAvatar}
              src={cardAuthorAvatar}
              sx={{
                cursor: 'pointer',
                boxShadow: customBoxShadow
              }}
            ></Avatar>
          </Tooltip>
      );
    }

    return null;
  }, [cardAuthor, cardAuthorAvatar, onToggle]);

  return avatar;
};

export default CardAvatar;
