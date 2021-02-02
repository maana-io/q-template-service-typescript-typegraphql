import { Field, ObjectType, ID } from "type-graphql";

@ObjectType({ description: "A Person" })
export class Person {
  @Field(() => ID, { description: "The unique identifier of the person" })
  id: string;

  @Field({ description: "The full name of the person" })
  get name(): string {
    return `${this.givenName} ${this.familyName}`;
  }

  @Field({ description: "The given name of the person" })
  givenName: string;

  @Field({ description: "The family name of the person" })
  familyName: string;

  @Field({ description: "The date of birth of the person" })
  dateOfBirth: Date;
}
