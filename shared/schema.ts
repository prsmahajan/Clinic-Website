import { z } from "zod";

export const appointmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  age: z.string().min(1, "Please enter patient age"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  message: z.string().optional(),
});

export type AppointmentRequest = z.infer<typeof appointmentSchema>;