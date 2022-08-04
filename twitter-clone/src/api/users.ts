import { ApiClient } from ".";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
}

const usersApi = new ApiClient<IUser>("/users");

export default usersApi;
