// We are going to use a simple fetch request to bypass all port blocks
export const sendEmail = async (to, subject, otp) => {
    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "api-key": process.env.BREVO_API_KEY, // Use your regular API Key here
                "content-type": "application/json"
            },
            body: JSON.stringify({
                sender: { name: "MERN Auth", email: process.env.SENDER_EMAIL },
                to: [{ email: to }],
                subject: subject,
                textContent: `Your verification OTP is: ${otp}`
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("API Error:", error.message);
    }
}