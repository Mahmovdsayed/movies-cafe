import nodemailer from "nodemailer";

const sendEmailService = async ({
  to = "",
  subject = "no-reply",
  message = "<h1>no-message</h1>",
  attachments = [],
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      requireTLS: true,
      tls: {
        rejectUnauthorized: true,
      },
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `Movies Cafe <${process.env.EMAIL}>`,
      to,
      subject,
      html: message,
      attachments,
    });

    return info.accepted.length ? true : false;
  } catch (error) {
    return false;
  }
};

export default sendEmailService;
