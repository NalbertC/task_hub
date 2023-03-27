import { ReactNode } from "react";

interface PropsMenu {
  icon: ReactNode;
  children: ReactNode;
}

export function MenuNav({ icon, children }: PropsMenu) {
  return (
    <div
      className="px-2 py-3 md:px-3 hover:bg-[#1a294a] hover:text-gray-300 rounded-[8px] text-gray-500

    flex flex-row items-center gap-2  justify-center md:justify-start whitespace-nowrap overflow-hidden text-ellipsis"
    >
      <span>{icon}</span>
      <span className="hidden md:flex">{children}</span>
    </div>
  );
}
