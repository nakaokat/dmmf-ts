# valibot-dmmf

Domain Modeling Made Functional (DMMF) の概念をTypeScriptで実装するプロジェクトです。

Domain Modeling Made Functional(DMMF, 邦題:関数型ドメインモデリング)の内容を、TypeScriptで実装しています。関数型プログラミングの概念を活用し、ドメインモデルを型安全に表現する方法を学習・実験するためのプロジェクトです。

## 特徴

- valibotによる型安全なバリデーション
- fp-tsのEitherを使用したエラーハンドリング
- ブランド型による型レベルでの区別
- 直和型・直積型によるドメインモデリング
- 関数のシグネチャでエフェクトを文書化

## Setup

```bash
pnpm install
```

## Development

```bash
# 開発モードで実行
pnpm dev

# テスト実行
pnpm test

# ビルド
pnpm build

# ビルド後実行
pnpm start
```

## 実装内容

### 単純な値のモデリング (5.3)

- `CustomerId`、`OrderId`などのブランド型

### 複雑なデータのモデリング (5.4)

- レコード型による直積型のモデリング
- 選択型による直和型のモデリング (`ProductCode = WidgetCode | GizmoCode`)

### 関数によるワークフローのモデリング (5.5)

- バリデーション関数の実装
- エフェクトを文書化した関数シグネチャ
- fp-tsのEitherを使用したエラーハンドリング

## Dependencies

- **TypeScript** - 型安全性とコンパイル時チェック
- **valibot** - スキーマベースのバリデーションライブラリ
- **fp-ts** - 関数型プログラミング用ライブラリ (Either型など)
- **tsx** - TypeScript実行環境
- **vitest** - テストフレームワーク
