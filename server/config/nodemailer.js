import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp-brevo.com',
    port: 587,
    secure: false, // Use false for 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    // Adding these two lines helps us debug in the Render Logs
    logger: true,
    debug: true 
});

export default transporter;