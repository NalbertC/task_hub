import dayjs from "dayjs";
import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../database";

export default {
  async index(req: Request, res: Response) {
    try {
      const viewTarefas = z.object({
        id: z.string(),
      });

      const { id } = viewTarefas.parse(req.params);

      const usuario = await prisma.usuario.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!usuario) {
        return res.status(404).json("Usuário não encontrado");
      }

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
          userId: usuario.id,
        },
      });

      const dia = await prisma.dia.findUnique({
        where: {
          data: parsedData.toDate(),
        },
        include: {
          DiaTarefa: {
            where: {
              tarefa: {
                userId: Number(usuario.id),
              },
            },
          },
        },
      });

      const completedTarefas =
        dia?.DiaTarefa.map((diaTarefa) => {
          return diaTarefa.tarefa_id;
        }) ?? [];

      return res.status(200).json({
        possiveisTarefas,
        completedTarefas,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Erro no servidor interno!");
    }
  },

  async summary(req: Request, res: Response) {
    try {
      const viewTarefas = z.object({
        id: z.string(),
      });

      const { id } = viewTarefas.parse(req.params);

      const usuario = await prisma.usuario.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!usuario) {
        return res.status(404).json("Usuário não encontrado");
      }

      const summary = await prisma.$queryRaw`
      SELECT
        D.id,
        D.data,(
          SELECT
            cast(count(*) as float)
          FROM dia_tarefa DT
          WHERE DT.dia_id = D.id AND DT.usuario_id = ${usuario.id}
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM tarefa_dia_semana TDS
          WHERE
            TDS.dia_semana = cast(strftime("%w", D.data/1000.0, 'unixepoch') as int) AND TDS.usuario_id = ${usuario.id}
        ) as amount
      FROM dia D`;

      return res.status(200).json(summary);
    } catch (error) {
      console.error(error);
      return res.json("Erro no servidor interno!");
    }
  },
};
