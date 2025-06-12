import React from 'react';

import classes from './Input.module.css';

// Define the props for the component
interface InputProps {
  label: string;
  // This allows all standard HTML input attributes to be passed
  input: React.InputHTMLAttributes<HTMLInputElement>;
}

// Use React.forwardRef with generic types for the ref and props
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* Forward the ref and spread the input props */}
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
