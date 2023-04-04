import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import multerConfig, { s3, storageTypes } from "../configs/multer";
import { prisma } from "../database";

export default {
  async index(req: Request, res: Response) {
    try {
      const uploads = await prisma.perfil.findMany();

      return res.status(200).json(uploads);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Erro no servidor interno!");
    }
  },

  async create(req: Request, res: Response) {
    try {
      const nome = req.file?.originalname;
      const key = req.file?.key;
      let url = req.file?.location;

      if (!url) {
        url = `${process.env.API_HOST}:${process.env.API_PORT}/files/${key}`;
      }

      const usuario = await prisma.usuario.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      if (!usuario) {
        return res.status(404).json({
          message: "Usuário não encontrado!",
        });
      }

      const verficarPerfil = await prisma.perfil.findFirst({
        where: {
          userId: usuario.id,
        },
      });

      async function criarAvatar(id: number) {
        const avatar = await prisma.perfil.upsert({
          where: {
            userId: id,
          },
          update: {
            key,
            nome,
            url,
          },
          create: {
            key,
            nome,
            userId: id,
            url,
          },
        });
      }

      async function atualizarAvatar() {
        if (multerConfig.storage === storageTypes["local"]) {
          await promisify(fs.unlink)(
            path.resolve(
              __dirname,
              "..",
              "..",
              "tmp",
              "uploads",
              String(verficarPerfil?.key)
            )
          );
        } else {
          const data = await s3.send(
            new DeleteObjectCommand({
              Bucket: String(process.env.BUCKET_NAME),

              Key: String(verficarPerfil?.key),
            })
          );
        }
      }
      if (!verficarPerfil) {
        const avatar = criarAvatar(usuario.id);

        console.log({ req: req.file, avatar });

        return res.status(201).json(avatar);
      } else {
        atualizarAvatar();
        const avatar = criarAvatar(usuario.id);

        console.log({ req: req.file, avatar });

        return res.status(201).json(avatar);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json("Erro no servidor interno!");
    }
  },
};
