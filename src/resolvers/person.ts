import { v4 as uuidv4 } from "uuid";
import {
  Resolver,
  Root,
  Query,
  Arg,
  Mutation,
  ID,
  PubSub,
  PubSubEngine,
  Subscription,
} from "type-graphql";

import { Person } from "../types/person";
import { PersonAddInput } from "../types/person-add-input";
import { PersonUpdateInput } from "../types/person-update-input";
import { PersonEvent, PersonEventPayload } from "../types/person-event";

@Resolver(() => Person)
export class PersonResolver {
  private readonly people: { [ID: string]: Person } = {};

  @Query(() => Person, {
    nullable: true,
    description: "Get a specific person by their unique identifier",
  })
  async person(@Arg("id", () => ID) id: string): Promise<Person | undefined> {
    return this.people[id];
  }

  @Query(() => [Person], { description: "Get all the people" })
  async allPeople(): Promise<Person[]> {
    return Object.values(this.people);
  }

  @Mutation(() => ID, { description: "Add a person" })
  async addPerson(
    @Arg("input") input: PersonAddInput,
    @PubSub() pubSub: PubSubEngine
  ): Promise<string> {
    const id = input.id ? input.id : uuidv4();
    const person = Object.assign(new Person(), {
      id,
      ...input,
    });
    this.people[id] = person;
    await pubSub.publish("personAdded", person);
    return id;
  }

  @Mutation(() => Person, { nullable: true, description: "Update a person" })
  async updatePerson(
    @Arg("input") input: PersonUpdateInput,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Person | undefined> {
    let person = this.people[input.id];
    if (person) {
      person = Object.assign(person, {
        ...input,
      });
      this.people[person.id] = person;
      await pubSub.publish("personUpdated", person);
    }
    return person;
  }

  @Mutation(() => Person, {
    nullable: true,
    description: "Delete a person",
  })
  async deletePerson(
    @Arg("id", () => ID) id: string,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Person | undefined> {
    const person = this.people[id];
    if (person) {
      delete this.people[id];
      await pubSub.publish("personDeleted", person);
    }
    return person;
  }

  @Subscription({
    topics: "personAdded",
  })
  personAdded(@Root() payload: PersonEventPayload): PersonEvent {
    return payload;
  }

  @Subscription({
    topics: "personUpdated",
  })
  personUpdated(@Root() payload: PersonEventPayload): PersonEvent {
    return payload;
  }

  @Subscription({
    topics: "personDeleted",
  })
  personDeleted(@Root() payload: PersonEventPayload): PersonEvent {
    return payload;
  }
}
