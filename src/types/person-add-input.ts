import { InputType, Field } from "type-graphql";
import { Person } from "./person";

@InputType({ description: "Person add input data" })
export class PersonAddInput implements Partial<Person> {
  @Field({ nullable: true, description: "The unique identifier of the person" })
  id?: string;

  @Field({ description: "The given name of the person" })
  givenName: string;

  @Field({ description: "The family name of the person" })
  familyName: string;

  @Field({ description: "The date of birth of the person" })
  dateOfBirth: Date;
}
