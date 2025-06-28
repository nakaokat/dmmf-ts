import { describe, it, expect } from 'vitest';
import {
    createOrderId,
} from './order';
import * as E from 'fp-ts/Either';

describe('Order Model', () => {
    describe('createOrderId', () => {
        it('正常系: should create a valid OrderId', () => {
            const result = createOrderId(123);
            expect(E.isRight(result)).toBe(true);
            if (E.isRight(result)) {
                expect(result.right).toBe(123);
            }
        });

        it('異常系: should fail to create an invalid OrderId', () => {
            const result = createOrderId(-1);
            expect(E.isLeft(result)).toBe(true);
            if (E.isLeft(result)) {
                expect(result.left[0].message).toBe('Invalid OrderId: -1');
            }
        });
    });
});
