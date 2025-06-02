import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateMerchantDto {
  @IsOptional() // Todos os campos são opcionais para atualização
  @IsString({ message: 'O nome deve ser uma string.' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
  name?: string; // O '?' indica que o campo é opcional no TypeScript

  @IsOptional()
  @IsEmail({}, { message: 'Por favor forneça um email válido.' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'O número deve ser uma string.' })
  documentNumber?: string;
}
