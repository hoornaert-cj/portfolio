// components/Button.js
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, url, target }) => {
  return (
    <a href={url} target={target ? '_blank' : '_self'} rel={target ? 'noopener noreferrer' : ''} className="btn">
      {text}
    </a>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  target: PropTypes.bool,
};

Button.defaultProps = {
  target: false,
};

export default Button;
