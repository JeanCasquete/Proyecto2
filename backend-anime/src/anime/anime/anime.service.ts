// anime.service.ts

import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service'; // Asegúrate de tener un PrismaService en tu proyecto
import { Anime, Prisma } from '@prisma/client';

@Injectable()
export class AnimeService {
  constructor(private readonly prisma: PrismaService) {}

  // Obtener todos los animes
  async findAll(): Promise<Anime[]> {
    return this.prisma.anime.findMany({
      include: {
        generos: true, // Incluye los géneros relacionados
      },
    });
  }

  // Obtener un anime por su ID
  async findOne(id: number): Promise<Anime | null> {
    return this.prisma.anime.findUnique({
      where: { id },
      include: {
        generos: true, // Incluye los géneros relacionados
      },
    });
  }

  // Crear un nuevo anime
  async create(data: Prisma.AnimeCreateInput): Promise<Anime> {
    return this.prisma.anime.create({
      data,
    });
  }

  // Actualizar un anime existente
  async update(id: number, data: Prisma.AnimeUpdateInput): Promise<Anime> {
    return this.prisma.anime.update({
      where: { id },
      data,
    });
  }

  // Eliminar un anime por su ID
  async remove(id: number): Promise<Anime> {
    return this.prisma.anime.delete({
      where: { id },
    });
  }

  async createAnimeWithGenres(data: Prisma.AnimeCreateInput, generoIds: number[]): Promise<Anime> {
    // Validar que los géneros existan
    const validGeneros = await this.prisma.genero.findMany({
      where: {
        id: { in: generoIds },
      },
    });

    if (validGeneros.length !== generoIds.length) {
      throw new BadRequestException('Uno o más géneros proporcionados no existen.');
    }

    // Paso 1: Crear el anime sin géneros
    const createdAnime = await this.prisma.anime.create({
      data,
    });

    // Paso 2: Asignar los géneros al anime usando el método existente
    await this.addGenresToAnime(createdAnime.id, generoIds);

    // Devuelve el anime con los géneros conectados
    return this.prisma.anime.findUnique({
      where: { id: createdAnime.id },
      include: { generos: true },
    });
  }

  // Asignar géneros a un anime
  async addGenresToAnime(animeId: number, generoIds: number[]): Promise<Anime> {
    return this.prisma.anime.update({
      where: { id: animeId },
      data: {
        generos: {
          create: generoIds.map(generoId => ({
            genero: {
              connect: { id: generoId },
            },
          })),
        },
      },
      include: {
        generos: true,
      },
    });
  }

  // Eliminar géneros de un anime
  async removeGenresFromAnime(animeId: number, generoIds: number[]): Promise<Anime> {
    return this.prisma.anime.update({
      where: { id: animeId },
      data: {
        generos: {
          deleteMany: generoIds.map(generoId => ({
            generoId,
            animeId,
          })),
        },
      },
      include: {
        generos: true,
      },
    });
  }

  async findAllWithGenres(): Promise<any[]> {
    return this.prisma.anime.findMany({
      select: {
        id: true,
        titulo: true,
        imagen: true,
        ano: true,
        capitulos: true,
        generos: {
          select: {
            genero: {
              select: {
                nombre: true,
              },
            },
          },
        },
      },
    });
  }
}

