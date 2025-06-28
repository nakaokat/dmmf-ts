import * as v from 'valibot';

// see 「5.3 単純な値のモデリング」
export const orderIdSchema = v.pipe(v.number(), v.brand('OrderId'));
export type OrderId = v.InferOutput<typeof orderIdSchema>;
