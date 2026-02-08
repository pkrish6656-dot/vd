import { responses, type Response, type InsertResponse } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createResponse(response: InsertResponse): Promise<Response>;
}

export class DatabaseStorage implements IStorage {
  async createResponse(insertResponse: InsertResponse): Promise<Response> {
    const [result] = await db.insert(responses).values(insertResponse).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
