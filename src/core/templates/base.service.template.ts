import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BaseService {
  readonly className = this.constructor.name;
  readonly logger = new Logger(this.className);

  constructor() {
    this.logger.debug(`Initialize ${this.className}`);
  }
}
