import * as QR from '../qr.types';

export type QrGeneratorInput = QR.QrPaymentCreationInput;

export interface QrGeneratorCancellationInput
  extends Omit<QR.QrPaymentCancellationInput, 'payment_id' | 'payment_date'> {
  payment: {
    decidir_id: number;
    date: string;
  };
}

export type QrType = 'QRADQ';

export type QrOperation = 'payment';

export interface QrGeneratorScheme {
  type: QrType;
  operation: string;
  amount: number;
  cuit: string;
  installments: number;
  terminal_number: string;
  merchant_alias: string;
  establishments: Establishment[];
}

export interface Establishment {
  id: string;
  type: string;
  ticket_number: string;
  trace_number: string;
}
