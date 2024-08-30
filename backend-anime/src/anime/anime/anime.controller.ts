import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { Prisma, Anime } from '@prisma/client';

// anime.controller.ts
@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  // Obtener todos los animes
  @Get()
  async findAll(): Promise<Anime[]> {
    return this.animeService.findAllWithGenres();
  }

  // Obtener un anime por su ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Anime | null> {
    return this.animeService.findOne(id);
  }

  // Crear un nuevo anime con géneros
  @Post()
  async createAnimeWithGenres(
    @Body() data: { titulo: string; imagen: string; ano: number; capitulos: number; generoIds: number[] },
  ): Promise<Anime> {
    const { titulo, imagen, ano, capitulos, generoIds } = data;

    // Validar datos del anime
    if (!titulo || !imagen || !ano || !capitulos || !Array.isArray(generoIds)) {
      throw new BadRequestException('Datos del anime inválidos.');
    }

    // Crear el anime con los géneros
    return this.animeService.createAnimeWithGenres({ titulo, imagen, ano, capitulos }, generoIds);
  }

  // Actualizar un anime existente
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { titulo?: string; sinopsis?: string },
  ): Promise<Anime> {
    return this.animeService.update(id, data);
  }

  // Eliminar un anime por su ID
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Anime> {
    return this.animeService.remove(id);
  }

  // Asignar géneros a un anime
  @Post(':animeId/generos')
  async addGenresToAnime(
    @Param('animeId', ParseIntPipe) animeId: number,
    @Body('generoIds') generoIds: number[],
  ): Promise<Anime> {
    return this.animeService.addGenresToAnime(animeId, generoIds);
  }

  // Eliminar géneros de un anime
  @Delete(':animeId/generos')
  async removeGenresFromAnime(
    @Param('animeId', ParseIntPipe) animeId: number,
    @Body('generoIds') generoIds: number[],
  ): Promise<Anime> {
    return this.animeService.removeGenresFromAnime(animeId, generoIds);
  }
}

