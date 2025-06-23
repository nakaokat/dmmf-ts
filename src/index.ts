import * as v from 'valibot';
import { Either } from 'fp-ts/Either';
import * as E from 'fp-ts/Either'

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

// 5.5.2 関数のシグネチャでエフェクトを文書化する
// エフェクト：関数が主な出力以外に行うこと
// type ValidateOrder = UnvalidatedOrder -> Result<ValidatedOrder,ValidationError list>

type ValidationError = {
    code: string;
    message: string;
};

// 自前でResult型を定義する場合
type Result<TOk, TErr> =
  | { tag: 'ok'; value: TOk }
  | { tag: 'error'; error: TErr };

type ValidateOrder2 = (order: UnvalidatedOrder) => Result<ValidatedOrder, ValidationError[]>;

// 自前で定義したResult型を使用したバリデーション関数の実装例
const validateOrder2: ValidateOrder2 = (order: UnvalidatedOrder) => {
    if (order.orderId <= 0) {
        return { tag: 'error', error: [{ code: 'InvalidOrderId', message: 'Order ID must be positive.' }] };
    }
    return { tag: 'ok', value: { tag: 'ValidatedOrder', orderId: order.orderId } };
};

// fp-tsのEitherを使用して「エフェクトを文書化」する場合
// https://gcanti.github.io/fp-ts/modules/Either.ts.html
type ValidateOrder3 = (order: UnvalidatedOrder) => Either<ValidationError[], ValidatedOrder>;

const validateOrder3: ValidateOrder3 = (order: UnvalidatedOrder) => {
    if (order.orderId <= 0) {
        return E.left([{ code: 'InvalidOrderId', message: 'Order ID must be positive.' }]);
    }
    return E.right({ tag: 'ValidatedOrder', orderId: order.orderId });
};


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

    console.log("# 5.5.2 関数のシグネチャでエフェクトを文書化する");
    // eitherを使用したバリデーション
    const unvalidatedOrder2: UnvalidatedOrder = {
        tag: 'UnvalidatedOrder',
        orderId: -1 as OrderId, // 型アサーションを使用してOrderId型に変換
    };
    const result = validateOrder3(unvalidatedOrder2);
    if (E.isLeft(result)) {
        console.error("Validation errors:", result.left);
    } else {
        console.log("Validated Order (Either):", result.right);
    }

}

console.log(title);
main();