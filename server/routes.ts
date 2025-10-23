import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { sendContactEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      const message = await storage.createContactMessage(validatedData);
      
      try {
        await sendContactEmail(validatedData);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
      
      res.json({
        success: true,
        message: "Message sent successfully",
        data: message,
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to send message",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
