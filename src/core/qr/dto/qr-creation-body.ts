import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaymentQrCreationBody {
  @ApiProperty({ example: 99.99, description: 'Payment amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 12, description: 'Payment installments' })
  @IsNumber()
  installments: number;

  @ApiProperty({
    example: 'MERCHANT',
    description: 'Merchant name. Defaults to "MERCHANT"',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  merchant_alias?: string;
}
