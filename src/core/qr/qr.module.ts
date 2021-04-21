import { Module } from '@nestjs/common';

import { QrController } from './qr.controller';
import { QrService } from './qr.service';
import { PrismaAdapter, PrismaClient } from './prisma';
import { MercadoPagoAdapter, MercadoPagoClient } from './mercadopago';

import { PropertyInjectorService } from '../shared/property-injector.service';
import { QrPrinterService } from '../shared/qr-printer.service';
import { ConfigModule } from '@nestjs/config';
import * as Config from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Config.QrConfig],
      validate: Config.validateBy(Config.QrConfigValidator),
    }),
  ],
  controllers: [QrController],
  providers: [
    PrismaAdapter,
    PrismaClient,
    PropertyInjectorService,
    QrService,
    QrPrinterService,
    MercadoPagoAdapter,
    MercadoPagoClient,
  ],
})
export class QrGeneratorModule {}
