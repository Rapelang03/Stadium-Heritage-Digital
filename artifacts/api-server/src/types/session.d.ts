import "express-session";

declare module "express-session" {
  interface SessionData {
    userId: number;
    role: "member" | "admin";
    name: string;
  }
}
