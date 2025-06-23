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

// 5.4.3 選択型によるモデリング 
// data ProductCode = WidgetCode OR GizmoCode
// type ProductCode = Widget of WidgetCode | Gizmo of GizmoCode
// ブランド型と直和型を組み合わせて表現する
const widgetCodeSchema = v.pipe(v.string(), v.brand('WidgetCode'));
const gizmoCodeSchema = v.pipe(v.string(), v.brand('GizmoCode'));
const productCodeSchema = v.union([widgetCodeSchema,gizmoCodeSchema]);
type WidgetCode = v.InferOutput<typeof widgetCodeSchema>;
type GizmoCode = v.InferOutput<typeof gizmoCodeSchema>;
type ProductCode = v.InferOutput<typeof productCodeSchema>;

// 5.5 関数によるワークフローのモデリング
// type ValidateOrder = UnvalidatedOrder -> ValidatedOrder
// 5.5.1 複雑な入力と出力の処理
type UnvalidatedOrder = {
    tag: 'UnvalidatedOrder';
    orderId: OrderId;
};
type ValidatedOrder = {
    tag: 'ValidatedOrder';
    orderId: OrderId;
}
type ValidateOrder = (order: UnvalidatedOrder) => ValidatedOrder;
const validateOrder: ValidateOrder = (order: UnvalidatedOrder) => {
    return {
        tag: 'ValidatedOrder',
        orderId: order.orderId,
    }
};

// type PlaceOrderEvents = {
//   AcknowledgmentSent : AcknowledgmentSent
//   OrderPlaced : OrderPlaced
//   BillableOrderPlaced : BillableOrderPlaced
// }
type PlaceOrderEvents = {
    AcknowledgmentSent: {
        tag: 'AcknowledgmentSent';
        orderId: OrderId;
    };
    OrderPlaced: {
        tag: 'OrderPlaced';
        orderId: OrderId;
    };
    BillableOrderPlaced: {
        tag: 'BillableOrderPlaced';
        orderId: OrderId;
        amountToBill: number;
    };
}


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
    console.log("5.4.3 選択型によるモデリング");
    const widgetCode = v.safeParse(widgetCodeSchema, "widget-123");
    const gizmoCode = v.safeParse(gizmoCodeSchema, "gizmo-456");
    const productCodeWidget = v.safeParse(productCodeSchema, widgetCode.output);
    console.log("Product Code (Widget):", productCodeWidget.output);

    console.log("# 5.5 関数によるワークフローのモデリング");
    const unvalidatedOrder: UnvalidatedOrder = {
        tag: 'UnvalidatedOrder',
        orderId: 789 as OrderId, // 型アサーションを使用してOrderId型に変換
    };
    const validatedOrder = validateOrder(unvalidatedOrder);
    console.log("Validated Order:", validatedOrder);

}

console.log(title);
main();