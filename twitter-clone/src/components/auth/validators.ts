import { ValidationFunc } from "../../hooks/validationable";
import validateEmail from "../../validators/email";

export const email: Array<ValidationFunc<string>> = [
  (value) => value.length > 0 || "Email is required",
  (value) => validateEmail(value) || "Email is invalid",
];

export const password: Array<ValidationFunc<string>> = [
  (value) => value.length > 0 || "Password is required",
  (value) => value.length >= 8 || "Password must be at least 8 characters",
  (value) => value.length <= 256 || "Password must be at most 256 characters",
];

export const username: Array<ValidationFunc<string>> = [
  (value) => value.length > 0 || "Username is required",
  (value) => value.length >= 1 || "Username must be at least 1 characters",
  (value) => value.length <= 256 || "Username must be at most 256 characters",
];

export const fullname: Array<ValidationFunc<string>> = [
  (value) => value.length > 0 || "Fullname is required",
  (value) => value.length >= 1 || "Fullname must be at least 1 characters",
  (value) => value.length <= 512 || "Fullname must be at most 512 characters",
];

const validators = {
  email,
  password,
  username,
  fullname,
};

export default validators;
