import * as Checkbox from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { ReactNode } from "react";
import { BsCheckLg } from "react-icons/bs";
import { Text } from "./Text";

interface CheckboxProps {
  children: ReactNode;
  onCheckedChange?: any;
  checked?: Checkbox.CheckedState;
  disabled?: boolean;
  text?: string;
}

export function ViewCheckbox({
  children,
  onCheckedChange,
  checked,
  disabled,
  text,
}: CheckboxProps) {
  return (
    <div className="mt-2 flex flex-col gap-2">
      <Checkbox.Root
        className="group flex items-center gap-2  disabled:cursor-not-allowed disabled:text-gray-400"
        onCheckedChange={onCheckedChange}
        checked={checked}
        disabled={disabled}
      >
        <div className="h-6 w-6 rounded-[6px] flex items-center justify-center border-2 border-gray-500 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-gray-500 group-data-[state=checked]:border  transition-colors">
          <Checkbox.Indicator className="h-full w-full flex items-center justify-center rounded-[inherit]">
            <BsCheckLg size={20} className="text-gray-50" />
          </Checkbox.Indicator>
        </div>

        <span className={clsx("leading-tight transition-colors", text)}>
          <Text>{children}</Text>
        </span>
      </Checkbox.Root>
    </div>
  );
}
