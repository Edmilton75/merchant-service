import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { Merchant } from './entities/merchant.entity';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';

// Para simplificar, vamos definir os DTOs diretamente aqui por enquanto.
// O ideal é criar arquivos separados para eles em uma pasta 'dto'.
// class CreateMerchantDto {
//   name: string;
//   email: string;
//   documentNumber: string;
// }

// class UpdateMerchantDto {
//   name?: string;
//   email?: string;
//   documentNumber?: string;
// }

@Controller('merchants') // Define a rota base para este controller como /merchants
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMerchantDto: CreateMerchantDto): Merchant {
    // Aqui deveríamos usar class-validator para validar o DTO, mas faremos isso depois
    return this.merchantsService.create(createMerchantDto);
  }

  @Get()
  findAll(): Merchant[] {
    return this.merchantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Merchant {
    return this.merchantsService.findOne(id);
  }

  @Put(':id') // PUT geralmente substitui o recurso inteiro
  update(
    @Param('id') id: string,
    @Body() updateFullMerchantDto: CreateMerchantDto,
  ): Merchant {
    // Para PUT, esperamos todos os campos obrigatórios, similar ao Create DTO
    return this.merchantsService.update(id, updateFullMerchantDto);
  }

  // Alternativamente, poderíamos usar PATCH para atualizações parciais
  @Patch(':id')
  partialUpdate(
    @Param('id') id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ): Merchant {
    return this.merchantsService.update(id, updateMerchantDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    return this.merchantsService.remove(id);
  }
}
