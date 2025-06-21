import * as v from 'valibot';

// 第5 章 型によるドメインモデリング
const title = '第5 章 型によるドメインモデリング';

// 5.3 単純な値のモデリング
const customerIdSchema = v.pipe(v.number(), v.brand('CustomerId'));
type CustomerId = v.InferOutput<typeof customerIdSchema>;
const orderIdSchema = v.pipe(v.number(), v.brand('OrderId'));
type OrderId = v.InferOutput<typeof orderIdSchema>;


function main() {
    const customerId = v.safeParse(customerIdSchema, 123);
    const orderId = v.safeParse(orderIdSchema, 456);
    
    console.log("Customer ID:", customerId.output);
    console.log("Order ID:", orderId.output);
}

console.log(title);
main();