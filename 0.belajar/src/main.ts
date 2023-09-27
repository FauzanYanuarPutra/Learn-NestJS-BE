import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks/tasks.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(TasksModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(7000);
}
bootstrap();
