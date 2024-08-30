// genero.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { GeneroService } from './generos.service';
import { Genero } from '@prisma/client';

@Controller('genero')
export class GeneroController {
  constructor(private readonly generoService: GeneroService) {}

  // Obtener todos los géneros
  @Get()
  async findAll(): Promise<Genero[]> {
    return this.generoService.findAll();
  }

  // Obtener un género por su ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Genero | null> {
    return this.generoService.findOne(id);
  }

  // Crear un nuevo género
  @Post()
  async create(@Body() data: { nombre: string }): Promise<Genero> {
    return this.generoService.create(data);
  }

  // Actualizar un género existente
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { nombre?: string },
  ): Promise<Genero> {
    return this.generoService.update(id, data);
  }

  // Eliminar un género por su ID
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Genero> {
    return this.generoService.remove(id);
  }
}
