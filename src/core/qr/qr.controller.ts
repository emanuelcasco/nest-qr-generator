import { Body, Controller, Param, Query, Res } from '@nestjs/common';
import * as Swagger from '@nestjs/swagger';
import { FastifyReply as Reply } from 'fastify';

import * as DTO from './dto';
import { QrService } from './qr.service';
import { Endpoint } from '../shared/endpoint.decorator';

@Swagger.ApiTags('QR Generator')
@Controller('/')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Endpoint({
    method: 'POST',
    path: '/qr/:provider',
    summary: 'Payment creation QR generator',
    response: {
      status: 201,
      description:
        'A new payment QR was succesfully created and the raw text is returned',
      type: String,
    },
  })
  async generateQr(
    @Param() { provider }: DTO.PaymentQrCreationParams,
    @Body() body: DTO.PaymentQrCreationBody,
  ): Promise<string> {
    return this.qrService.generatePaymentQr(provider, body);
  }

  @Endpoint({
    method: 'POST',
    path: '/qr/:provider/:operation',
    summary: 'Payment cancellation QR generator',
    response: {
      status: 201,
      description:
        'A new cancellation QR was succesfully created and the raw text is returned',
      type: String,
    },
  })
  async generateCancellationQr(
    @Param() { provider, operation }: DTO.PaymentQrCancellationParams,
    @Body() body: DTO.PaymentQrCancellationBody,
  ): Promise<string> {
    return this.qrService.generateCancellationQr(provider, operation, body);
  }

  @Endpoint({
    method: 'GET',
    path: '/qr_image',
    summary: 'Generates a QR image based on the raw text input provided.',
    response: {
      status: 200,
      description: 'Generated QR image.',
      type: String,
    },
  })
  async generateQrImage(@Query('raw_qr') rawQr: string, @Res() reply: Reply) {
    const stream = await this.qrService.generateQrImage(rawQr);
    reply.type('image/png');
    reply.send(stream);
  }
}
