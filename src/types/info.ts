import { Field, ObjectType, ID } from "type-graphql";

@ObjectType({ description: "Information about the current service" })
export class Info {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true, description: "The name of the service" })
  name: string;

  @Field({ nullable: true, description: "The version of the service" })
  version: string;

  @Field({ nullable: true, description: "The description of the service" })
  description: string;

  constructor(prop: Info) {
    this.id = prop.id;
    this.name = prop.name;
    this.version = prop.version;
    this.description = prop.description;
  }
}
