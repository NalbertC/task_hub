import { Heading } from "../components/Heading";
import { Page } from "../components/Page";
import { Text } from "../components/Text";

import { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { SummaryTable } from "../components/SummaryTable";
import { AuthContext } from "../contexts/auth";
import { api } from "../services/api";
import { User } from "./Home";

import notProfile from "../assets/th.webp";

export function Profile() {
  const { logout, user } = useContext(AuthContext);

  const [usuario, setUsuario] = useState<User>();

  useEffect(() => {
    (async () => {
      const usuario = await api.get(`/usuario/${user.id}`);

      // console.log(usuario.data);
      setUsuario(usuario.data);
    })();
  }, []);

 const img = usuario?.perfil?.url ? usuario?.perfil?.url : notProfile;

  return (
    <Page>
      <Header />

      <div className=" flex md:flex-row h-full w-full flex-col rounded-b-[inherit]">
        <section className="flex flex-row p-5 w-full h-[200px] md:flex-col md:h-full md:w-[296px] lg:w-[320px]">
          <div className=" w-[200px] md:w-full">
            <img
              src={img}
              className="rounded-full md:w-full md:min-w-[256px] h-full"
            />
          </div>

          <div>
            <Heading>{usuario?.nome}</Heading>
            <Text>{usuario?.email}</Text>
          </div>
        </section>

        <main className="h-full pt-4 flex flex-col flex-grow  px-1 ">
          <Heading size="lg">Teste</Heading>
          <div className="flex-grow px-2 flex flex-col gap-2 ring-1 rounded-[16px] py-4">
            <div className="border-background pl-2 border-l-8 hover:border-l-8 hover:border-l-blue-400">
              <Heading>Resumo das tarefas</Heading>
            </div>
            <SummaryTable userId={String(user.id)} />
          </div>
        </main>
      </div>
    </Page>
  );
}
