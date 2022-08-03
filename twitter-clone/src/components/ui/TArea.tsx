import './TArea.css';

interface TAreaProps {
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

export default function TArea(props: TAreaProps) {
  const {
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

  const onSetValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue && setValue(event.target.value);
  }

  const errorClassName = touched && error ? "show" : "";

  return (
    <>
      <textarea
        className={`tarea ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onSetValue}
        required={required}
        autoComplete={autoComplete || "off"}
        onBlur={onBlur}
      />
      <p className={`tarea-error ${errorClassName}`}>{error}</p>
    </>
  );
}
