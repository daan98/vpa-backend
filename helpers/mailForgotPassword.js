import nodemailer from "nodemailer";

const mailForgotPassword = async (data) => {
  const { email, name, token } = data;

  let transporter = nodemailer.createTransport({
    host: `${process.env.EMAIL_HOST}`,
    port: process.env.EMAIL_PORT,
    auth: {
      user: `${process.env.EMAIL_USER}`,
      pass: `${process.env.EMAIL_PASS}`,
    },
  });

  let message = {
    from: "mail@mail.com",
    to: email,
    subject: "Restore password",
    text: "Follow the instructions to restore the password",
    html: ` <p>Hello ${name}!!, please, to restore your password click the bottom below</p>
                
                <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Confirm account</a>

                <p>If you are not the owner of this account, please ignore this message</p>`,
  };

  const info = await transporter.sendMail(message);
};

export default mailForgotPassword;
