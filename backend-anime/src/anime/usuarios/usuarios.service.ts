import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma, Usuario } from '@prisma/client';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  // Obtener todos los usuarios
  async obtenerUsuarios(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  // Obtener un usuario por su ID
  async obtenerUsuarioPorId(id: number): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }

  // Obtener un usuario por su email
// Obtener un usuario por su email
async obtenerUsuarioPorEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { email },
      // Incluye todos los campos, incluyendo 'password'
      select: {
        id: true,
        nombre: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  

  // Crear un nuevo usuario
  async crearUsuario(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    return this.prisma.usuario.create({
      data,
    });
  }

  // Actualizar un usuario existente
  async actualizarUsuario(id: number, data: Prisma.UsuarioUpdateInput): Promise<Usuario> {
    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  // Eliminar un usuario
  async eliminarUsuario(id: number): Promise<Usuario> {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}
