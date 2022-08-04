import { ApiClient } from ".";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
}

const usersApi = new ApiClient<IUser>("http://localhost:3001/users");

export default usersApi;
