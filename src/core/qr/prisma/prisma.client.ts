import { Inject, Injectable } from '@nestjs/common';
import { mergeDeepRight } from 'ramda';

import * as IPrisma from './prisma.types';
import * as constants from './prisma.constants';

import { QrConfig } from '../../config';
import HttpService from '../../shared/http.service';

@Injectable()
export class PrismaClient {
  readonly httpClient: HttpService;

  constructor(
    @Inject(QrConfig.KEY)
    private readonly config: QrConfig,
  ) {
    this.httpClient = new HttpService({
      baseURL: this.config.prisma.baseUrl,
    });
  }

  async generateQr(input: IPrisma.QrGeneratorInput): Promise<string> {
    const { text } = await this.httpClient.makeRequest<{ text: string }>({
      data: mergeDeepRight(constants.BASE_PAYLOAD, input),
      method: 'POST',
      url: '/qr',
    });

    return text;
  }

  async generateCancellationQr(
    input: IPrisma.QrGeneratorCancellationInput,
  ): Promise<string> {
    const { text } = await this.httpClient.makeRequest<{ text: string }>({
      data: mergeDeepRight(constants.BASE_PAYLOAD, input),
      method: 'POST',
      url: '/qr',
    });

    return text;
  }
}
