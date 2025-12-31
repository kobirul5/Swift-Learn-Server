import nodemailer from "nodemailer";
import envConfig from "../envs";

const emailSender = async (
  toEmail: string,
  html: string,
  subject: string
) => {
  const transporter = nodemailer.createTransport({
    host: envConfig.emailSender.smtp_server,
    port: Number(envConfig.emailSender.smtp_port),
    secure: false, // true only if port 465
    auth: {
      user: envConfig.emailSender.smtp_user,
      pass: envConfig.emailSender.smtp_pass,
    },
  });

  const info = await transporter.sendMail({
    from: envConfig.emailSender.smtp_user,
    to: toEmail,
    subject,
    html,
  });

  console.log("Email sent:", info.messageId);
};

export default emailSender;
