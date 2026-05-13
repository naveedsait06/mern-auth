import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp-brevo.com',
    port: 2525, // Some cloud providers block 587 but allow 2525
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    family: 4
});

export default transporter;