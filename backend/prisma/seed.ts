import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

const d = [0, 1, 2, 3, 4, 5, 6];
const day = dayjs().startOf("day").toDate();

async function main() {
  await prisma.tarefa.create({
     data: {
      titulo: "Terminar essa aplicação",
      momento: day,
      DiaSemana: {
        create: d.map((i) => {
          return {
            dia_semana: i,
          };
        }),
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();
    process.exit(1);
  });
