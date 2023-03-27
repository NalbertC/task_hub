import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import dayjs from "dayjs";
import { useState } from "react";
import { Heading } from "./Heading";
import { ListTodo } from "./ListTodo";
import { ProgressBar } from "./ProgressBar";
import { Text } from "./Text";

interface SummaryTableProps {
  date: Date;
  defaultCompleted?: number;
  amount?: number;
}

export function TodoDay({
  defaultCompleted = 0,
  amount = 0,
  date,
}: SummaryTableProps) {
  const [completed, setCompleted] = useState(defaultCompleted);

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");

  function handleCompletedChanged(completed: number) {
    setCompleted(completed);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx("w-6 h-6  rounded-lg transition-colors", {
          "bg-gray-400": completedPercentage === 0,
          "bg-blue-400": completedPercentage > 0 && completedPercentage < 20,
          "bg-blue-500": completedPercentage >= 20 && completedPercentage < 40,
          "bg-blue-700": completedPercentage >= 40 && completedPercentage < 60,

          "bg-blue-800": completedPercentage >= 60 && completedPercentage < 80,
          "bg-blue-900": completedPercentage >= 80,
        })}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-4 rounded-2xl bg-blue-100 flex flex-col border-blue-400 border-[2px] focus:shadow-0 focus:outline-0">
          <Text>{dayOfWeek}</Text>
          <Heading>{dayAndMonth}</Heading>

          <ProgressBar percentege={completedPercentage} />

          <ListTodo date={date} onCompletedChanded={handleCompletedChanged} />

          <Popover.Arrow className="fill-blue-400" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
