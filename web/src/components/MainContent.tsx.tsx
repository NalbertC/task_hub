import { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

export function MainContent({ children }: PageProps) {
  return (
    <div className="flex flex-col w-full bg-blue-50 rounded-l-[16px] rounded-r-[24px]">
      {children}
    </div>
  );
}
