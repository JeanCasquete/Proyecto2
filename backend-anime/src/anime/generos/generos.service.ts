// genero.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service'; // Asegúrate de tener un PrismaService en tu proyecto
import { Genero, Prisma } from '@prisma/client';

@Injectable()
export class GeneroService {
  constructor(private readonly prisma: PrismaService) {}

  // Obtener todos los géneros
  async findAll(): Promise<Genero[]> {
    return this.prisma.genero.findMany();
  }

  // Obtener un género por su ID
  async findOne(id: number): Promise<Genero | null> {
    return this.prisma.genero.findUnique({
      where: { id },
    });
  }

  // Crear un nuevo género
  async create(data: Prisma.GeneroCreateInput): Promise<Genero> {
    return this.prisma.genero.create({
      data,
    });
  }

  // Actualizar un género existente
  async update(id: number, data: Prisma.GeneroUpdateInput): Promise<Genero> {
    return this.prisma.genero.update({
      where: { id },
      data,
    });
  }

  // Eliminar un género por su ID
  async remove(id: number): Promise<Genero> {
    return this.prisma.genero.delete({
      where: { id },
    });
  }
}
