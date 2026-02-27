import { type AppointmentRequest } from "@shared/schema";

export interface IStorage {
  createAppointment(appointment: AppointmentRequest): Promise<AppointmentRequest>;
  getAppointments(): Promise<AppointmentRequest[]>;
}

export class MemStorage implements IStorage {
  private appointments: AppointmentRequest[];

  constructor() {
    this.appointments = [];
  }

  async createAppointment(appointment: AppointmentRequest): Promise<AppointmentRequest> {
    this.appointments.push(appointment);
    return appointment;
  }

  async getAppointments(): Promise<AppointmentRequest[]> {
    return this.appointments;
  }
}

export const storage = new MemStorage();