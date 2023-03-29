import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Input } from "./Input";
import { Logo } from "./Logo";
import { Text } from "./Text";

export function Header() {
  const navigate = useNavigate();
  function handleSearch(e: any) {
    console.log(e.key);
  }

  return (
    <div className="bg-background h-[72px] w-full flex justify-between  items-center px-6 rounded-t-[inherit]">
      <Logo />

      <div className="pl-4 flex flex-row justify-between items-center h-full gap-2">
        <Input
          placeholder="Buscar ..."
          icon={<BsSearch />}
          onKeyUp={(e) => {
            handleSearch(e);
          }}
        />

        <Text className="h-10 flex items-center  text-gray-50 font-semibold px-3 rounded-[12px] hover:text-gray-400 cursor-pointer">
          Entrar
        </Text>
        <div>
          <Button onClick={() => navigate("/login")}>Criar conta</Button>
        </div>
      </div>
    </div>
  );
}
