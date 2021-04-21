import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';

import { PrismaClient } from './prisma.client';

import { QrProviderAdapterTemplate } from '../templates/qr.adapter.template';
import * as IQr from '../qr.types';
import { QrCancellationOperation } from '../qr.constants';

import { BaseService } from '../../templates/base.service.template';

@Injectable()
export class PrismaAdapter
  extends BaseService
  implements QrProviderAdapterTemplate {
  constructor(private readonly prismaClient: PrismaClient) {
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
  private _handlePrismaError(err): never {
    this.logger.error(err);
    if (err.isAxiosError && err.response.status === HttpStatus.BAD_REQUEST) {
      throw new BadRequestException();
    }
    throw new ServiceUnavailableException();
  }

  private _serializePayload(
    input: IQr.QrPaymentCancellationInput,
    operation: IQr.QrCancellationOperation,
  ) {
    return {
      ...input,
      operation: {
        [QrCancellationOperation.ANNULMENT]: 'annulment',
        [QrCancellationOperation.REFUND]: 'refund',
      }[operation],
      payment: {
        decidir_id: Number(input.payment_id),
        date: input.payment_date,
      },
    };
  }

  /**
   * Serialize input for PRISMA client, make the request to create a payment QR and retrieves the
   * generated QR.
   *
   * @example
   * `generatePaymentQr({ amount: 100, installments: 1 });`
   *
   * @usageNotes
   * Generally, you'll want to use this component directly from `QrService` indicating "PRISMA"
   * as provider.
   *
   * @param input QR payment creation input to be serialized for PRISMA.
   * @returns PRISMA payment QR.
   */
  async generatePaymentQr(input: IQr.QrPaymentCreationInput): Promise<string> {
    try {
      return await this.prismaClient.generateQr(input);
    } catch (err) {
      return this._handlePrismaError(err);
    }
  }

  /**
   * Serialize input for PRISMA client, make the request to create a cancellation QR and retrieves the
   * generated QR.
   *
   * @example
   * `generateCancellationQr({ amount: 100, installments: 1, payment_id: 123456, payment_date: '2021-12-31' });`
   *
   * @usageNotes
   * Generally, you'll want to use this component directly from `QrService` indicating "PRISMA"
   * as provider.
   *
   * @param input QR payment cancellation input to be serialized for PRISMA.
   * @returns PRISMA payment QR.
   */
  async generateCancellationQr(
    input: IQr.QrPaymentCancellationInput,
    operation: IQr.QrCancellationOperation,
  ): Promise<string> {
    try {
      const payload = this._serializePayload(input, operation);
      return await this.prismaClient.generateCancellationQr(payload);
    } catch (err) {
      return this._handlePrismaError(err);
    }
  }
}
