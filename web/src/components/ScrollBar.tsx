import * as ScrollArea from "@radix-ui/react-scroll-area";
import { ReactNode } from "react";
import s from "./ScrollArea.module.css";

interface ScrollArea {
  children: ReactNode;
}

export function ScrollAreaHorizontal({ children }: ScrollArea) {
  return (
    <ScrollArea.Root className="w-full  overflow-hidden shadow-lg">
      <div className="p-3 text-xl font-bold border-b border-gray-300 font-title">
        ScrollAreaHorizontal
      </div>
      <ScrollArea.Viewport className="relative w-full h-full pb-2">
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex p-2 duration-300 ease-out bg-gray-900 bg-opacity-20"
        orientation="vertical"
      >
        <ScrollArea.Thumb className={s.ScrollAreaThumb} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="flex p-2 duration-300 ease-out bg-gray-900 bg-opacity-20"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className={s.ScrollAreaThumb} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className=" bg-gray-100" />
    </ScrollArea.Root>
  );
}
