import { Injectable } from '@nestjs/common';

import * as qr from 'qr-image';

@Injectable()
export class QrPrinterService {
  async fromString(rawQrText: string) {
    return qr.image(rawQrText);
  }
}
