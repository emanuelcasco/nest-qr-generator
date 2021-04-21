import * as IPrisma from './prisma.types';

export const BASE_PAYLOAD: IPrisma.QrGeneratorScheme = {
  type: 'QRADQ',
  operation: 'payment',
  amount: 500,
  cuit: '30-71682943-6',
  installments: 1,
  terminal_number: '00098712',
  merchant_alias: 'MERCHANT',
  establishments: [
    {
      id: '03659307',
      type: 'VISA',
      ticket_number: '131',
      trace_number: '1332',
    },
    {
      id: '41662941',
      type: 'MASTERCARD',
      ticket_number: '342',
      trace_number: '54335',
    },
    {
      id: '33442201',
      type: 'CABAL',
      ticket_number: '32523',
      trace_number: '54335',
    },
    {
      id: '8542868153',
      type: 'AMEX',
      ticket_number: '42',
      trace_number: '40',
    },
  ],
};
