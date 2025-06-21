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
        // 5.4.2 未知の型のモデリング
        // 未定義の型を表現したい場合、knownがプレースホルダー的な使い方ができるという点で近いだろうか
        // https://valibot.dev/api/unknown/
        customerInfo: v.unknown(),
        shippingAddress: v.unknown(),
        amountToBill: v.unknown(),
    }
);
type Order = v.InferOutput<typeof orderSchema>;


function main() {
    const customerId = v.safeParse(customerIdSchema, 123);
    const orderId = v.safeParse(orderIdSchema, 456);
    
    console.log("Customer ID:", customerId.output);
    console.log("Order ID:", orderId.output);

    const data = {
        customerInfo: { name: "John Doe", email: "john@example.com" },
        shippingAddress: { city: "New York", zip: "10001" },
        amountToBill: 1000,
    };
    const order = v.safeParse(orderSchema, data);
    if (order.success) {
        // unknown型を使用している場合、バリデーションは成功する
        console.log("Order is valid:", order.output);
    } else {
        console.error("Order validation failed:", order.issues);
    }
}

console.log(title);
main();