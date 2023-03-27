import * as Progress from "@radix-ui/react-progress";

interface ProgressBarProps {
  percentege: number;
}

export function ProgressBar({ percentege }: ProgressBarProps) {
  return (
    <Progress.Root
      className="h-3 rounded-full bg-gray-400 relative overflow-hidden "
      style={{ transform: "translateZ(0)" }}
      value={percentege}
    >
      <Progress.Indicator
        className=" bg-blue-600 w-full h-full rounded-full  transition-transform duration-[500ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        style={{ transform: `translateX(-${100 - percentege}%)` }}
      />
    </Progress.Root>
  );
}
