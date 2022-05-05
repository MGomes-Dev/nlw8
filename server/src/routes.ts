import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import express from "express";
import nodemailer from "nodemailer";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes = express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "9708a4bc1c563e",
        pass: "edf09ddc51139a"
    }
});

routes.post("/feedbacks", async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository);

    await submitFeedbackUseCase.execute({ type, comment, screenshot });

    await transport.sendMail({
        from: "Equipe Feedget <oi@feedget.com>",
        to: "MGomes Dev <mgomes.dev@gmail.com>",
        subject: "Novo feedback",
        html: [
            `<div style:"font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            "</ div>"
        ].join("\n")
    })

    return res.status(201).send();
});