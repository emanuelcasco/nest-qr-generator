import { Injectable, Type } from '@nestjs/common';

import * as DTO from './dto';
import { QrProviders, QrCancellationOperation } from './qr.constants';

import { PrismaAdapter } from './prisma/prisma.adapter';
import { MercadoPagoAdapter } from './mercadopago/mercadopago.adapter';
import { QrProviderAdapterTemplate } from './templates/qr.adapter.template';

import { BaseService } from '../templates/base.service.template';
import { PropertyInjectorService } from '../shared/property-injector.service';
import { QrPrinterService } from '../shared/qr-printer.service';

const PROVIDERS_MAP = new Map<QrProviders, Type<QrProviderAdapterTemplate>>([
  [QrProviders.PRISMA, PrismaAdapter],
  [QrProviders.MERCADOPAGO, MercadoPagoAdapter],
]);

@Injectable()
export class QrService extends BaseService {
  constructor(
    private readonly qrPrinterService: QrPrinterService,
    private readonly propertyInjector: PropertyInjectorService<
      QrProviderAdapterTemplate,
      QrProviders
    >,
  ) {
    super();
  }

  /**
   * COMPLETE
   *
   * @usageNotes
   * COMPLETE
   *
   * @param err COMPLETE
   */
  private _setProvider(providerName: QrProviders) {
    return this.propertyInjector
      .setDictionary(PROVIDERS_MAP)
      .injectDependencyByProperty(providerName);
  }

  /**
   * COMPLETE
   *
   * @usageNotes
   * COMPLETE
   *
   * @param err COMPLETE
   */
  async generatePaymentQr(
    provider: QrProviders,
    input: DTO.PaymentQrCreationBody,
  ): Promise<string> {
    return this._setProvider(provider).generatePaymentQr(input);
  }

  /**
   * COMPLETE
   *
   * @usageNotes
   * COMPLETE
   *
   * @param err COMPLETE
   */
  async generateCancellationQr(
    provider: QrProviders,
    operation: QrCancellationOperation,
    input: DTO.PaymentQrCancellationBody,
  ): Promise<string> {
    return this._setProvider(provider).generateCancellationQr(input, operation);
  }

  /**
   * COMPLETE
   *
   * @usageNotes
   * COMPLETE
   *
   * @param err COMPLETE
   */
  async generateQrImage(rawQrText: string) {
    return this.qrPrinterService.fromString(rawQrText);
  }
}
