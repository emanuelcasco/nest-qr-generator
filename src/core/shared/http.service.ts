import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

@Injectable()
export default class HttpService {
  readonly client: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.client = axios.create(config);
  }

  async makeRequest<T>(input: AxiosRequestConfig): Promise<T> {
    const { data } = await this.client(input);
    return data;
  }
}
