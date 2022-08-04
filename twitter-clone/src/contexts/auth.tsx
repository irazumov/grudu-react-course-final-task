import React from "react";
import usersApi, { IUser } from "../api/users";

type SigninMethod = (username: string, password: string) => void;
type SignupMethod = (email: string, password: string, username: string, fullname: string) => void
interface AuthContextType {
  user: IUser | null;
  error: string | null;
  loading: boolean;
  signin: SigninMethod;
  signup: SignupMethod;
  signout: () => void;
  clearError: () => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const signin = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const user = await usersApi.findById(username);
      if (user.status === 200 && user.data.password === password) {
        setUser(user.data);
        return;
      }
      if (user.status === 404) {
        throw new Error("Invalid username or password");
      }
      throw new Error("Unknown error");
    } catch (error) {
      const err = error as unknown as Error;
      setError(err.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup: SignupMethod = async (email, password, username, fullname) => {
    setLoading(true);
    setError(null);
    try {
      const user = await usersApi.insertOne({
        id: username,
        name: fullname,
        email,
        password,
      });
      if (user.status === 201) {
        return;
      }
      throw new Error("Unknown error");
    } catch (error) {
      const err = error as unknown as Error;
      setError(err.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const signout: () => void = () => {
    setUser(null);
  };

  const clearError: () => void = () => {
    setError(null);
  }

  const value: AuthContextType = {
    user,
    loading,
    error,
    signin,
    signup,
    signout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
