import { useState } from "react";
import { useValidationable } from "../../hooks/validationable";
import FormWrapper from './FormWrapper';
import TInput from '../ui/TInput';
import validators from "./validators";

interface ITouchedSignupFields {
  email: boolean;
  password: boolean;
  username: boolean;
  fullname: boolean;
}

export default function SignupForm() {
  const [email, setEmail, emailError] = useValidationable<string>("", validators.email);
  const [password, setPassword, passwordError] = useValidationable<string>("", validators.password);
  const [username, setUsername, usernameError] = useValidationable<string>("", validators.username);
  const [fullname, setFullname, fullnameError] = useValidationable<string>("", validators.fullname);

  const [touched, setTouched] = useState<ITouchedSignupFields>({
    email: false,
    password: false,
    username: false,
    fullname: false,
  });

  const setAllTouched = (value: boolean) => {
    setTouched({
      email: value,
      password: value,
      username: value,
      fullname: value,
    });
  }

  const validate = () => {
    setAllTouched(true);
    return !emailError && !passwordError && !usernameError && !fullnameError;
  }

  const onSubmit = (event:   React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      console.log(email, password, username, fullname);
    }
  }

  return (
    <FormWrapper
      className="bordered"
      label="Sign up"
      submitBtnText="Sign up"
      onSubmit={onSubmit}
      subrow={{
        text: "Already have an account?",
        linkTitle: "Log in",
        linkHref: "#",
      }}
    >
      <TInput
        className="bordered"
        type="email"
        placeholder="Email"
        value={email}
        setValue={setEmail}
        autoComplete="email"
        error={emailError}
        touched={touched.email}
        onBlur={() => setTouched({ ...touched, email: true })}
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
      />
      <TInput
        className="bordered"
        type="text"
        placeholder="Username"
        value={username}
        setValue={setUsername}
        autoComplete="username"
        error={usernameError}
        touched={touched.username}
        onBlur={() => setTouched({ ...touched, username: true })}
      />
      <TInput
        className="bordered"
        type="text"
        placeholder="Fullname"
        value={fullname}
        setValue={setFullname}
        error={fullnameError}
        touched={touched.fullname}
        onBlur={() => setTouched({ ...touched, fullname: true })}
      />
    </FormWrapper>
  );
}