import React from "react";
import usersApi, { IUser } from "../api/users";

interface AuthContextType {
  user: IUser | null;
  error: string | null;
  loading: boolean;
  signin: (username: string, password: string) => void;
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

  const signout = () => {
    setUser(null);
  };

  const clearError = () => {
    setError(null);
  }

  const value: AuthContextType = { user, loading, error, signin, signout, clearError };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

