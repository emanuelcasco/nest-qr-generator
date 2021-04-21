import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { QrCancellationOperation, QrProviders } from '../qr.constants';

import { composeDecorators } from '../../utils/decorators';

const ApiPropertyEnum = (description, enumList) =>
  composeDecorators(
    ApiProperty({
      description,
      example: enumList[0],
      enum: enumList,
    }),
    IsEnum(enumList),
  );

export class PaymentQrCreationParams {
  @ApiPropertyEnum('QR provider.', Object.values(QrProviders))
  provider: QrProviders;
}

export class PaymentQrCancellationParams extends PaymentQrCreationParams {
  @ApiPropertyEnum(
    'QR cancellation operation.',
    Object.values(QrCancellationOperation),
  )
  operation: QrCancellationOperation;
}
