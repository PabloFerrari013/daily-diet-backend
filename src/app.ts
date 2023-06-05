import cors from "cors";
import express from "express";
import { router } from "./http/router";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(cors());
