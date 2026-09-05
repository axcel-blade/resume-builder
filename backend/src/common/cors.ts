import { INestApplication } from '@nestjs/common';

export function configureCORS(app: INestApplication) {
  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
}