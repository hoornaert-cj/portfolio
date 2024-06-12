// components/GlobalButtons.jsx
import React from 'react';
import PropTypes from 'prop-types';

const GlobalButtons = ({ buttons }) => {
  if (!buttons || buttons.length === 0) {
    return null;
  }

  return (
    <div className="global-buttons">
      {buttons.map((button, index) => (
        <a
          key={index}
          href={button.url_field}
          target={button.button_target ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="button"
        >
          {button.button_text}
        </a>
      ))}
    </div>
  );
};

GlobalButtons.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      button_text: PropTypes.string.isRequired,
      url_field: PropTypes.string.isRequired,
      button_target: PropTypes.bool,
    })
  ).isRequired,
};

export default GlobalButtons;
