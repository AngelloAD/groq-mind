import { Controller, Post, Body, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { IaService } from './ia.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('ia')
@UseGuards(AuthGuard) 
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Post('preguntar')
  async preguntar(@Body('prompt') prompt: string) {
    if (!prompt) {
      throw new HttpException('El campo "prompt" es requerido', HttpStatus.BAD_REQUEST);
    }
    return this.iaService.generarTexto(prompt);
  }
}