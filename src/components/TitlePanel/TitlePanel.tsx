import { ITitlePanelChildren } from '../../interfaces/titlePanelChildren';
import classes from './TitlePanel.module.scss';

const TitlePanel = (props: ITitlePanelChildren) => {
  const { title } = props;

  return(
    <div className={classes.titleContainer}>
      {title}
    </div>
  );
};

export default TitlePanel;
