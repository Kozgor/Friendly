export interface ICardAvatar {
  isBorder?: boolean;
  borderColor?: string;
  cardAuthor: string;
  cardAuthorAvatar: string;
  onToggle?: () => void;
}
