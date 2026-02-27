import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { appointmentSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/appointments", async (req, res) => {
    try {
      const parsed = appointmentSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
      }
      const appointment = await storage.createAppointment(parsed.data);
      return res.status(201).json(appointment);
    } catch (error) {
      return res.status(500).json({ error: "Failed to submit appointment" });
    }
  });

  return httpServer;
}