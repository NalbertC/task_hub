import { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Page } from "../components/Page";
import { ViewScrollArea } from "../components/ScrollBar";
import { SummaryTable } from "../components/SummaryTable";
import { AuthContext } from "../contexts/auth";
import { api } from "../services/api";

interface User {
  id: number;
  nome: string;
  email: string;
  data_criacao: Date;
  perfil?: {
    nome?: string;
    key?: string;
    url?: string;
  };
}

export function Privado() {
  const { logout, user } = useContext(AuthContext);

  const [usuario, setUsuario] = useState<User>();

  useEffect(() => {
    (async () => {
      const usuario = await api.get(`/usuario/${user.id}`);

      console.log(usuario.data);
      setUsuario(usuario.data);
    })();
  }, []);

  return (
    <Page>
      <Header name={String(usuario?.nome)} url={String(usuario?.perfil?.url)} />

      <div className=" p-3 rounded-[16px] flex justify-center items-center w-full">
        <ViewScrollArea dimentions="w-full">
          <SummaryTable userId={user.id} />
        </ViewScrollArea>
      </div>
      <div>
        {usuario?.id} <br />
        {usuario?.nome}
        <br />
        {usuario?.email}
        <br />
        {String(usuario?.data_criacao)}
        <br />
        {usuario?.perfil?.key}
        <br />
        {usuario?.perfil?.nome}
        <br />
        {usuario?.perfil?.url}
      </div>
    </Page>
  );
}
