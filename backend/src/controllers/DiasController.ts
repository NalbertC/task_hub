import dayjs from "dayjs";
import { FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../database";

export default {
  async index(req: FastifyRequest) {
    try {
      const getDiaParams = z.object({
        data: z.coerce.date(),
      });
      const { data } = getDiaParams.parse(req.query);

      const parsedData = dayjs(data).startOf("day");

      const diaSemana = parsedData.get("day");

      const possiveisTarefas = await prisma.tarefa.findMany({
        where: {
          momento: {
            lte: data,
          },
          DiaSemana: {
            some: {
              dia_semana: diaSemana,
            },
          },
        },
      });

      const dia = await prisma.dia.findUnique({
        where: {
          data: parsedData.toDate(),
        },
        include: {
          DiaTarefa: true,
        },
      });

      const completedTarefas =
        dia?.DiaTarefa.map((diaTarefa) => {
          return diaTarefa.tarefa_id;
        }) ?? [];

      return {
        possiveisTarefas,
        completedTarefas,
      };
    } catch (error) {
      console.error(error);
      return "Erro no servidor interno!";
    }
  },

  async summary() {
    try {
      const summary = await prisma.$queryRaw`
      SELECT
        D.id,
        D.data,(
          SELECT
            cast(count(*) as float)
          FROM dia_tarefa DT
          WHERE DT.dia_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM tarefa_dia_semana TDS
          WHERE
            TDS.dia_semana = cast(strftime("%w", D.data/1000.0, 'unixepoch') as int)
        ) as amount
      FROM dia D
      `;

      return summary;
    } catch (error) {
      console.error(error);
      return "Erro no servidor interno!";
    }
  },
};
