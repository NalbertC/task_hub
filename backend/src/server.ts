import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import { serverRoutes } from "./router";

dotenv.config();

const server = express();

//---- middleware---------------
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

server.use(serverRoutes);

server.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

// -----------------------------

server.get("/", (req, res) => {
  return res.json({ hello: "world!" });
});
//------------------------------
server.listen(process.env.API_PORT, () => {
  console.log(
    `Server running in ${process.env.API_HOST}:${process.env.API_PORT}`
  );
});
