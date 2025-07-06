// 5.6 アイデンティティの考察: 値オブジェクト

// NOTE: DDD用語 エンティティと値オブジェクト
// エンティティ：DDDの用語では永続的なアイデンティティ(識別子)を持つオブジェクトをエンティティと呼ぶ。
// 値オブジェクト：アイデンティティを持たないオブジェクト。

// 名前を表す値オブジェクトの例
export type Name = Readonly<{
    firstName: string;
    lastName: string;
}>;

// Name型のオブジェクトを生成する関数
export const createName = (firstName: string, lastName: string): Name => ({
    firstName,
    lastName
});

// Name型のオブジェクトを比較する関数
export const isNameEqual = (name1: Name, name2: Name): boolean => {
    return name1.firstName === name2.firstName && name1.lastName === name2.lastName;
};

// NOTE: 構造的等価性
// 構造的等価性とは、同じ型に属する2つの値が、すべてのフィールドが等しい場合に等しいとみなされる性質。
// F#ではデフォルトで構造的等価性を持つ。
// 一方でJavaScriptやTypeScriptでは、オブジェクトの参照が同じでない限り、同じプロパティを持っていても等しいとはみなされない。
// そのため、オブジェクトの等価性を比較するためには、自分で比較関数を実装する必要がある。
