import nodemailer from 'nodemailer';
import dns from 'dns'; // Add this import

const transporter = nodemailer.createTransport({
    host: 'smtp-brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    // Force IPv4 using the family: 4 setting
    dnsLookup: (hostname, options, callback) => {
        dns.lookup(hostname, { family: 4 }, callback);
    }
});

export default transporter;