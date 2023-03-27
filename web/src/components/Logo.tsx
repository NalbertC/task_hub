import { FcTodoList } from "react-icons/fc";
import { Heading } from "./Heading";

export function Logo() {
  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-row items-center cursor-pointer md:px-2 lg:px-3  gap-2 text-gray-300">
        <FcTodoList size={40} className="" />
        <Heading className="hidden md:block">ToDo</Heading>
      </div>
    </div>
  );
}
