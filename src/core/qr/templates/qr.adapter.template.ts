import { Injectable } from '@nestjs/common';
import { QrCancellationOperation } from '../qr.constants';

import {
  QrPaymentCreationInput,
  QrPaymentCancellationInput,
} from '../qr.types';

@Injectable()
export abstract class QrProviderAdapterTemplate {
  abstract generatePaymentQr(input: QrPaymentCreationInput): Promise<string>;

  abstract generateCancellationQr(
    input: QrPaymentCancellationInput,
    operation: QrCancellationOperation,
  ): Promise<string>;
}

export class QrImageGenerator {
  async generateQrImage(input: string): Promise<any> {
    return Promise.resolve(input);
  }
}
