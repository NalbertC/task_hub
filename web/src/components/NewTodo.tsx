import { FormEvent, useContext, useState } from "react";

import {
  BsCalendar2WeekFill,
  BsCheckLg,
  BsFillCalendar2EventFill,
} from "react-icons/bs";
import { RiCalendarTodoLine } from "react-icons/ri";
import { AuthContext } from "../contexts/auth";
import { api } from "../services/api";
import { Button } from "./Button";
import { ViewCheckbox } from "./Checkbox";
import { Input } from "./Input";
import { Text } from "./Text";

const diasDaSemanaExtenso = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];

export function NewTodo() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [diasSemana, setDiasSemana] = useState<number[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!title || diasSemana.length === 0) {
      return;
    }

    await api.post(
      `/tarefas/usuario/${user.id}`,
      {
        titulo: title,
        diaSemana: diasSemana,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          dataFim,
        },
      }
    );
    console.log(dataFim);

    setTitle("");
    setDiasSemana([]);
    setDataFim("");
    alert("Tarefa adicionada à lista");
  }

  function hadleToggleWeekDay(diaSemana: number) {
    if (diasSemana.includes(diaSemana)) {
      const diasSemanaComRemocao = diasSemana.filter(
        (dia) => dia !== diaSemana
      );
      setDiasSemana(diasSemanaComRemocao);
    } else {
      const diasSemanaComAdcao = [...diasSemana, diaSemana];

      setDiasSemana(diasSemanaComAdcao);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="mt-3 font-bold">
          <Text size="lg">Qual seu comprometimento?</Text>
        </label>
        <Input
          id="title"
          icon={<RiCalendarTodoLine />}
          placeholder="ex: Estudar react"
          autoFocus
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="" className="mt-3 font-bold mb-2">
          <Text size="lg">Até quando?</Text>
        </label>
        <div className="group/item relative z-1 w-full mb-1">
          <input
            type="date"
            className="h-10 w-full rounded-[12px] ring-1 pl-9 pr-4 bg-black focus:shadow-0 focus:outline-0 focus:ring-1 "
            value={dataFim}
            onChange={(e) => {
              setDataFim(e.target.value);
            }}
          />
          <span className="focus:text-blue-200 flex items-center absolute rounded-[24px] bottom-0 left-0 h-full pl-3 text-blue-800">
            <BsCalendar2WeekFill />
          </span>

          <div className="absolute inset-y-0 right-0 flex items-center pr-4  pointer-events-none">
            <BsFillCalendar2EventFill size={20} className="cursor-pointer" />
          </div>
        </div>
        <Text size="sm" className="text-gray-500">
          Deixe vazio para não definir um fim
        </Text>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="mt-3 font-bold">
          <Text size="lg">Qual a recorrência?</Text>
        </label>

        {diasDaSemanaExtenso.map((dia, i) => {
          return (
            <ViewCheckbox
              onCheckedChange={() => hadleToggleWeekDay(i)}
              key={dia}
              checked={diasSemana.includes(i)}
            >
              {dia}
            </ViewCheckbox>
          );
        })}
      </div>

      <Button icon={<BsCheckLg size={24} />} type="submit">
        Confirmar
      </Button>
    </form>
  );
}
