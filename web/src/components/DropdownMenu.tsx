import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { useContext } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { AuthContext } from "../contexts/auth";
import { AvatarDemo } from "./Avatar";
import { Text } from "./Text";
import { useNavigate } from "react-router-dom";


interface DropProps {
  name: string;
  url: string;
}
export const DropdownMenu = (props: DropProps) => {
  const { logout } = useContext(AuthContext);
 const navigate = useNavigate();

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <div className="flex flex-row ">
          <AvatarDemo iniciais={props.name} url={props.url} />
          <button
            className="group focus:shadow-0 focus:outline-0 "
            aria-label="Customise options"
          >
            <AiFillCaretDown className="text-gray-400" />
          </button>
        </div>
      </Dropdown.Trigger>

      <Dropdown.Portal>
        <Dropdown.Content className="bg-background flex flex-col border-blue-400 border-[2px] rounded-[12px] -right-[24px]  absolute min-w-[240px]">
          <Dropdown.Item className="h-10 pl-4 rounded-[8px] flex flex-row items-center m-[2px] cursor-pointer hover:text-gray-200 hover:delay-150 hover:bg-gray-700 focus:shadow-0 focus:outline-0" onClick={()=> navigate("/meuperfil")}>
            <Text>Meu Perfil</Text>
          </Dropdown.Item>

          <Dropdown.Item className="h-10 pl-4 rounded-[8px] flex flex-row items-center m-[2px] cursor-pointer hover:text-gray-200 hover:delay-150 hover:bg-gray-700 focus:shadow-0 focus:outline-0">
            <Text>Sua conta</Text>
          </Dropdown.Item>

          <Dropdown.Separator className="h-[2px] bg-blue-400 mx-2 my-1" />

          <Dropdown.Item
            className="h-10 pl-4 mb-[2px] rounded-[8px] flex flex-row items-center cursor-pointer m-[2px] hover:text-gray-200 hover:delay-150 hover:bg-gray-700 focus:shadow-0 focus:outline-0"
            onClick={() => logout()}
          >
            <Text>Sair</Text>
          </Dropdown.Item>

          <Dropdown.Arrow className="fill-blue-400 h-2 w-3 translate-x-[-88px]" />
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
};
