import { Resolver, Query, ResolverInterface } from "type-graphql";
import { environment } from "../environment";
import { Info } from "../types/info";

@Resolver()
export class InfoResolver {
  @Query((returns) => Info, { description: "Information about the current service" })
  info(): Info {
    return new Info({
      id: environment.serviceId,
      name: environment.serviceId,
      version: environment.version,
      description: "Maana Q Knowledge Service template",
    });
  }
}
