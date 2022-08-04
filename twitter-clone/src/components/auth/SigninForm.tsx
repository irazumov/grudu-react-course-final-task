import { useEffect, useState } from 'react';
import FormWrapper from './FormWrapper';
import TInput from '../ui/TInput';
import { useValidationable } from '../../hooks/validationable';
import validators from './validators';
import { useAuth } from '../../contexts/auth';

interface ITouchedSigninFields {
  username: boolean;
  password: boolean;
}

export default function SigninForm() {
  const auth = useAuth();
  const [username, setUsername, usernameError] = useValidationable<string>("", validators.username);
  const [password, setPassword, passwordError] = useValidationable<string>("", validators.password);

  useEffect(() => {
    if (auth.error) {
      auth.clearError();
    }
  }, [username, password]);

  const [touched, setTouched] = useState<ITouchedSigninFields>({
    username: false,
    password: false,
  });

  const setAllTouched = (value: boolean) => {
    setTouched({
      username: value,
      password: value,
    });
  }

  const validate = () => {
    setAllTouched(true);
    return !usernameError && !passwordError;
  }


  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate() || auth.loading) {
      return;
    }
    auth.signin(username, password);
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
        linkHref: '/signup',
      }}
      error={auth.error}
    >
      <TInput
          className="bordered"
          type="text"
          placeholder="Username"
          value={username}
          setValue={setUsername}
          autoComplete="nickname"
          error={usernameError}
          touched={touched.username}
          onBlur={() => setTouched({ ...touched, username: true })}
          required
        />
        <TInput
          className="bordered"
          type="password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
          error={passwordError}
          touched={touched.password}
          onBlur={() => setTouched({ ...touched, password: true })}
          required
        />
      </FormWrapper>
  );
}
