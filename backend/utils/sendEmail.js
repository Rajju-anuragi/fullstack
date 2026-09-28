const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: `"Shopnow" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        };
        const info = await transporter.sendMail(mailOptions);
    }

    catch (error) {
        console.error("Email send failed:", error.message);
        throw error;
    }
};
module.exports = sendEmail;