import { ValidationFunc } from "../../hooks/validationable";

export const tweet: Array<ValidationFunc<string>> = [
  (value) => value.length > 0 || "Tweet is required",
  (value) => value.length >= 1 || "Tweet must be at least 1 characters",
  (value) => value.length <= 140 || "Tweet must be at most 140 characters",
];

const validators = {
  tweet,
};

export default validators;
