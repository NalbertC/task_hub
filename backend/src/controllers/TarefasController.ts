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

      const tarefas = await prisma.tarefa.findMany({
        where: {
          userId: usuario.id,
        },
      });
      return res.json(tarefas);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Erro no servidor interno!");
    }
  },

  async create(req: Request, res: Response) {
    try {
      const criarTarefaBody = z.object({
        titulo: z.string(),
        diaSemana: z.array(z.number().min(0).max(6)),
      });

      const criarTarefaParams = z.object({
        id: z.string(),
      });

      const getDiaParams = z.object({
        dataFim: z.coerce.date().optional(),
      });

      const { titulo, diaSemana } = criarTarefaBody.parse(req.body);

      const { id } = criarTarefaParams.parse(req.params);

      const { dataFim } = getDiaParams.parse(req.query);

      const usuario = await prisma.usuario.findUnique({
        where: {
          id: Number(id),
        },
      });

      let fimTarefa: Date | null;

      if (!usuario) {
        return res.status(404).json("Usuário não encontrado");
      }

      if (!dataFim) {
        fimTarefa = null;
      } else {
        const date = new Date(dataFim);
        fimTarefa = dayjs(date).startOf("day").toDate();
        console.log(fimTarefa);
      }

      const day = dayjs().startOf("day").toDate();
      console.log(day);

      // await prisma.tarefa.create({
      //   data: {
      //     titulo,
      //     inicio: day,
      //     fim: fimTarefa,
      //     DiaSemana: {
      //       create: diaSemana.map((dia) => {
      //         return {
      //           dia_semana: dia,
      //           usuario_id: usuario.id,
      //         };
      //       }),
      //     },
      //     userId: usuario.id,
      //   },
      // });
      return res.status(201).json("Criado com sucesso!");
    } catch (error) {
      console.error(error);
      return res.status(500).json("Erro no servidor interno!");
    }
  },

  async toggle(req: Request, res: Response) {
    try {
      const toggleTarefas = z.object({
        idT: z.string(),
        idU: z.string(),
      });

      const { idU, idT } = toggleTarefas.parse(req.params);

      const usuario = await prisma.usuario.findUnique({
        where: {
          id: Number(idU),
        },
      });

      if (!usuario) {
        return res.status(404).json("Usuário não encontrado");
      }

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
            tarefa_id: Number(idT),
          },
        },
      });

      if (diaTarefa) {
        await prisma.diaTarefa.delete({
          where: {
            id: diaTarefa.id,
          },
        });
        return res.status(200).json("Desmarcado");
      } else {
        await prisma.diaTarefa.create({
          data: {
            dia_id: day.id,
            tarefa_id: Number(idT),
            usuario_id: Number(idU),
          },
        });
        return res.status(200).json("Marcado");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json("Erro no servidor interno!");
    }
  },
};
