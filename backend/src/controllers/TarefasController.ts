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
};
