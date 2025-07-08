import { describe, expect, test } from "vitest";
import { type Person, updatePerson } from "./c5_7";

describe("updatePerson", () => {
  test("should update person name while keeping other properties unchanged", () => {
    const person: Person = {
      PersonId: 1,
      Name: "John",
    };

    const updatedPerson = updatePerson(person, "Jane");

    expect(updatedPerson).toEqual({
      PersonId: 1,
      Name: "Jane",
    });
    expect(updatedPerson).not.toBe(person); // 新しいオブジェクトであることを確認
  });

  test("should preserve PersonId when updating name", () => {
    const person: Person = {
      PersonId: 42,
      Name: "Alice",
    };

    const updatedPerson = updatePerson(person, "Bob");

    expect(updatedPerson.PersonId).toBe(42);
    expect(updatedPerson.Name).toBe("Bob");
  });
});
