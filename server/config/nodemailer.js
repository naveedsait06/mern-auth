import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp-brevo.com',
    port: 587,
    secure: false, // TLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    // This forces the connection to stay on IPv4
    family: 4, 
    connectionTimeout: 15000, // Wait 15s for cloud stability
    greetingTimeout: 15000,
});

export default transporter;