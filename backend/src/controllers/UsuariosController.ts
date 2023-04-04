import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../database";
import { criptografarSenha } from "../services/auth";

type TViewUsuario = {
  id: number;
  nome: string;
  email: string;
  data_criacao: Date;
  perfil?: TPerfilUsuario;
};

type TPerfilUsuario = {
  nome?: string;
  key?: string;
  url?: string;
};

export default {
  async index(req: Request, res: Response) {
    try {
      const usuarios = await prisma.usuario.findMany();

      const viewUsuarios: TViewUsuario[] = [];

      usuarios.map((usuario) => {
        const user: TViewUsuario = {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          data_criacao: usuario.criado_em,
        };

        viewUsuarios.push(user);
      });

      return res.status(200).json(viewUsuarios);
    } catch (error) {
      console.error(error);
      return res.json("Erro no servidor interno!");
    }
  },

  async create(req: Request, res: Response) {
    try {
      const criarUsuarioBody = z.object({
        nome: z.string(),
        email: z.string(),
        senha: z.string(),
      });

      const { email, nome, senha } = criarUsuarioBody.parse(req.body);

      const ferificarUsurio = await prisma.usuario.findUnique({
        where: {
          email,
        },
      });

      if (ferificarUsurio) {
        return res.json("Email já cadastrado");
      }

      const senhaCriptografada = await criptografarSenha(senha);

      const novoUsuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: senhaCriptografada,
        },
      });
      return res .status(201).json({
        mensagem: "Cadastrado com sucesso",
        usuario: novoUsuario,
      });
    } catch (error) {
      console.error(error);
      return res.json("Erro no servidor interno!");
    }
  },

  async usuario(req: Request, res: Response) {
    try {
      const viewUsuario = z.object({
        id: z.string(),
      });

      const { id } = viewUsuario.parse(req.params);

      const usuario = await prisma.usuario.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          perfil: true,
        },
      });

      if (!usuario) {
        return res.status(404).json("Usuário não encontrado");
      }

      return res.json(<TViewUsuario>{
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        data_criacao: usuario.criado_em,
        perfil: {
          key: usuario.perfil?.key,
          url: usuario.perfil?.url,
          nome: usuario.perfil?.nome,
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Erro no servidor interno!");
    }
  },

  async searchUsuarios(req: Request, res: Response) {
    try {
      const buscarUsuariosParams = z.object({
        busca: z.string(),
      });

      const { busca } = buscarUsuariosParams.parse(req.query);

      const usuarios = await prisma.usuario.findMany({
        where: {
          nome: {
            startsWith: busca,
          },
        },
        include: {
          perfil: true,
        },
      });

      const viewUsuarios: TViewUsuario[] = [];

      usuarios.map((usuario) => {
        const user: TViewUsuario = {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          data_criacao: usuario.criado_em,
        };

        viewUsuarios.push(user);
      });

      return res.status(200).json(viewUsuarios);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Erro no servidor interno!");
    }
  },
};
