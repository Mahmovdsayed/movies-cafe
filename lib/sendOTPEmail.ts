import nodemailer from "nodemailer";

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTPEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Movies Cafe <${process.env.EMAIL}>`,
    to: email,
    subject: "Your OTP for Verification",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #333333; text-align: center; font-size: 16px;">Your OTP for Verification</h1>
          <p style="color: #555555; font-size: 13px; text-align: center;">Please use the following OTP to verify your email address:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; background-color: #000000; color: #ffffff; font-size: 20px; font-weight: bold; padding: 10px 25px; border-radius: 5px;">
              ${otp}
            </span>
          </div>
          <p style="color: #555555; font-size: 13px; text-align: center;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://www.instagram.com/nest.dev/" target="_blank" style="display: inline-block;  text-decoration: none; padding: 5px 10px; border-radius: 5px; font-size: 13px;">
              © ${new Date().getFullYear()} Nest.dev . All rights reserved.
            </a>
          </div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export { sendOTPEmail, generateOTP };
