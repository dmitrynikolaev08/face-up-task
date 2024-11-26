import express from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { specs } from './interface/swagger/config';
import { userRouter } from './interface/routes/userRoutes';
import { notificationRouter } from './interface/routes/notificationRoutes';

dotenv.config();

const app = express();
app.use(json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.use('/api/users', userRouter);
app.use('/api/notifications', notificationRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
  console.log(
    `API Documentation available at http://localhost:${PORT}/api-docs`,
  );
});
