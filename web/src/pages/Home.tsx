import { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Page } from "../components/Page";
import { ViewScrollArea } from "../components/ScrollBar";
import { SummaryTable } from "../components/SummaryTable";
import { AuthContext } from "../contexts/auth";
import { api } from "../services/api";

export interface User {
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

export function Home() {
  const { logout, user } = useContext(AuthContext);

  const [usuario, setUsuario] = useState<User>();

  useEffect(() => {
    (async () => {
      const usuario = await api.get(`/usuario/${user.id}`);

      setUsuario(usuario.data);
    })();
  }, []);

  return (
    <Page>
      <Header />
      <div className=" flex md:flex-row items-start h-full w-full flex-col  rounded-b-[inherit] p-3">





        <section className=" flex justify-center items-center w-full">
          <ViewScrollArea dimentions="w-[inherit]">
            <SummaryTable userId={user.id} />
          </ViewScrollArea>
        </section>
        <section className="flex-grow">
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
        </section>
      </div>
    </Page>
  );
}
