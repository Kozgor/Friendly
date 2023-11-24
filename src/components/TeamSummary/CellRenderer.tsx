import { icons } from '../../theme/icons/icons';

const TeamSummaryCellRenderer = (params: any) => {
  const isHappyReaction = params.value;
  let trueCount = 0;
  let falseCount = 0;

  isHappyReaction.forEach((value: boolean) => {
    value ? trueCount++ : falseCount++;
  });

  return (
    <span style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      color: '#2D7887',
      fontWeight: '700',
      fontSize: '16px'
    }}>
      <span style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '30px'
      }}>
        {trueCount}
        {icons.emojiSmile('#484a4b', '16px')}
      </span>
      <span style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '30px'
      }}>
        {falseCount}
        {icons.emojiFrown('#484a4b', '16px')}
      </span>
    </span>
  );
};

export default TeamSummaryCellRenderer;
