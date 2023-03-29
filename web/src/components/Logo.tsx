import { FcTodoList } from "react-icons/fc";

export function Logo() {
  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-row items-center cursor-pointer   gap-2 text-gray-300">
        <FcTodoList size={50} className="" />
      </div>
    </div>
  );
}
