import { useContext, useState } from "react";
import { FaEnvelope, FaLongArrowAltRight } from "react-icons/fa";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";
import { Page } from "../components/Page";
import { Text } from "../components/Text";
import { AuthContext } from "../contexts/auth";

export function Login() {
  const { authenticated, login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit", { email, password });

    login(email, password);
  };

  return (
    <Page>
      <div className=" h-full w-full fixed inset-0">
        <div className="absolute px-6 pt-4 pb-6 bg-background rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 focus:shadow-0 focus:outline-0 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center my-6 ">
            <Logo /> <Heading>ToDoHub</Heading>
            {String(authenticated)}
          </div>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <label htmlFor="email" className="flex flex-col gap-3 pt-2">
              <Text className="font-semibold">Seu Email</Text>
              <Input
                icon={<FaEnvelope />}
                placeholder="ex: example@email.com"
                type={"email"}
                className="h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label htmlFor="email" className="flex flex-col gap-3 ">
              <Text className="font-semibold">Sua senha</Text>
              <Input
                icon={<FaEnvelope />}
                placeholder="**********"
                inputUse="password"
                type="password"
                className="h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="flex justify-center h-4 text-red-500">
              <p></p>
            </div>

            <Button className="h-12">Confirmar</Button>
          </form>

          <div className="flex justify-center items-center flex-col">
            <a className="pt-1 pb-2" href="">
              <Text size="sm" className="text-gray-500  hover:text-cyan-500">
                Esqueceu a senha?
              </Text>
            </a>

            <a href="/cadastro">
              <Text
                size="sm"
                className="text-gray-500 flex flex-row items-center gap-1 text-dark-400 hover:text-cyan-500"
              >
                Crie sua conta grátis
                {<FaLongArrowAltRight />}
              </Text>
            </a>
          </div>
        </div>
      </div>
    </Page>
  );
}
