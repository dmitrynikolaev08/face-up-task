import express from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { specs } from './interface/swagger/config';
import path from 'path';
import { reportRouter } from './interface/routes/reportRoutes';
import { institutionRouter } from './interface/routes/institutionRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.use('/api/reports', reportRouter);
app.use('/api/institutions', institutionRouter);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
  console.log(
    `API Documentation available at http://localhost:${PORT}/api-docs`,
  );
});
