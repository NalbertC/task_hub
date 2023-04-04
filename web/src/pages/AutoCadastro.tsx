import React, { useState } from "react";
import {
    FaEnvelope,
    FaLock,
    FaLongArrowAltRight,
    FaUser,
} from "react-icons/fa";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";
import { Page } from "../components/Page";
import { Text } from "../components/Text";
import { api } from "../services/api";

interface AutoCadastroProps {}

export function AutoCadastro(props: AutoCadastroProps) {
  const [infoCadastro, setInfoCadastro] = useState(<Text> </Text>);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setInfoCadastro(
        <Text className="text-red-500">As senhas não coencidem</Text>
      );
    } else {
      try {
        const newUser = await api.post("/usuario", {
          nome,
          email,
          senha: password,
        });

        setInfoCadastro(
          <Text className="text-green-500">Usuário cadastrado com sucesso</Text>
        );
        console.log(newUser.data);
      } catch (error) {
        setInfoCadastro(
          <Text className="text-red-500">
            Não foi possível cadastrar, tente novamente mais tarde
          </Text>
        );
      }
    }
  };

  return (
    <Page>
      <div className=" h-full w-full fixed inset-0">
        <div className="absolute px-6 pt-4 pb-6 bg-background rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 focus:shadow-0 focus:outline-0 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center my-6 ">
            <Logo /> <Heading>ToDoHub</Heading>
            <Text className="font-bold text-gray-500">
              Crie sua conta gratuita
            </Text>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4"
            autoComplete="off"
          >
            <label htmlFor="email" className="flex flex-col gap-3 pt-2">
              <Text className="font-semibold">Seu nome</Text>
              <Input
                icon={<FaUser />}
                placeholder="ex: Fulano de Tal"
                className="h-12"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </label>

            <label htmlFor="email" className="flex flex-col gap-3 pt-2">
              <Text className="font-semibold">Seu Email</Text>
              <Input
                icon={<FaEnvelope />}
                placeholder="ex: example@email.com"
                type={"email"}
                className="h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </label>
            <label htmlFor="email" className="flex flex-col gap-3 ">
              <Text className="font-semibold">Sua senha</Text>
              <Input
                icon={<FaLock />}
                placeholder="**********"
                inputUse="password"
                type="password"
                className="h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </label>

            <label htmlFor="email" className="flex flex-col gap-3 ">
              <Text className="font-semibold">Confirme sua senha</Text>
              <Input
                icon={<FaLock />}
                placeholder="**********"
                type="password"
                className="h-12"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="off"
              />
            </label>
            <div className="flex justify-center h-4">{infoCadastro}</div>
            <Button className="h-12">Confirmar</Button>
          </form>

          <div className="flex justify-center items-center flex-col pt-2">
            <Text
              size="sm"
              className="text-gray-500 flex flex-row items-center gap-1 text-dark-400 "
            >
              Já possui conta?
              <a
                href="/login"
                className="flex flex-row  items-center hover:text-cyan-500 gap-1"
              >
                Ir para login
                {<FaLongArrowAltRight />}
              </a>
            </Text>
          </div>
        </div>
      </div>
    </Page>
  );
}
