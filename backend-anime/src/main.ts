import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Asegúrate de no usar `app.use(passport.session());` si no necesitas sesiones

  await app.listen(3000);
}
bootstrap();
