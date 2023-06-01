import nodemailer from "nodemailer";

const sendEmail = async (data) => {
    const { email, name, token } = data;

    let transporter = nodemailer.createTransport({
        host: `${process.env.EMAIL_HOST}`,
        port: process.env.EMAIL_PORT,
        auth: {
            user: `${process.env.EMAIL_USER}`,
            pass: `${process.env.EMAIL_PASS}`
        }
    });

    let message  = {
        from: "mail@mail.com",
        to: email,
        subject: "Confirm your email",
        text: "Please confirm your email",
        html: ` <p>Hello ${name}!! you are close to finish your sing up process</p>
                <p>Please to confirm your account click the bottom below</p>
                
                <a href="${process.env.EMAIL_URL}/${token}">Confirm account</a>
                
                <p>If you are not the owner of this account, please ignore this message</p>`
    };

    const info = await transporter.sendMail(message);
};

export default sendEmail;