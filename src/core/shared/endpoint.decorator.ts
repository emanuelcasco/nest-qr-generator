import { Get, Post, Put, Patch, Delete } from '@nestjs/common';
import * as Swagger from '@nestjs/swagger';

import { composeDecorators } from '../utils/decorators';

const MethodMapper = {
  POST: Post,
  PUT: Put,
  PATCH: Patch,
  DELETE: Delete,
  GET: Get,
};

export interface EndpointOptions {
  method: keyof typeof MethodMapper;
  path: string;
  summary: string;
  response: Swagger.ApiResponseOptions;
}

export function Endpoint(options: EndpointOptions) {
  return composeDecorators(
    MethodMapper[options.method](options.path),
    Swagger.ApiOperation({ summary: options.summary }),
    Swagger.ApiResponse(options.response),
  );
}
