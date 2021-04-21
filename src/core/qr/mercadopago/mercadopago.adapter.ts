import { Injectable, NotImplementedException } from '@nestjs/common';

import { MercadoPagoClient } from './mercadopago.client';
import { QrGeneratorInput } from './mercadopago.types';

import { QrProviderAdapterTemplate } from '../templates/qr.adapter.template';

import { BaseService } from '../../templates/base.service.template';
import { randomValueBetween } from '../../utils/math';

@Injectable()
export class MercadoPagoAdapter
  extends BaseService
  implements QrProviderAdapterTemplate {
  constructor(private readonly mercadoPagoClient: MercadoPagoClient) {
    super();
  }

  _getRandomElementFromStaticQrCollection() {
    const getStaticQrCollection = this.mercadoPagoClient.getStaticQrCollection();
    const index = randomValueBetween(getStaticQrCollection.length - 1, 0);
    return getStaticQrCollection[index];
  }

  _generateItems({ amount }: { amount: number }) {
    return [{ title: 'Product item', unit_price: amount, quantity: 1 }];
  }

  /**
   * Serialize input for MERCADOPAGO client, to make QR creation request and retrieves the
   * generated QR.
   *
   * @example
   * `generatePaymentQr({ amount: 100, installments: 1 });`
   *
   * @usageNotes
   * Generally, you'll want to use this component directly from `QrService` indicating "MERCADOPAGO"
   * as provider.
   *
   * @param input QR payment creation input to be serialized for MERCADOPAGO.
   * @returns MERCADOPAGO payment QR.
   */
  async generatePaymentQr(input: QrGeneratorInput): Promise<string> {
    const [posId, rawQr] = this._getRandomElementFromStaticQrCollection();
    await this.mercadoPagoClient.generatePaymentIntention(
      posId,
      this._generateItems(input),
    );
    return rawQr;
  }

  /**
   * Cancellation QR is not available on MERCADOPAGO.
   */
  generateCancellationQr(): Promise<string> {
    throw new NotImplementedException();
  }
}
