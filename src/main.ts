import { NestFactory } from '@nestjs/core';
import * as FirebaseAdmin from 'firebase-admin';
import * as dotenv from 'dotenv';
dotenv.config();

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert({
      clientEmail: process.env.EMAIL,
      privateKey: process.env.KEY.replace(/\\n/g, '\n'),
      projectId: process.env.PROJECT_ID,
    }),
    databaseURL: process.env.FIREBASE_STORAGE_BUCKET,
  })

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
