import { ReactNode, useEffect, useState } from 'react';
import { IconButton } from '@mui/joy';
import { PropsChildren } from '../../interfaces/interactivePanelChildren';
import { icons } from '../../theme/icons/icons';
import { isString } from 'lodash';
import { useNavigate } from 'react-router';

import classes from './InteractivePanel.module.scss';

const InteractivePanel = (props : { childrenConfig: PropsChildren[] }) => {
  const navigate = useNavigate();
  const { childrenConfig } = props;
  const [contentLeft, setContentLeft] = useState<ReactNode|string>(null);
  const [contentCenter, setContentCenter] = useState<ReactNode|string>(null);
  const [contentRigth, setContentRigtht] = useState<ReactNode|string>(null);
  const [backwardLabel, setBackwardLabel] = useState<string>('');
  const [forwardLabel, setForwardLabel] = useState<string>('');
  const isBackward = isString(contentLeft);
  const isFarward = isString(contentRigth);

  const onBackward = () => {
    if (isBackward) {
      navigate(contentLeft);
    }
  };

  const onForward = () => {
    if (isFarward) {
      navigate(contentRigth);
    }
  };

  const setPanelChildren = () => {
    childrenConfig.forEach(child => {
      const { element, position, label } = child;

      if (position === 'rigth') {
        setContentRigtht(element);
        setForwardLabel(label || '');

        return;
      }

      if (position === 'left') {
        setContentLeft(element);
        setBackwardLabel(label || '');

        return;
      }

      setContentCenter(element);
    });
  };

  useEffect(() => {
    setPanelChildren();
  });

  return (
    <div className={classes.interactivePanelContainer}>
      <div className={classes.interactivePanelElement}>
        <span className={classes.panelLeftElement}>
          {isBackward ?
            <span>
              <IconButton
                variant="solid"
                onClick={onBackward}
                sx={{
                    backgroundColor: '#ffa62b',
                    '&:hover': {
                    backgroundColor: '#ffa62b'
                    }
                }}
              >
                {icons.turnLeft('#fff')}
              </IconButton>
            </span> : contentLeft
          }
        </span>
        <span className={classes.panelLeftLabel}>
          {backwardLabel}
        </span>
      </div>
      <div className={classes.interactivePanelElement}>
        {contentCenter}
      </div>
      <div className={classes.interactivePanelElement}>
        <span className={classes.panelRightLabel}>
          {forwardLabel}
        </span>
        {isFarward ?
          <span>
            <IconButton
              variant="solid"
              onClick={onForward}
              sx={{
                  backgroundColor: '#ffa62b',
                  '&:hover': {
                  backgroundColor: '#ffa62b'
                  }
              }}
              >
                {icons.turnRight('#fff')}
              </IconButton>
          </span> : contentRigth
        }
      </div>
    </div>
  );
};

export default InteractivePanel;
