import { Injectable, NotFoundException } from '@nestjs/common';
import { Merchant } from './entities/merchant.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MerchantsService {
  private merchants: Merchant[] = []; // Nosso banco de dados em memória

  create(
    createMerchantDto: Omit<Merchant, 'id' | 'createdAt' | 'updatedAt'>,
  ): Merchant {
    const newMerchant: Merchant = {
      id: uuidv4(), // Gera um ID unico
      ...createMerchantDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.merchants.push(newMerchant);
    return newMerchant;
  }
  findAll(): Merchant[] {
    return this.merchants;
  }

  findOne(id: string): Merchant {
    const merchant = this.merchants.find((m) => m.id === id);
    if (!merchant) {
      throw new NotFoundException(`Merchant with ID "${id}" not found`);
    }
    return merchant;
  }

  update(
    id: string,
    updateMerchantDto: Partial<Omit<Merchant, 'id' | 'createdAt' | 'updateAt'>>,
  ): Merchant {
    const merchant = this.findOne(id); // Reutiliza o findOne para checar se existe
    const merchantIndex = this.merchants.findIndex((m) => m.id === id);

    const updatedMerchant = {
      ...merchant,
      ...updateMerchantDto,
      updatedAt: new Date(),
    };

    this.merchants[merchantIndex] = updatedMerchant;
    return updatedMerchant;
  }

  remove(id: string): void {
    const merchantIndex = this.merchants.findIndex((m) => m.id === id);
    if (merchantIndex === -1) {
      throw new NotFoundException(`Merchant with ID "${id}" not found`);
    }
    this.merchants.splice(merchantIndex, 1);
  }
}
