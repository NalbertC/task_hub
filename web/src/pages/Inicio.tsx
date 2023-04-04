import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Logo } from "../components/Logo";
import { Page } from "../components/Page";
import { InputSearch } from "../components/Search";
import { Text } from "../components/Text";

export function Inicio() {

  const navigate = useNavigate();

  return (
    <Page>
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
            <Button onClick={() => navigate("/cadastro")}>Criar conta</Button>
          </div>
        </div>
      </div>
      <div>
        <Heading>Tela inicial da aplicação</Heading>
        <Text>Imagine várias coisas aqui</Text>
      </div>
    </Page>
  );
}
