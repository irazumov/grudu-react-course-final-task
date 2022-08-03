import { useState } from 'react';
import FormWrapper from './FormWrapper';
import TInput from '../ui/TInput';
import { useValidationable } from '../../hooks/validationable';
import validators from './validators';

interface ITouchedSigninFields {
  email: boolean;
  password: boolean;
}

export default function SigninForm() {
  const [email, setEmail, emailError] = useValidationable<string>("", validators.email);
  const [password, setPassword, passwordError] = useValidationable<string>("", validators.password);

  const [touched, setTouched] = useState<ITouchedSigninFields>({
    email: false,
    password: false,
  });

  const setAllTouched = (value: boolean) => {
    setTouched({
      email: value,
      password: value,
    });
  }

  const validate = () => {
    setAllTouched(true);
    return !emailError && !passwordError;
  }


  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      console.log(email, password);
    }
  };

  return (
    <FormWrapper
      className="bordered"
      label="Log in"
      submitBtnText="Log in"
      onSubmit={onSubmit}
      subrow={{
        text: 'Don’t have an account?',
        linkTitle: 'Sign up',
        linkHref: '#',
      }}
    >
      <TInput
          className="bordered"
          type="email"
          placeholder="Username"
          value={email}
          setValue={setEmail}
          autoComplete="email"
          error={emailError}
          touched={touched.email}
        />
        <TInput
          className="bordered"
          type="password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
          error={passwordError}
          touched={touched.password}
        />
      </FormWrapper>
  );
}
