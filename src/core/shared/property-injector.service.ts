import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

export type Dictionary<TValue, TKey extends keyof any> = Map<TKey, TValue>;

type TInjectable<TInput = any> = Type<TInput> | string | symbol;

@Injectable()
export class PropertyInjectorService<
  TValue,
  TKey extends string | number | symbol
> {
  dictionary: Dictionary<Type<TValue>, TKey>;

  constructor(private moduleRef: ModuleRef) {}

  private _inject<TInput>(type: TInjectable<TInput>) {
    return this.moduleRef.get(type);
  }

  setDictionary(_dictionary: Dictionary<Type<TValue>, TKey>) {
    this.dictionary = _dictionary;
    return this;
  }

  getDictionary() {
    return this.dictionary;
  }

  injectDependencyByProperty(propertyName: TKey) {
    const injectable = this.dictionary.get(propertyName);
    if (!injectable)
      throw new Error(
        `Injectable not found by property name "${propertyName}".`,
      );
    return this._inject(injectable);
  }
}
