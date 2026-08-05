import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from "@prisma/client";
export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    email!: string;

    @IsEnum(Role, { message: 'El rol debe ser "ADMIN" o "CLIENTE"' })
    @IsNotEmpty()
    rol!: Role;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password!: string;
}
