import { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

export function Page({ children }: PageProps) {
  return (
    <div className="bg-[#8b8d8e] flex justify-center items-center flex-col h-[100vh] w-full p-4 font-sans">
      <div className="bg-[#030126] border-2 border-[#030126] flex flex-row h-full w-full rounded-[24px]  md:max-w-[90%]">
        {children}
      </div>
    </div>
  );
}
