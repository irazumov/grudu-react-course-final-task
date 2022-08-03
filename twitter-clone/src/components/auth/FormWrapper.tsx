import React from "react";
import "./FormWrapper.css";
import TButton from '../ui/TButton';
import { Link } from "react-router-dom";

interface ISubrow {
  text: string;
  linkTitle: string;
  linkHref: string;
}

interface FormWrapperProps {
  children: React.ReactNode;
  className?: string;
  label: string;
  submitBtnText: string;
  subrow: ISubrow;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormWrapper(props: FormWrapperProps) {
  const {
    children,
    className,
    onSubmit,
    subrow,
    submitBtnText,
  } = props;

  return (
    <>
      <form
        className={`form ${className}`}
        onSubmit={onSubmit}
        aria-label={props.label}
      >
        <label>{submitBtnText}</label>
        <div className="main">{children}</div>
        <div className="footer">
          <TButton className="bordered" type="submit">{submitBtnText}</TButton>
        </div>
      </form>
      <p
        className="subrow">{subrow.text} <Link to={subrow.linkHref}>{subrow.linkTitle}</Link>
      </p>
    </>
  );
}
