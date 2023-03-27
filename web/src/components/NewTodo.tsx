import { FormEvent, useState } from "react";

import { BsCheckLg } from "react-icons/bs";
import { RiCalendarTodoLine } from "react-icons/ri";
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
  const [title, setTitle] = useState("");
  const [diasSemana, setDiasSemana] = useState<number[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!title || diasSemana.length === 0) {
      return;
    }

    await api.post("/tarefas", {
      titulo: title,
      diaSemana: diasSemana,
    });

    setTitle("");
    setDiasSemana([]);
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
