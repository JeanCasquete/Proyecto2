import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { Prisma, Usuario } from '@prisma/client';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  obtenerUsuarios(): Promise<Usuario[]> {
    return this.usuarioService.obtenerUsuarios();
  }

  @Get(':id')
  obtenerUsuarioPorId(@Param('id') id: string): Promise<Usuario | null> {
    return this.usuarioService.obtenerUsuarioPorId(+id);
  }

  @Post()
  crearUsuario(@Body() data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    return this.usuarioService.crearUsuario(data);
  }

  @Put(':id')
  actualizarUsuario(
    @Param('id') id: string,
    @Body() data: Prisma.UsuarioUpdateInput,
  ): Promise<Usuario> {
    return this.usuarioService.actualizarUsuario(+id, data);
  }

  @Delete(':id')
  eliminarUsuario(@Param('id') id: string): Promise<Usuario> {
    return this.usuarioService.eliminarUsuario(+id);
  }
}
