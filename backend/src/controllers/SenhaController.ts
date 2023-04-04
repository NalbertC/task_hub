import crypto from "crypto";
import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../database";
import { criptografarSenha } from "../services/auth";
import mailer from "../services/mail";

export default {
  async recuperar(req: Request, res: Response) {
    try {
      const RecuperarSenhaBody = z.object({
        email: z.string(),
      });

      const { email } = RecuperarSenhaBody.parse(req.body);

      const verificarEmail = await prisma.usuario.findUnique({
        where: {
          email,
        },
      });

      if (!verificarEmail) {
        return res.status(404).json("Usuário não encontrado");
      }

      const token = crypto.randomBytes(20).toString("hex");

      const dataExpiracaoToken = new Date();
      dataExpiracaoToken.setHours(dataExpiracaoToken.getHours() + 1);

      const armazenarToken = await prisma.usuario.update({
        where: {
          id: verificarEmail.id,
        },
        data: {
          tokenResetSenha: token,
          dataExpiracaotoken: dataExpiracaoToken,
        },
      });

      mailer.emailRecuperarSenha(armazenarToken.email, token);

      return res.status(200).json("Link de recuperação enviado para seu email");
    } catch (error) {
      console.error(error);
      return res.json("Erro no servidor interno!");
    }
  },

  async resetar(req: Request, res: Response) {
    try {
      const resetarSenhaBody = z.object({
        email: z.string(),
        token: z.string(),
        senha: z.string(),
      });

      const { email, token, senha } = resetarSenhaBody.parse(req.body);
      const verificarEmail = await prisma.usuario.findUnique({
        where: {
          email,
        },
      });

      if (!verificarEmail) {
        return res.status(404).json("Usuário não encontrado");
      }

      if (token !== verificarEmail.tokenResetSenha) {
        return res.json("Token inválido");
      }

      const datAtual = new Date();

      if (datAtual > verificarEmail.dataExpiracaotoken!) {
        return res.json(
          "Token expirado, gere um novo token em recuperar senha"
        );
      }

      const senhaCriptografada = await criptografarSenha(senha);

      await prisma.usuario.update({
        where: {
          id: verificarEmail.id,
        },
        data: {
          senha: senhaCriptografada,
        },
      });

      return res.status(200).json("Senha atualizada com sucesso");
    } catch (error) {
      console.error(error);
      return res.json("Erro no servidor interno!");
    }
  },
};
