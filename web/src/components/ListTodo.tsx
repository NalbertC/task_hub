import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { ViewCheckbox } from "./Checkbox";

interface ListTodoProps {
  date: Date;
  onCompletedChanded: (completed: number) => void;
}

interface TodoInfo {
  possiveisTarefas: Array<{
    id: number;
    titulo: string;
    momento: string;
    criado_em: string;
    atualido_em: string;
  }>;
  completedTarefas: number[];
}

export function ListTodo({ date, onCompletedChanded }: ListTodoProps) {
  const [todoInfo, setTodoInfo] = useState<TodoInfo>();

  console.log(date.toISOString());

  const [] = useState();
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/dia", {
          params: {
            data: date.toISOString(),
          },
        });

        setTodoInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  async function handleToggleTodo(todoId: number) {
    await api.patch(`/tarefas/${todoId}/toggle`);

    const isTodoAlreadyCompleted = todoInfo?.completedTarefas.includes(todoId);

    let completedTodo = [];

    if (isTodoAlreadyCompleted) {
      completedTodo = todoInfo!.completedTarefas.filter((id) => id !== todoId);
    } else {
      completedTodo = [...todoInfo!.completedTarefas, todoId];
    }
    setTodoInfo({
      possiveisTarefas: todoInfo!.possiveisTarefas,
      completedTarefas: completedTodo,
    });

    onCompletedChanded(completedTodo.length);
  }

  return (
    <div>
      {todoInfo?.possiveisTarefas.map((todo) => {
        return (
          <ViewCheckbox
            key={todo.id}
            checked={todoInfo?.completedTarefas.includes(todo.id)}
            disabled={isDateInPast}
            onCheckedChange={() => handleToggleTodo(todo.id)}
            text="group-data-[state=checked]:line-through group-data-[state=checked]:text-gray-500"
          >
            {todo.titulo}
          </ViewCheckbox>
        );
      })}
    </div>
  );
}
