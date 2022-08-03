import React from "react";

export type ValidationFunc<T> = (value: T) => boolean | string;

export const useValidationable = <T>(initValue: T, rules: Array<ValidationFunc<T>> = []): [T, (value: T) => void, string] => {
  const [value, setValue] = React.useState<T>(initValue);
  const [error, setError] = React.useState<string>('');

  const validate = React.useCallback(() => {
    const errorFunc = rules.find(rule => rule(value) !== true);    
    if (errorFunc) {      
      setError(errorFunc(value) as string);
      return;
    }
    setError('');
  }, [value, rules]);

  React.useEffect(() => {
    validate();
  }, [value]);

  return [value, setValue, error];
}