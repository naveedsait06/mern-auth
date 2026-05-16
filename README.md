# 🛡️ Secure Systems - MERN Auth

A professional, full-stack authentication architecture built with **MongoDB, Express, React, and Node.js**.
🔴 [Click Here to View the Live Project](https://mern-auth-1-kl59.onrender.com)

## 📖 About the Project

In an era where security is non-negotiable, **Secure Systems** provides a robust, scalable blueprint for user authentication. This project isn't just a login form; it's a complete identity management flow featuring real-time email verification and a premium user experience.

It utilizes a **Dual-Tier OTP System**, where the backend generates cryptographically secure tokens and delivers them via automated SMTP relays, ensuring that only verified users can access the command center.

## ✨ Key Features

*   **Automated OTP Verification**: Integrated with Brevo (formerly Sendinblue) to send 6-digit verification codes instantly upon registration.
*   **Intelligent Route Guarding**: Custom logic that automatically redirects users based on their authentication and verification status.
*   **Bento-Style Dashboard**: A high-end, responsive "Command Center" UI built with Tailwind CSS and glassmorphism effects.
*   **Secure Session Management**: Uses JWT (JSON Web Tokens) stored in HTTP-only cookies for a seamless and secure login experience.
*   **Password Recovery Flow**: A complete end-to-end reset password system with email-based authentication.

## 🛠️ Technical Implementation

This project was built to demonstrate proficiency in:
*   **Full-Stack Architecture**: Coordinating a React frontend with a Node/Express backend using Axios and Cross-Origin Resource Sharing (CORS).
*   **State Management**: Utilizing React Context API to manage global user state and authentication status across the entire app.
*   **Database Schema Design**: Structuring MongoDB models with Mongoose to handle user data, verification tokens, and password reset logic.
*   **Advanced UI/UX**: Implementing `framer-motion` (optional) and Tailwind CSS for shimmering headlines and smooth transitions.

## 🚀 How to Use

1.  **Register**: Create a new account using a valid email address.
2.  **Verify**: Check your inbox for the automated 6-digit OTP and enter it to verify your account.
3.  **Explore**: Access the Secure Dashboard to view your personalized user data.
4.  **Security Test**: Attempt to access `/dashboard` while logged out to see the bouncer logic in action.