import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, 
    auth: {
        user: process.env.SMTP_USER, // Checks .env for SMTP_USER
        pass: process.env.SMTP_PASS, // Checks .env for SMTP_PASS
    },
});
export default transporter;