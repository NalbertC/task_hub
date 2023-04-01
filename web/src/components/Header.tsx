import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { Modal } from "./Modal";
import { InputSearch } from "./Search";

export function Header() {
  const navigate = useNavigate();
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

      <div className="pl-4 flex flex-row justify-between items-center h-full gap-2">
        <div>
          <Modal />
        </div>
      </div>
    </div>
  );
}
