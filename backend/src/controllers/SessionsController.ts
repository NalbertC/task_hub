import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { authConfig } from "../configs/auth";
import { prisma } from "../database";
import { checarSenha } from "../services/auth";

export default {
  async create(req: Request, res: Response) {
    try {
      const fazerLoginBody = z.object({
        email: z.string(),
        senha: z.string(),
      });

      const { email, senha } = fazerLoginBody.parse(req.body);

      const usuario = await prisma.usuario.findUnique({
        where: { email: email },
      });

      if (!usuario) {
        return res.json("Usuário não encontrado");
      }

      const check = await checarSenha(senha, usuario.senha);

      if (!check) {
        return res.json("Senha inválida");
      }

      const { id } = usuario;

      return res.json({
        usuario: {
          id: usuario.id,
          email: usuario.email,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Erro no servidor interno!");
    }
  },
};
