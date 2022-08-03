import "./TInput.css";

interface TInputProps {
  type: string;
  placeholder: string;
  value: string;
  className?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
  touched?: boolean;
  setValue: (value: string) => void;
  onBlur?: () => void;
}

export default function TInput(props: TInputProps) {
  const {
    type,
    placeholder,
    value,
    className,
    required,
    autoComplete,
    error,
    setValue,
    onBlur,
    touched = false,
  } = props;

  const onSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(event.target.value);
  }
  const errorClassName = touched && error ? "show" : "";
  return (
    <>
      <input
        className={`tinput ${className}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onSetValue}
        required={required}
        autoComplete={autoComplete || "off"}
        onBlur={onBlur}
      />
      <p className={`tinput-error ${errorClassName}`}>{error}</p>
    </>
  );
}