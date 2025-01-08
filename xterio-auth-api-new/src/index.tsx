import RnAuth from './NativeRnAuth';

export function multiply(a: number, b: number): number {
  return RnAuth.multiply(a, b);
}

export function test(a: number, b: number): number {
  return RnAuth.test(a, b);
}
