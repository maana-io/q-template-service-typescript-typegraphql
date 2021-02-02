import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql";
import { Person as PersonFromModel } from "../model/person";
import { Context } from "../main";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Info = {
  __typename?: "Info";
  id: Scalars["ID"];
  version: Scalars["String"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  allPeople: Array<Person>;
  info?: Maybe<Info>;
  person?: Maybe<Person>;
};

export type QuerypersonArgs = {
  id: Scalars["ID"];
};

export type Person = {
  __typename?: "Person";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  givenName?: Maybe<Scalars["String"]>;
  familyName?: Maybe<Scalars["String"]>;
  dateOfBirth?: Maybe<Scalars["Date"]>;
  age?: Maybe<Scalars["Int"]>;
};

export type PersonInput = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  givenName?: Maybe<Scalars["String"]>;
  familyName?: Maybe<Scalars["String"]>;
  dateOfBirth?: Maybe<Scalars["Date"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addPerson?: Maybe<Scalars["ID"]>;
  updatePerson?: Maybe<Scalars["ID"]>;
  deletePerson?: Maybe<Person>;
};

export type MutationaddPersonArgs = {
  input?: Maybe<PersonInput>;
};

export type MutationupdatePersonArgs = {
  input?: Maybe<PersonInput>;
};

export type MutationdeletePersonArgs = {
  id: Scalars["ID"];
};

export type PersonEvent = {
  __typename?: "PersonEvent";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  givenName?: Maybe<Scalars["String"]>;
  familyName?: Maybe<Scalars["String"]>;
  dateOfBirth?: Maybe<Scalars["Date"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  personAdded: PersonEvent;
  personUpdated: PersonEvent;
  personDeleted: PersonEvent;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Info: ResolverTypeWrapper<Info>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Query: ResolverTypeWrapper<{}>;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  Person: ResolverTypeWrapper<PersonFromModel>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  PersonInput: PersonInput;
  Mutation: ResolverTypeWrapper<{}>;
  PersonEvent: ResolverTypeWrapper<PersonEvent>;
  Subscription: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Info: Info;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Query: {};
  Date: Scalars["Date"];
  Person: PersonFromModel;
  Int: Scalars["Int"];
  PersonInput: PersonInput;
  Mutation: {};
  PersonEvent: PersonEvent;
  Subscription: {};
  Boolean: Scalars["Boolean"];
};

export type InfoResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Info"] = ResolversParentTypes["Info"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  version?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  allPeople?: Resolver<Array<ResolversTypes["Person"]>, ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes["Info"]>, ParentType, ContextType>;
  person?: Resolver<
    Maybe<ResolversTypes["Person"]>,
    ParentType,
    ContextType,
    RequireFields<QuerypersonArgs, "id">
  >;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type PersonResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Person"] = ResolversParentTypes["Person"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  givenName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  familyName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  dateOfBirth?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  age?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  addPerson?: Resolver<
    Maybe<ResolversTypes["ID"]>,
    ParentType,
    ContextType,
    RequireFields<MutationaddPersonArgs, never>
  >;
  updatePerson?: Resolver<
    Maybe<ResolversTypes["ID"]>,
    ParentType,
    ContextType,
    RequireFields<MutationupdatePersonArgs, never>
  >;
  deletePerson?: Resolver<
    Maybe<ResolversTypes["Person"]>,
    ParentType,
    ContextType,
    RequireFields<MutationdeletePersonArgs, "id">
  >;
};

export type PersonEventResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["PersonEvent"] = ResolversParentTypes["PersonEvent"]
> = {
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  givenName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  familyName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  dateOfBirth?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"]
> = {
  personAdded?: SubscriptionResolver<
    ResolversTypes["PersonEvent"],
    "personAdded",
    ParentType,
    ContextType
  >;
  personUpdated?: SubscriptionResolver<
    ResolversTypes["PersonEvent"],
    "personUpdated",
    ParentType,
    ContextType
  >;
  personDeleted?: SubscriptionResolver<
    ResolversTypes["PersonEvent"],
    "personDeleted",
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = Context> = {
  Info?: InfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Person?: PersonResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PersonEvent?: PersonEventResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
