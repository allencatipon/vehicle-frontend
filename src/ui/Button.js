import React from 'react';

import classes from './Button.module.css';

const Button = ({ type, onClick, disabled, children }) => {
  return (
    <button
      className={classes.button}
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
