import { BsSearch } from "react-icons/bs";
import logo from "../assets/myprofile.jpeg";
import { Input } from "./Input";

export function Header() {
  function handleSearch(e: any) {
    console.log(e.key);
  }

  return (
    <div className="bg-blue-50 h-[72px] w-full flex justify-between  items-center pl-3 pr-6 lg:pl-6 rounded-tr-[24px] rounded-tl-[16px]">
      <Input
        placeholder="Buscar ..."
        icon={<BsSearch />}
        onKeyUp={(e) => {
          handleSearch(e);
        }}
      />

      <div className="flex flex-row justify-between items-center h-full">
        <img src={logo} className="h-[70%] rounded-full" />
      </div>
    </div>
  );
}
