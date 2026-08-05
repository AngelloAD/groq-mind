import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from "@prisma/client";
export class UpdateUsuarioRolDto {
    @IsEnum(Role, { message: 'El rol debe ser "ADMIN" o "CLIENTE"' })
    @IsNotEmpty()
    rol!: Role;
}