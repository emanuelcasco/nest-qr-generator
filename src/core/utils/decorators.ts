type Decorator =
  | ClassDecorator
  | PropertyDecorator
  | MethodDecorator
  | ParameterDecorator;

export function composeDecorators(...decorators: Decorator[]) {
  return function applyDecorators(...args) {
    for (const decorator of decorators) {
      (decorator as any)(...args);
    }
  };
}
