import * as dotenv from 'dotenv'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

dotenv.config();

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const FRONT = process.env.FRONT || 3000
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
        `${FRONT}` //maybe for base front that can deal with this template
    ],
    methods: 'GET,PUT,POST,DELETE,PATCH',
    credentials: true,
  })

  const config = new DocumentBuilder()
      .setTitle('Docs for test_stripe')
      .setDescription('This is description of every endpoint available in that app')
      .setVersion('1.0.0')
      .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT, () =>
    console.log(`  [nest main] -> app started on http://localhost:${PORT}`, `\n  [nest main] -> docs started on http://localhost:${PORT}/api/docs`)
  );
}
bootstrap();
