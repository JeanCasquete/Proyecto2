import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '../prisma/prisma.service'; // Ajusta la ruta según tu estructura
import { AnimeController } from './anime/anime/anime.controller';
import { AnimeService } from './anime/anime/anime.service';
import { UsuarioController } from './anime/usuarios/usuarios.controller';
import { UsuarioService } from './anime/usuarios/usuarios.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './anime/auth/auth.controller';
import { AuthService } from './anime/auth/auth.service';
import { LocalStrategy } from './anime/auth/local.strategy';
import { JwtStrategy } from './anime/auth/jwt.strategy';
import { GeneroController } from './anime/generos/generos.controller';
import { GeneroService } from './anime/generos/generos.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga las variables de entorno
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [
    AppController,
    AnimeController,
    UsuarioController,
    AuthController,
    GeneroController
  ],
  providers: [
    AppService,
    PrismaService, // Agrega PrismaService aquí
    AnimeService,
    UsuarioService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GeneroService
  ],
})
export class AppModule {}
