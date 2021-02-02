import { Field, ObjectType, ID } from "type-graphql";

@ObjectType({ description: "A Person subscription event" })
export class PersonEvent {
  @Field(() => ID, { description: "The unique identifier of the person" })
  id: string;

  @Field({ description: "The full name of the person" })
  name: string;

  @Field({ description: "The given name of the person" })
  givenName: string;

  @Field({ description: "The family name of the person" })
  familyName: string;

  @Field({ description: "The date of birth of the person" })
  dateOfBirth: Date;
}

export interface PersonEventPayload {
  id: string;
  name: string;
  givenName: string;
  familyName: string;
  dateOfBirth: Date;
}
