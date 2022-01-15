import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { canUseDOM } from '../helpers';

let portalContainer: HTMLDivElement | undefined;

export const Portal: React.FC = props => {
  const { children } = props;

  const el = useRef(document.createElement('div'));

  useEffect(() => {
    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.setAttribute('uqgq-portal-container', '');
      document.body.appendChild(portalContainer);
    }

    portalContainer.appendChild(el.current);

    return () => {
      if (portalContainer) {
        portalContainer.removeChild(el.current);
      }
    };
  }, []);

  if (!canUseDOM()) {
    return null;
  }

  return ReactDOM.createPortal(children, el.current);
};
