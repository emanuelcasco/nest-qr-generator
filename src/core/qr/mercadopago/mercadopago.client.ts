import { Injectable } from '@nestjs/common';

import * as MercadoPago from './mercadopago.types';
import * as constants from './mercadopago.constants';
import HttpService from '../../shared/http.service';

@Injectable()
export class MercadoPagoClient {
  readonly httpClient: HttpService;

  constructor() {
    this.httpClient = new HttpService({
      baseURL: 'https://api.mercadopago.com',
      params: {
        access_token:
          'TEST-7107640402407041-120316-57e6634de174da3efc66ca7517027c32-663678069',
      },
    });
  }

  getStaticQrCollection() {
    return constants.STATIC_QR_SET;
  }

  getRawQrByPosId(posId: string) {
    return constants.STATIC_QR_SET[posId];
  }

  async generatePaymentIntention(
    posId: string,
    items: MercadoPago.PurchaseItem[],
  ) {
    return await this.httpClient.makeRequest({
      data: { items },
      method: 'POST',
      url: `/mpmobile/beta/instore/qr/${posId}`,
    });
  }
}
