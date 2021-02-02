import { InputType, Field } from "type-graphql";
import { Person } from "./person";

@InputType({ description: "Person update input data" })
export class PersonUpdateInput implements Partial<Person> {
  @Field({ description: "The unique identifier of the person" })
  id: string;

  @Field({ nullable: true, description: "The given name of the person" })
  givenName?: string;

  @Field({ nullable: true, description: "The family name of the person" })
  familyName?: string;

  @Field({ nullable: true, description: "The date of birth of the person" })
  dateOfBirth?: Date;
}
