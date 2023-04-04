import * as Popover from "@radix-ui/react-popover";
import { useContext, useEffect, useState } from "react";
import { AiFillCaretDown, AiOutlinePlus } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { AuthContext } from "../contexts/auth";
import { User } from "../pages/Home";
import { api } from "../services/api";
import { DropdownMenu } from "./DropdownMenu";
import { Logo } from "./Logo";
import { Modal } from "./Modal";
import { InputSearch } from "./Search";

interface HeaderProps {
  name: string;
  url: string;
}

export function Header() {

  const { logout, user } = useContext(AuthContext);

  const [usuario, setUsuario] = useState<User>();

  useEffect(() => {
    (async () => {
      const usuario = await api.get(`/usuario/${user.id}`);

      console.log(usuario.data);
      setUsuario(usuario.data);
    })();
  }, []);

  function handleSearch(e: any) {
    console.log(e.key);
  }

  return (
    <div className="bg-background h-[72px] w-full flex justify-between  items-center px-6 rounded-t-[inherit]">
      <div className="flex flex-row items-center justify-between gap-2 ">
        <Logo />

        <InputSearch
          icon={<BsSearch />}
          placeholder="Buscar ..."
          onKeyUp={(e) => {
            handleSearch(e);
          }}
        />
      </div>

      <div className="pl-4 flex flex-row justify-between items-center h-full gap-2"></div>
      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-row items-center gap-1">
          <Popover.Root>
            <Popover.Trigger>
              <div className="flex flex-row items-center text-gray-400">
                <AiOutlinePlus size={30} className="text-gray-400" />
                <div
                  className="group focus:shadow-0 focus:outline-0 "
                  aria-label="Customise options"
                >
                  <AiFillCaretDown className="text-gray-400" />
                </div>
              </div>
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content className="bg-background flex flex-col border-blue-400 border-[2px] rounded-[12px] p-[2px] -right-[24px]  absolute min-w-[240px]">
                <Modal />
                <Popover.Arrow className="fill-blue-400 h-2 w-3 translate-x-[-88px]" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
        <div className="flex flex-row items-center gap-1">
          <DropdownMenu name={String(usuario?.nome)} url={String(usuario?.perfil?.url)} />
        </div>
      </div>
    </div>
  );
}
