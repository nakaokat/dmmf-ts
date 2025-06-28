import { describe, it, expect } from 'vitest';
import * as v from 'valibot';
import {
  customerIdSchema,
} from './index';

import {
  orderIdSchema,
} from './model/order';

describe('5 型によるドメインモデリング', () => {
  describe('5.3 単純な値のモデリング', () => {
    it('CustomerId', () => {
      const result = v.safeParse(customerIdSchema, 123);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.output).toBe(123);
      }
    });

    it('異常系: CustomerId with invalid value', () => {
      const result = v.safeParse(customerIdSchema, '123');
      expect(result.success).toBe(false);
    });

    it('OrderId', () => {
      const result = v.safeParse(orderIdSchema, 456);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.output).toBe(456);
      }
    });

    it('異常系: OrderId with invalid value', () => {
      const result = v.safeParse(orderIdSchema, '123');
      expect(result.success).toBe(false);
    });
  });
});