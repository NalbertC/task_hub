import { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

export function Page({ children }: PageProps) {
  return (
    <div className=" bg-back flex justify-center items-center flex-col h-screen w-screen py-4 px-2">
      <div className="max-w-[1300px] w-full h-full  bg-[#0f1625] rounded-[24px]">
        {children}
      </div>
    </div>
  );
}
