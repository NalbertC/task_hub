import clsx from "clsx";
import { InputHTMLAttributes, ReactNode, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
  inputUse?: "text" | "password";
  value?: string | undefined;
  id?: string;
  className?: string;
}

export function Input({
  type = "text",
  inputUse = "text",
  icon,
  className,
  ...props
}: InputProps) {
  const [typ, setType] = useState(type);
  const [viewPass, setViewPass] = useState(false);
  const [icone, setIcone] = useState<ReactNode>(<FaRegEye size={20} />);

  return (
    <div className={clsx("h-10 group/item relative z-1", className)}>
      <input
        className="h-full bg-back rounded-[12px] w-full block pr-7  pl-9 ring-1 text-gray-300 focus:shadow-0 focus:outline-0 focus:ring-1 placeholder:text-gray-600"
        type={typ}
        {...props}
      />

      <span className="focus:text-blue-200 flex items-center absolute rounded-[24px] bottom-0 left-0 h-full pl-3 text-blue-800">
        {icon}
      </span>

      {inputUse === "text" ? (
        <></>
      ) : (
        <span
          className="flex justify-center items-center absolute  bottom-0 right-0 h-full pr-4 text-blue-400 cursor-pointer"
          onClick={() => {
            setType("text");
            setViewPass(!viewPass);
            viewPass ? setType("text") : setType(type);
            viewPass
              ? setIcone(<FaRegEyeSlash size={20} />)
              : setIcone(<FaRegEye size={20} />);
          }}
        >
          {icone}
        </span>
      )}
    </div>
  );
}
