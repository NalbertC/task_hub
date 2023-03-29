import axios from "axios";

export const api = axios.create({
  baseURL: `http://localhost:5000`,
});

export const createSession = async (email: string, senha: string) => {
  const session = await api.post("/session", { email, senha });

  return session;
};
