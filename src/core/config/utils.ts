import { Type } from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export const validateBy = <TInput>(Validator: Type<TInput>) => (
  config: Record<string, unknown>,
) => {
  const validatedConfig = plainToClass(Validator, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig as any, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
