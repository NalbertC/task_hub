import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import dayjs from "dayjs";
import { useState } from "react";
import { Heading } from "./Heading";
import { ListTodo } from "./ListTodo";
import { ProgressBar } from "./ProgressBar";
import { ViewScrollArea } from "./ScrollBar";
import { Text } from "./Text";

interface SummaryTableProps {
  date: Date;
  defaultCompleted?: number;
  amount?: number;
  disabled?: boolean;
}

export function TodoDay({
  defaultCompleted = 0,
  amount = 0,
  date,
  disabled,
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
        disabled={disabled}
        className={clsx("w-6 h-6  rounded-lg transition-colors", {
          "bg-gray-800": completedPercentage === 0,
          "bg-blue-900": completedPercentage > 0 && completedPercentage <= 20,
          "bg-blue-700": completedPercentage > 20 && completedPercentage <= 40,
          "bg-blue-600": completedPercentage > 40 && completedPercentage <= 60,

          "bg-blue-500": completedPercentage > 60 && completedPercentage <= 80,
          "bg-blue-300": completedPercentage > 80,
        })}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[240px] p-4 rounded-2xl bg-back flex flex-col border-blue-400 border-[2px] focus:shadow-0 focus:outline-0">
          <Text>{dayOfWeek}</Text>
          <Heading>{dayAndMonth}</Heading>

          <ProgressBar percentege={completedPercentage} />
          <div className="">
            <ViewScrollArea>
              <ListTodo
                date={date}
                onCompletedChanded={handleCompletedChanged}
              />
            </ViewScrollArea>
          </div>

          <Popover.Arrow className="fill-blue-400" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
