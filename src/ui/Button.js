import React from 'react';

import classes from './Button.module.css';

const Button = ({ type, onClick, disabled, children }) => {
  return (
    <button
      className={classes.button}
      disabled = {disabled? disabled : false}
      type={type || 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
