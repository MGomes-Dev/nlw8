import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from './../mail-adapter';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "9708a4bc1c563e",
        pass: "edf09ddc51139a"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from: "Equipe Feedget <oi@feedget.com>",
            to: "MGomes Dev <mgomes.dev@gmail.com>",
            subject,
            html: body
        });
    };
}