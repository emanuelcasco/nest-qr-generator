import { ConfigType, registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';

export class QrConfigValidator {
  @IsString()
  @IsNotEmpty()
  MERCADOPAGO_BASE_URL: string;

  @IsString()
  @IsNotEmpty()
  MERCADOPAGO_ACCESS_TOKEN: string;

  @IsString()
  @IsNotEmpty()
  PRISMA_BASE_URL: string;
}

export const QrConfig = registerAs('QR_CONFIG_KEY', () => ({
  mercadopago: {
    baseUrl: process.env.MERCADOPAGO_BASE_URL,
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  },
  prisma: {
    baseUrl: process.env.PRISMA_BASE_URL,
  },
}));

export type QrConfig = ConfigType<typeof QrConfig>;
