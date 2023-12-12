import { icons } from '../../theme/icons/icons';

const ReactionsCellRenderer = (params: any) => {
  const { happy, unhappy } = params.value;

  return (
    <span style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      color: 'var(--friendly-palette-primary-800)',
      fontWeight: '700',
      fontSize: '16px'
    }}>
      <span style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '30px'
      }}>
        {happy}
        {icons.emojiSmile('#484a4b', '16px')}
      </span>
      <span style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '30px'
      }}>
        {unhappy}
        {icons.emojiFrown('#484a4b', '16px')}
      </span>
    </span>
  );
};

export default ReactionsCellRenderer;
