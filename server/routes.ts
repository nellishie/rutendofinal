import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { sendContactEmail } from "./email";
import { generateCV } from "./cv-generator";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
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

  app.get("/api/download-cv", (req, res) => {
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

  const httpServer = createServer(app);

  return httpServer;
}
