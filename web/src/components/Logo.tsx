import { FcTodoList } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export function Logo() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row items-center"
      onClick={() => navigate("/private")}
    >
      <div className="flex flex-row items-center cursor-pointer   gap-2 text-gray-300">
        <FcTodoList size={50} className="" />
      </div>
    </div>
  );
}
