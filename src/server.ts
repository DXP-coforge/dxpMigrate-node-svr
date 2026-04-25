import 'reflect-metadata'; // 🔥 MUST be first

import express from 'express';
import rateLimit from 'express-rate-limit';
import { container } from 'tsyringe';
import multer from "multer";
import { bootstrapDI } from './bootstrap/di.js';
import { MigrationController } from './server/MigrationController.js';
//import { apiKeyAuth } from './middleware/auth.js';

await bootstrapDI(container);

const controller = container.resolve(MigrationController);

const app = express();

app.use(express.json({ limit: '5mb' }));

app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 10
}));

const upload = multer({
  storage: multer.memoryStorage(), // store in memory (SaaS friendly)
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

app.post(
  "/migrate",
  //apiKeyAuth,
  upload.fields([
    { name: "mapping", maxCount: 1 },
    { name: "source", maxCount: 1 }
  ]),
  async (req, res) => {
    await controller.migrate(req, res);
  }
);

app.listen(3000, () => {
  console.log('Migration server started');
});
