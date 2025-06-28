import * as v from 'valibot';
import { Either } from 'fp-ts/Either';
import * as E from 'fp-ts/Either';

// see 「5.3 単純な値のモデリング」
export const orderIdSchema = v.pipe(v.number(), v.brand('OrderId'));
export type OrderId = v.InferOutput<typeof orderIdSchema>;

// createOrderId
export const createOrderId = (id: number): Either<[Error], OrderId> => {
    if (id < 0) {
        return E.left([new Error(`Invalid OrderId: ${id}`)]);
    }
    const result = v.safeParse(orderIdSchema, id);
    if (!result.success) {
        return E.left([new Error(`Invalid OrderId: ${id}`)]);
    }
    return E.right(result.output);
}