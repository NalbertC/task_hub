import "dotenv/config";

export const authConfig = {
  secret: String(process.env.API_SECRET),
  expiresIn: "7d",
};
