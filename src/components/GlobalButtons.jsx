// GlobalButtons.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const GlobalButtons = ({ buttons }) => {
  return (
    <div className="global-buttons">
      {buttons.map((button, index) => {
        const isExternal = button.button_target === '_blank';
        if (isExternal) {
          return (
            <a
              key={index}
              href={button.url_field}
              target={button.button_target}
              className="button"
            >
              {button.button_text}
            </a>
          );
        } else {
          return (
            <Link
              key={index}
              to={button.url_field}
              className="button"
            >
              {button.button_text}
            </Link>
          );
        }
      })}
    </div>
  );
};

export default GlobalButtons;
