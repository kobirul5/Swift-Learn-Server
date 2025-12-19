import nodemailer from "nodemailer";
import envConfig from "../envs";

const emailSender = async (email: string, html: string, subject: string) => {
    const transporter = nodemailer.createTransport({
        host: envConfig.emailSender.smtp_server, // SendGrid SMTP Server
        port: parseInt(envConfig.emailSender.smtp_port!), // SMTP Port, 587 for TLS
        secure: false, // Use TLS (Transport Layer Security)
        auth: {
            user: envConfig.emailSender.smtp_user, // "apikey" (SendGrid's required user)
            pass: envConfig.emailSender.smtp_pass, // SendGrid API Key
        },
        tls: {
            rejectUnauthorized: false, // Disable unauthorized rejection (for development purposes)
        },
    });

    const info = await transporter.sendMail({
        from: "<info@sendiate.com>",
        to: email,
        subject: subject,
        html,
    });
    console.log("test", info);
};

export default emailSender;
