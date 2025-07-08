// 5.7.4 不変性とアイデンティティ

export type Person = Readonly<{
  PersonId: number;
  Name: string;
}>;

// NOTE: Person型はイミュータブルなので、Person -> newName -> Person というシグネチャになる

export const updatePerson = (person: Person, newName: string): Person => {
  return {
    ...person,
    Name: newName,
  };
};
