import { describe, it, expect } from 'vitest';
import * as v from 'valibot';
import * as E from 'fp-ts/Either';
import {
  customerIdSchema,
  orderIdSchema,
} from './index';

describe('Domain Modeling with Types', () => {
  describe('Simple Value Modeling', () => {
    it('should validate CustomerId', () => {
      const result = v.safeParse(customerIdSchema, 123);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.output).toBe(123);
      }
    });

    it('should validate OrderId', () => {
      const result = v.safeParse(orderIdSchema, 456);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.output).toBe(456);
      }
    });
  });
});