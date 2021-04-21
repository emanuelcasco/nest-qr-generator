import * as DTO from './dto';

export type { QrCancellationOperation } from './qr.constants';
export type { QrProviders } from './qr.constants';

export type QrPaymentCreationInput = Omit<
  DTO.PaymentQrCreationBody,
  'provider'
>;

export type QrPaymentCancellationInput = Omit<
  DTO.PaymentQrCancellationBody,
  'provider'
>;
