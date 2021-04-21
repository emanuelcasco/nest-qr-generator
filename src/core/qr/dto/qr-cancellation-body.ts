import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { PaymentQrCreationBody } from './qr-creation-body';

export class PaymentQrCancellationBody extends PaymentQrCreationBody {
  @ApiProperty({
    description: 'Provider payment ID',
    example: 321456,
  })
  @IsNumber()
  @IsNotEmpty()
  payment_id: string;

  @ApiProperty({
    description: 'Payment operation date. Format: "YYYY-MM-DD".',
    example: '2021-02-23',
  })
  @IsString()
  @IsNotEmpty()
  payment_date: string;
}
