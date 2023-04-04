import { transporter } from "../configs/nodemailer";

export default {
  async emailRecuperarSenha(emailUsuario: string, token: string) {
    const mailOptions = {
      from: "Teste <nalberthcastro1510@hotmail.com>",
      to: emailUsuario,
      subject: "Recuperação de senha",
      html: `
      <p>Esqueceu sua senha? Não tem problema, você pode redefi-la acessando o link abaixo: </p>
      <a href="${process.env.API_HOST}:${process.env.API_PORT}/resetar_senha/${token}">Recuperar senha</a>

      <p>${token}</p>`,
    };

    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        console.log(erro);
      }

      console.log("Email enviado");
    });
  },
};
