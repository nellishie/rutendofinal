import express, { type Express, type Request, type Response, type NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertGalleryImageSchema } from "@shared/schema";
import { sendContactEmail } from "./email";
import { generateCV } from "./cv-generator";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "public", "uploads", "gallery");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const multerStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

  const handleMulterError = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File size must be less than 5MB',
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    } else if (err) {
      if (err.message && err.message.includes('Only image files are allowed')) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      return res.status(500).json({
        success: false,
        message: 'An error occurred while uploading the file',
      });
    }
    next(err);
  };

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

  app.get("/api/gallery", async (req, res) => {
    try {
      const images = await storage.getAllGalleryImages();
      res.json({
        success: true,
        data: images,
      });
    } catch (error) {
      console.error("Gallery fetch error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch gallery images",
      });
    }
  });

  app.post("/api/gallery", upload.single('image'), handleMulterError, async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image file provided",
        });
      }

      const imageUrl = `/uploads/gallery/${req.file.filename}`;
      
      const description = req.body.description && req.body.description.trim() !== '' 
        ? req.body.description 
        : undefined;
      
      const validatedData = insertGalleryImageSchema.parse({
        title: req.body.title,
        imageUrl: imageUrl,
        description: description,
      });
      
      const image = await storage.createGalleryImage(validatedData);
      
      res.json({
        success: true,
        message: "Image added successfully!",
        data: image,
      });
    } catch (error) {
      if (req.file) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (unlinkError) {
          console.error("Failed to delete uploaded file after error:", unlinkError);
        }
      }
      
      console.error("Gallery upload error:", error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to upload image",
      });
    }
  });

  app.delete("/api/gallery/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const images = await storage.getAllGalleryImages();
      const image = images.find(img => img.id === id);
      
      if (image && image.imageUrl.startsWith('/uploads/gallery/')) {
        const filename = path.basename(image.imageUrl);
        const filePath = path.join(uploadDir, filename);
        
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (unlinkError) {
            console.error("Failed to delete image file:", unlinkError);
          }
        }
      }
      
      await storage.deleteGalleryImage(id);
      
      res.json({
        success: true,
        message: "Image deleted successfully!",
      });
    } catch (error) {
      console.error("Gallery delete error:", error);
      res.status(400).json({
        success: false,
        message: "Failed to delete image",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
