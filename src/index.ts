import * as v from 'valibot';

// 第5 章 型によるドメインモデリング
const title = '第5 章 型によるドメインモデリング';

// 5.3 単純な値のモデリング
const customerIdSchema = v.pipe(v.number(), v.brand('CustomerId'));
type CustomerId = v.InferOutput<typeof customerIdSchema>;
const orderIdSchema = v.pipe(v.number(), v.brand('OrderId'));
type OrderId = v.InferOutput<typeof orderIdSchema>;

// 5.4 複雑なデータのモデリング
// 5.4.1 レコード型によるモデリング
// 以下のように直積型でモデリングする
// data Order = CustomerInfo AND ShippingAddress ...
const orderSchema = v.object(
    {
        customerInfo: v.string(),
        shippingAddress: v.string(),
        amountToBill: v.number(),
    }
);
type Order = v.InferOutput<typeof orderSchema>;

function main() {
    const customerId = v.safeParse(customerIdSchema, 123);
    const orderId = v.safeParse(orderIdSchema, 456);
    
    console.log("Customer ID:", customerId.output);
    console.log("Order ID:", orderId.output);
}

console.log(title);
main();