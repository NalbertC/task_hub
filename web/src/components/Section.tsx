import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
}

export function Section({ children }: SectionProps) {
  return (
    <section className="w-full bg-blue-100 rounded-br-[24px] rounded-bl-[16px] rounded-t-[16px] h-full px-3 py-2 lg:px-6 relative">
      {children}
    </section>
  );
}
