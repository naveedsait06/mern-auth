import axios from 'axios';

// We are exporting a named function called sendEmail
export const sendEmail = async (to, subject, otp) => {
    try {
        const response = await axios.post("https://api.brevo.com/v3/smtp/email", {
            sender: { name: "MERN Auth", email: process.env.SENDER_EMAIL },
            to: [{ email: to }],
            subject: subject,
            textContent: `Your verification OTP is: ${otp}`
        }, {
            headers: {
                "accept": "application/json",
                "api-key": process.env.BREVO_API_KEY,
                "content-type": "application/json"
            }
        });

        return response.data;
    } catch (error) {
        console.error("Brevo API Error:", error.response ? error.response.data : error.message);
    }
};