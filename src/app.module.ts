import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MerchantsModule } from './merchants/merchants.module';
import { MerchantsController } from './merchants/merchants.controller';
import { MerchantsService } from './merchants/merchants.service';

@Module({
  imports: [MerchantsModule],
  controllers: [AppController, MerchantsController],
  providers: [AppService, MerchantsService],
})
export class AppModule {}
