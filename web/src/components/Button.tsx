import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
}

export function Button({ icon, children }: ButtonProps) {
  return (
    <button className="bg-blue-700 h-12 rounded-[12px] flex justify-center items-center gap-2 pl-4 pr-4 text-gray-200 font-semibold hover:bg-blue-800 hover:text-gray-100 transition-colors">
      {icon}
      {children}
    </button>
  );
}
