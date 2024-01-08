import { ITitlePanelChildren } from '../../interfaces/titlePanelChildren';

import classes from './TitlePanel.module.scss';

const TitlePanel = (props: ITitlePanelChildren) => {
  const { title } = props;

  return (
    <div aria-description={title} className={classes.titleContainer}>
      {title}
    </div>
  );
};

export default TitlePanel;
