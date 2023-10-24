import { useMemo } from 'react';

import { Avatar } from '@mui/joy';
import { ICardAvatar } from '../../interfaces/cardAvatar';
import { getInitials } from '../../utils/userInitials';

const CardAvatar = (props: ICardAvatar) => {
  const { cardAuthor, cardAuthorAvatar, onToggle } = props;
  const avatar = useMemo(() => {
    const isIncognito = (cardAuthor === 'Incognito' || cardAuthorAvatar === 'Incognito');
    const isInitials = (!cardAuthorAvatar || cardAuthorAvatar.length <= 2) && cardAuthor !== 'Incognito';
    const isAvatar = (cardAuthorAvatar && cardAuthorAvatar.length > 2) && cardAuthor !== 'Incognito';

    if (isIncognito) {
      return (
        <Avatar
          data-testid='cardAvatar'
          onClick={onToggle}
          sx={{ cursor: 'pointer' }}
        >
          <i data-testid='incognitoIcon' className='bi bi-incognito'></i>
        </Avatar>
        );
      }
      if (isInitials) {
        return (
          <Avatar
            data-testid='cardAvatar'
            onClick={onToggle}
            sx={{ cursor: 'pointer' }}
          >
            {getInitials(cardAuthor)}
          </Avatar>
        );
      }
      if (isAvatar) {
        return (
          <Avatar
          data-testid='cardAvatar'
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