import { BsFillHouseFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { Logo } from "./Logo";
import { MenuNav } from "./MenuNav";

export function Sidbar() {
  return (
    <div className="flex flex-col justify-between  h-full rounded-l-[24px]  py-4 px-3 md:px-4 lg:px-6 text-slate-400 md:w-[30%] lg:w-[25%] xl:w-[20%]">
      <Logo />

      <div className="flex flex-col justify-between h-[90%]">
        <div className="flex flex-col gap-2">
          <MenuNav icon={<BsFillHouseFill size={24} />}>Home</MenuNav>
          <MenuNav icon={<RiAccountPinCircleLine size={24} />}>
            Minha conta
          </MenuNav>
        </div>
        <MenuNav icon={<FiLogOut size={24} />}>Logout</MenuNav>
      </div>
    </div>
  );
}
