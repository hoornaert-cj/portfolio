// components/ButtonGroup.js
import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

const ButtonGroup = ({ buttons }) => {
  return (
    <div className="button-group">
      {buttons.map((button, index) => (
        <Button
          key={index}
          text={button.button_text}
          url={button.url_field}
          target={button.button_target}
        />
      ))}
    </div>
  );
};

ButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      button_text: PropTypes.string.isRequired,
      url_field: PropTypes.string.isRequired,
      button_target: PropTypes.bool,
    })
  ).isRequired,
};

export default ButtonGroup;
