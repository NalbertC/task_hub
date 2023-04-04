import clsx from "clsx";
import { FormEvent, InputHTMLAttributes, ReactNode, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
  inputUse?: "text" | "password" | "search";
  value?: string | undefined;
  id?: string;
  className?: string;
  children?: ReactNode;
}

type TViewUsuario = {
  id: number;
  nome: string;
  email: string;
  data_criacao: Date;
};

export function InputSearch(props: InputProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [usuarios, setUsuarios] = useState<TViewUsuario[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (search === "") {
      setUsuarios([]);
    } else {
      const response = await api.get(`/usuario/buscar?busca=${search}`);

      setUsuarios(response.data);
    }

  }

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx("h-10 group/item relative z-1", props.className)}
    >
      <input
        className="h-full bg-back rounded-[12px] w-full block pr-7  pl-9 ring-1 text-gray-300 focus:shadow-0 focus:outline-0 focus:ring-1 placeholder:text-gray-600"
        placeholder={props.placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <span className="focus:text-blue-200 flex items-center absolute rounded-[24px] bottom-0 left-0 h-full pl-3 text-blue-800">
        {props.icon}
      </span>

      <span className="flex items-center absolute rounded-full bottom-0 left-0 h-full  ml-1">
        <button
          type="submit"
          className="flex items-center focus:text-blue-200 rounded-full p-2 text-blue-800 cursor-pointer hover:bg-gray-800"
        >
          {props.icon}
        </button>
      </span>

      {usuarios.length > 0 ? (
        <span className="flex justify-center items-center absolute  bottom-0 right-0 h-full mr-1">
          <span
            className="flex justify-center items-center  bottom-0 right-0 rounded-full p-1 text-blue-800 cursor-pointer hover:bg-gray-800"
            onClick={() => setUsuarios([])}
          >
            <IoMdClose size={24} />
          </span>
        </span>
      ) : (
        <></>
      )}

      <div className="bg-gray-900  rounded-[8px]  w-full relative overflow-hidden z-[9999] ">
        {usuarios.map((usuario) => {
          return (
            <div
              key={usuario.email}
              className="h-10 flex flex-row items-center p-3 hover:bg-gray-700 hover:cursor-pointer"
              onClick={() => {
                navigate(`/usuario/${usuario.id}`);
                setUsuarios([]);
              }}
            >
              {usuario.nome}
            </div>
          );
        })}
      </div>
    </form>
  );
}
