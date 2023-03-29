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
    console.log("login auth", { email, password });

    const response = await createSession(email, password);

    console.log(response.data);
    // criar session
    const loggedUser = response.data.usuario;
    const token = response.data.token;

    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("token", token);
    api.defaults.headers.Authorization = `Bearer ${token}`;

    setUser(loggedUser);
    navigate("/private");
  };

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
