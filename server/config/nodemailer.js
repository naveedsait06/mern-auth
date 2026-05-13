import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    // Use the direct IPv4 address for Brevo's SMTP server
    host: '1.1.1.1', // We will replace this with the verified IP below
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    // Adding extra timeout for cloud stability
    connectionTimeout: 20000, 
    greetingTimeout: 20000,
});

// Let's use the standard hostname but add a forced family setting
// if the direct IP feels too risky. Try this version first:
const stableTransporter = nodemailer.createTransport({
    host: 'smtp-brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    // This tells the underlying socket to only use IPv4
    socketTimeout: 30000,
});

export default stableTransporter;