import { useMemo } from 'react';

import { Avatar } from '@mui/joy';
import { ICardAvatar } from '../../interfaces/cardAvatar';
import { defaultTheme } from '../../theme/default';
import { getInitials } from '../../utils/userInitials';
import { icons } from '../../theme/icons/icons';

const CardAvatar = (props: ICardAvatar) => {
  const { cardAuthor, cardAuthorAvatar, onToggle } = props;
  const avatar = useMemo(() => {
    const isIncognito = (cardAuthor === 'Incognito' || cardAuthorAvatar === 'Incognito');
    const isInitials = (!cardAuthorAvatar || cardAuthorAvatar.length <= 2) && cardAuthor !== 'Incognito';
    const isAvatar = (cardAuthorAvatar && cardAuthorAvatar.length > 2) && cardAuthor !== 'Incognito';

    if (isIncognito) {
      return (
        <Avatar
          data-testid='incognito-avatar'
          onClick={onToggle}
          sx={{ cursor: 'pointer', '&.MuiAvatar-variantSoft': { backgroundColor: defaultTheme.color1 } }}
        >
          {icons.incognito}
        </Avatar>
        );
      }
      if (isInitials) {
        return (
          <Avatar
            data-testid='initials-avatar'
            onClick={onToggle}
            sx={{
              cursor: 'pointer',
              color: '#FFFFFF',
              '&.MuiAvatar-variantSoft': { backgroundColor: defaultTheme.color1 }
            }}
          >
            {getInitials(cardAuthor)}
          </Avatar>
        );
      }
      if (isAvatar) {
        return (
          <Avatar
            data-testid='card-avatar'
            onClick={onToggle}
            alt={cardAuthorAvatar}
            src={cardAuthorAvatar}
            sx={{ cursor: 'pointer' }}
        ></Avatar>
      );
    }

    return null;
  }, [cardAuthor, cardAuthorAvatar, onToggle]);

  return avatar;
};

export default CardAvatar;
