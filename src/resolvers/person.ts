import {
  MutationResolvers,
  PersonEvent,
  PersonEventResolvers,
  PersonResolvers,
  QueryResolvers,
  ResolverTypeWrapper,
  SubscriptionObject,
  SubscriptionResolvers,
} from "../schemas/gen-types";

import { Context } from "../main";
import { Person } from "../model/person";
import pubsub from "../pubsub";
import { v4 as uuidv4 } from "uuid";

/**
 * graphql-code-gen generates resolvers for each Type in the GraphQL schema.
 * Here we aggregate the interfaces for Person resolved within this file, along
 * with the common Query Type.
 *
 * When an interface is added here, it also needs to be added in the top-level
 * file, resolvers.ts.
 */
interface Resolvers {
  Person: PersonResolvers;
  PersonEvent: PersonEventResolvers;
  Query: QueryResolvers;
  Mutation: MutationResolvers;
  Subscription: SubscriptionResolvers;
}

const people: { [ID: string]: Person } = {};

export const PersonResolver: Resolvers = {
  Person: {
    dateOfBirth(person) {
      if (person && person.dateOfBirth) {
        const fullTime = person.dateOfBirth.toISOString();
        const indexOfT = fullTime.indexOf("T");
        return fullTime.substring(0, indexOfT);
      }
      return null;
    },
    age(person) {
      if (person && person.dateOfBirth) {
        return new Date().getFullYear() - person.dateOfBirth.getFullYear();
      }
      return null;
    },
  },
  PersonEvent: {
    dateOfBirth(person) {
      if (person && person.dateOfBirth) {
        const fullTime = person.dateOfBirth.toISOString();
        const indexOfT = fullTime.indexOf("T");
        return fullTime.substring(0, indexOfT);
      }
      return null;
    },
  },
  Query: {
    allPeople: () => {
      return Object.values(people);
    },
    person: (root, { id }) => {
      return people[id];
    },
  },
  Mutation: {
    addPerson: (root, { input }, ctx) => {
      if (!input) return null;
      const id = input.id ? input.id : uuidv4();

      console.log(typeof input.dateOfBirth);

      people[id] = new Person({
        id,
        name: input.name !== undefined ? input.name : null,
        givenName: input.givenName !== undefined ? input.givenName : null,
        familyName: input.familyName !== undefined ? input.familyName : null,
        dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : null,
      });

      pubsub.publish("personAdded", { personAdded: people[id] });

      return id;
    },
    updatePerson: (root, { input }, ctx) => {
      if (!input || !input.id) return null;

      const person = people[input.id];
      if (!person) return null;

      const updatedPerson = new Person({
        id: person.id,
        name: input.name !== undefined ? input.name : person.name,
        givenName: input.givenName !== undefined ? input.givenName : person.givenName,
        familyName: input.familyName !== undefined ? input.familyName : person.familyName,
        dateOfBirth:
          input.dateOfBirth !== undefined ? new Date(input.dateOfBirth) : person.dateOfBirth,
      });

      people[updatedPerson.id] = updatedPerson;
      pubsub.publish("personUpdated", { personUpdated: updatedPerson });

      return updatedPerson.id;
    },
    deletePerson: (root, { id }, ctx) => {
      const person = people[id];
      delete people[id];
      pubsub.publish("personDeleted", { personDeleted: person });
      return person;
    },
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator("personAdded"),
    },
    personUpdated: {
      subscribe: () => pubsub.asyncIterator("personUpdated"),
    },
    personDeleted: {
      subscribe: () => pubsub.asyncIterator("personDeleted"),
    },
  },
};
