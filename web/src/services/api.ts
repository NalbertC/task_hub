import axios from "axios";

export const api = axios.create({
  baseURL: `http://localhost:5000`,
  // baseURL: `http://10.0.0.4:5000`,
});

export const createSession = async (email: string, senha: string) => {
  const session = api.post("/session", { email, senha });

  return session;
};
