import { BsSearch } from "react-icons/bs";

import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Logo } from "../components/Logo";
import { Page } from "../components/Page";
import { InputSearch } from "../components/Search";
import { Text } from "../components/Text";

import { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { SummaryTable } from "../components/SummaryTable";
import { AuthContext } from "../contexts/auth";
import { api } from "../services/api";
import { User } from "./Home";

import notProfile from "../assets/th.webp";



interface ViewUserProps {
  id: string;
}

export function SearchProfile() {
  const params = useParams();
  const navigate = useNavigate();
  const { logout, user, authenticated } = useContext(AuthContext);

  const [usuario, setUsuario] = useState<User>();

  useEffect(() => {
    (async () => {
      const usuario = await api.get(`/usuario/${params.idUsuario}`);

      console.log(usuario.data);
      setUsuario(usuario.data);
    })();
  }, [params.idUsuario]);

  const img = usuario?.perfil?.url ? usuario?.perfil?.url : notProfile;




  return (
    <Page>
      {authenticated ? (
        <Header />
      ) : (
        <div className="bg-background h-[72px] w-full flex justify-between  items-center px-6 rounded-t-[inherit]">
          <Logo />

          <div className="pl-4 flex flex-row justify-between items-center h-full gap-2">
            <div className="relative">
              <InputSearch icon={<BsSearch />} placeholder="Buscar ..." />
            </div>

            <a href="/login">
              <Text className="h-10 flex items-center  text-gray-50 font-semibold px-3 rounded-[12px] hover:text-gray-400 cursor-pointer">
                Entrar
              </Text>
            </a>

            <div>
              <Button onClick={() => navigate("/login")}>Criar conta</Button>
            </div>
          </div>
        </div>
      )}

      <div className=" flex md:flex-row h-full w-full flex-col rounded-b-[inherit]">
        <section className="flex flex-row p-5 w-full  h-[200px] md:flex-col md:h-full md:w-[296px] lg:w-[320px]">
          <div className=" w-[200px] h-[200px] md:min-h-[256px] md:w-full">
            <img
              src={img}
              className="rounded-full md:w-full md:min-w-[256px] md:min-h-[256px] h-full"
            />
          </div>

          <div>
            <Heading>{usuario?.nome}</Heading>
            <Text>{usuario?.email}</Text>
          </div>
        </section>

        <main className="h-full flex-grow ">
          <div className=" p-3 rounded-[16px] flex justify-center items-center w-full">
            <SummaryTable userId={String(params.idUsuario)} disabled />
          </div>
        </main>
      </div>
    </Page>
  );
}
