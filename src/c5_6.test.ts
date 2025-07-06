import { describe, it, expect } from 'vitest';

import type { Name } from './c5_6';
import { createName, isNameEqual } from './c5_6';

describe('Name型の比較テスト', () => {
    it('同じプロパティを持つName型オブジェクトの参照比較はfalse', () => {
        const name1 : Name = createName('John', 'Doe');
        const name2 : Name = createName('John', 'Doe');

        // JavaScriptではオブジェクト同士の比較は、同じプロパティを持っていても参照が異なるため、falseになる
        expect(name1 === name2).toBe(false);
    });

    it('isNameEqual関数を使って同じプロパティを持つName型オブジェクトの比較はtrueとなる', () => {
        const name1 : Name = createName('John', 'Doe');
        const name2 : Name = createName('John', 'Doe');

        expect(isNameEqual(name1, name2)).toBe(true);
    });

    it('isNameEqual関数を使って異なるプロパティを持つName型オブジェクトの比較はfalseとなる', () => {
        const name1 : Name = createName('John', 'Doe');
        const name2 : Name = createName('Jane', 'Smith');

        expect(isNameEqual(name1, name2)).toBe(false);
    });

    it('firstNameが異なる場合の比較はfalse', () => {
        const name1 : Name = createName('John', 'Doe');
        const name2 : Name = createName('Jane', 'Doe');

        expect(isNameEqual(name1, name2)).toBe(false);
    });

    it('lastNameが異なる場合の比較はfalse', () => {
        const name1 : Name = createName('John', 'Doe');
        const name2 : Name = createName('John', 'Smith');

        expect(isNameEqual(name1, name2)).toBe(false);
    });

    it('同じオブジェクトの参照比較はtrue', () => {
        const name1 : Name = createName('John', 'Doe');
        const name2 : Name = name1;

        expect(name1 === name2).toBe(true);
    });
});