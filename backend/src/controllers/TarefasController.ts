import dayjs from "dayjs";
import { FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../database";

export default {
  async index() {
    try {
      const tarefas = await prisma.tarefa.findMany();
      return tarefas;
    } catch (error) {
      console.error(error);
      return "Erro no servidor interno!";
    }
  },
  async create(req: FastifyRequest) {
    try {
      const criarTarefaBody = z.object({
        titulo: z.string(),
        diaSemana: z.array(z.number().min(0).max(6)),
      });

      const { titulo } = criarTarefaBody.parse(req.body);
      let { diaSemana } = criarTarefaBody.parse(req.body);

      const day = dayjs().startOf("day").toDate();

      await prisma.tarefa.create({
        data: {
          titulo,
          momento: day,
          DiaSemana: {
            create: diaSemana.map((dia) => {
              return {
                dia_semana: dia,
              };
            }),
          },
        },
      });
      return "Criado com sucesso!";
    } catch (error) {
      console.error(error);
      return "Erro no servidor interno!";
    }
  },
  async toggle(req: FastifyRequest) {
    try {
      const toggleTarefas = z.object({
        id: z.string(),
      });

      const { id } = toggleTarefas.parse(req.params);

      const today = dayjs().startOf("day").toDate();

      let day = await prisma.dia.findUnique({
        where: {
          data: today,
        },
      });

      if (!day) {
        day = await prisma.dia.create({
          data: {
            data: today,
          },
        });
      }

      const diaTarefa = await prisma.diaTarefa.findUnique({
        where: {
          dia_id_tarefa_id: {
            dia_id: day.id,
            tarefa_id: Number(id),
          },
        },
      });

      if (diaTarefa) {
        await prisma.diaTarefa.delete({
          where: {
            id: diaTarefa.id,
          },
        });
        return "Desmarcado";
      } else {
        await prisma.diaTarefa.create({
          data: {
            dia_id: day.id,
            tarefa_id: Number(id),
          },
        });
        return "Marcado";
      }
    } catch (error) {
      console.error(error);
      return "Erro no servidor interno!";
    }
  },
};
