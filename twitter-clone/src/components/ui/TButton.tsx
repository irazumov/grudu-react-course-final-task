import React from "react";
import "./TButton.css";

interface TButtonProps {
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function TButton(props: TButtonProps) {
  const {
    type,
    className,
    children,
    onClick,
    disabled,
    ...otherProps
  } = props;

  return (
    <button
      className={`tbutton ${className}`}
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
}
