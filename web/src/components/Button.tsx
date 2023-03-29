import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function Button({ className, icon, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "w-full bg-blue-700 h-10 rounded-[12px] flex justify-center items-center gap-2 pl-4 pr-4 text-gray-200 font-semibold hover:bg-blue-800 hover:text-gray-100 transition-colors whitespace-nowrap overflow-hidden text-ellipsis",
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
