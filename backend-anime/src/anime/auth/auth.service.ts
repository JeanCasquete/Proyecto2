import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuarios/usuarios.service';
import { Usuario } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<Usuario | null> {
    const user = await this.usuarioService.obtenerUsuarioPorEmail(email);
    if (user && user.password === password) { // Recuerda usar hashing en producción
      const { password, ...result } = user;
      return result as Usuario;
    }
    return null;
  }
  

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
