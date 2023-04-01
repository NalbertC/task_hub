// import * as ScrollArea from "@radix-ui/react-scroll-area";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth";
import { api } from "../services/api";
import { generateDatesFromYearBeginnig } from "../utils/generate-dates-from-year-beginnig";
import { TodoDay } from "./TodoDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginnig();
const ninmumSummaryDatesSize = 20 * 7;
const ammountOfDaysToFill = ninmumSummaryDatesSize - summaryDates.length;

type Summary = Array<{
  id: number;
  data: string;
  amount: number;
  completed: number;
}>;

interface SummaryProps {
  userId: string;
  disabled?: boolean;
}

export function SummaryTable(props: SummaryProps) {
  const { logout, authenticated, user, token } = useContext(AuthContext);
  const [summary, setSumary] = useState<Summary>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/usuario/${props.userId}/dia/summary`);

        setSumary(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [props.userId]);

  return (
    <div className="w-full overflow-hidden  flex">
      <div className="grid grid-rows-7 grid-flow-row gap gap-y-1 gap-x-1">
        {weekDays.map((weekDay, i) => {
          return (
            <div
              key={`${weekDay}-${i}`}
              className="text-gray-400 w-6 h-6 flex items-center font-bold justify-center"
            >
              {weekDay}
            </div>
          );
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-y-1 gap-x-1">
        {summary.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.data, "day");
            });

            return (
              <TodoDay
                disabled={props.disabled}
                key={date.toString()}
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            );
          })}

        {ammountOfDaysToFill > 0 &&
          Array.from({ length: ammountOfDaysToFill }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-6 h-6 bg-gray-800  rounded-lg opacity-40 cursor-not-allowed"
              />
            );
          })}
      </div>
    </div>
  );
}
