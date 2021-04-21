import * as QR from '../qr.types';

export type QrGeneratorInput = QR.QrPaymentCreationInput;

export interface PurchaseItem {
  title: string;
  unit_price: number;
  quantity: number;
}

export type PurchaseIntentionInput = PurchaseItem[];
