import { useEffect, useRef } from 'react';
import { IFriendlyIcon } from '../../interfaces/friendlyIcon';

const FriendlyIcon = (props: IFriendlyIcon) => {
  const { element } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = element;
    }
  }, [element]);

  return (
    <div data-testid='friendly-icon' ref={containerRef} />
  );
};

export default FriendlyIcon;
