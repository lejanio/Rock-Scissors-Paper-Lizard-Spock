import React, { FC } from 'react';
import './Button.scss';

type ButtonProps = {
  backgroundColor: string,
  onClick: () => void,
}

const Button:FC<ButtonProps> = ({ onClick, backgroundColor, children }) => (
  <div className="text-box">
    <button
      style={{ backgroundColor }}
      className="button-component"
      onClick={onClick}
    >
      {children}
    </button>
  </div>
);

export default Button;
