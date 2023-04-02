import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, createSession } from "../services/api";

interface User {
  id: number;
  email: string;
  password?: string;
}

export const AuthContext = createContext<any | null>(null);

export const AuthProvider = (props: any) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await createSession(email, password);

    // criar session
    const loggedUser = response.data.usuario;
    const token = response.data.token;

    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("token", token);

    setUser(loggedUser);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.authorization = null;
    setUser(null);
    navigate("/inicio");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
