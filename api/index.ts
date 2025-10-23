import express, { type Request, Response } from "express";
import { storage } from "../server/storage";
import { insertContactMessageSchema } from "../shared/schema";
import { sendContactEmail } from "../server/email";
import { generateCV } from "../server/cv-generator";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Contact form endpoint
app.post("/api/contact", async (req: Request, res: Response) => {
  try {
    const validatedData = insertContactMessageSchema.parse(req.body);
    
    const message = await storage.createContactMessage(validatedData);
    
    try {
      await sendContactEmail(validatedData);
      res.json({
        success: true,
        message: "Message sent successfully! I'll get back to you soon.",
        data: message,
      });
    } catch (emailError) {
      console.error("Email delivery failed, but message was saved:", emailError);
      res.json({
        success: true,
        message: "Message received! There was an issue with email delivery, but your message has been saved.",
        data: message,
        emailDeliveryFailed: true,
      });
    }
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to process your message",
    });
  }
});

// CV download endpoint
app.get("/api/download-cv", (req: Request, res: Response) => {
  try {
    const cvContent = generateCV();
    
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename="Rutendo_Chingamuka_CV.txt"');
    res.send(cvContent);
  } catch (error) {
    console.error("CV download error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate CV",
    });
  }
});

// Export for Vercel serverless function
export default app;
