import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { IaModule } from './ia/ia.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsuariosModule, PrismaModule, AuthModule, IaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
