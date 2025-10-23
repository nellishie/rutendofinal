import nodemailer from "nodemailer";
import type { InsertContactMessage } from "@shared/schema";

export async function sendContactEmail(message: InsertContactMessage): Promise<void> {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn("Email credentials not configured. Message saved but not sent.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER || "rutendochingamuka4@gmail.com",
    to: "rutendochingamuka4@gmail.com",
    replyTo: message.email,
    subject: `Portfolio Contact: Message from ${message.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #14B8A6; border-bottom: 2px solid #14B8A6; padding-bottom: 10px;">
          New Contact Message
        </h2>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 8px;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${message.name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${message.email}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Message:</strong></p>
          <div style="padding: 15px; background-color: #ffffff; border-left: 4px solid #14B8A6; border-radius: 4px;">
            ${message.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="color: #666; font-size: 12px;">
          This message was sent from your portfolio website contact form.
        </p>
      </div>
    `,
    text: `
New Contact Message

Name: ${message.name}
Email: ${message.email}

Message:
${message.message}

---
This message was sent from your portfolio website contact form.
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent for contact from ${message.name} (${message.email})`);
  } catch (error) {
    console.error("Error sending email:", error);
    if (error instanceof Error && error.message.includes('Invalid login')) {
      console.error("Gmail authentication failed. Please ensure EMAIL_PASSWORD is a Gmail App Password, not your regular Gmail password.");
      console.error("To create an App Password: Google Account > Security > 2-Step Verification > App passwords");
    }
    throw new Error("Failed to send email. Please verify your email configuration.");
  }
}
