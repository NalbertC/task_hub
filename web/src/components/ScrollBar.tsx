import * as ScrollArea from "@radix-ui/react-scroll-area";

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const ScrollAreaDemo = () => (
  <ScrollArea.Root className="w-full h-[225px] rounded overflow-hidden shadow-[0_2px_10px] bg-white">
    <ScrollArea.Viewport className="w-full h-full rounded">
      <div className="py-[15px] px-5 flex">
        <div className="text-violet11 text-[15px] leading-[18px] font-medium">
          Tags
        </div>
        {TAGS.map((tag) => (
          <div
            className="text-mauve12 text-[13px] leading-[18px] border-t border-t-mauve6"
            key={tag}
          >
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar
      className="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8"
      orientation="horizontal"
    >
      <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Scrollbar
      className="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 "
      orientation="vertical"
    >
      <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner className="bg-blackA8" />
  </ScrollArea.Root>
);

export default ScrollAreaDemo;
