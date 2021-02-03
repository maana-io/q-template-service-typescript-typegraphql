# TypeScript (with TypeGraphQL) based Maana Q Knowledge Microservice Template

## Folder Layout

```text
/ - the root directory.
| src/ - contains all of the source code.
  | types/ - The types used with the service.
  | resolvers/ - The resolvers that define how the schema is resolved.
| .env.template - A template .env file to use as a starting point.
| Dockerfile - Defines how the docker container is built.
| package.json - Node configuration and metadata file.
| tsconfig.json - Configuration for the TypeScript compiler.
```

## Customization

### Project

Change the name and description of the module

In `package.json`, edit the metadata:

  ```json
  {
    "name": "<my-service>",
    "author": "<me>",
    "license": "MIT",
    "version": "1.0.0",
    "description": "<my-service-description>",
    "repository": "https://github.com/<my-repo>/<my-service>.git",
  ```

### Environment

- Copy the `.env.template` file to an `.env` file
- Edit the settings to reflect `SERVICE_xxx` values
- Add your own settings (as appropriate)

NOTE: the env file is NOT checked into the repository as it may contain sensitive information (e.g., authentication keys)

### Schema

Define your decorated types in the `src/types` folder and add resolvers for them in `src/resolvers`. See the [official TypeGraphQL documentation](https://typegraphql.com/docs/introduction.html) for details.

In `main.ts`, import your resolvers where indicated:

```typescript
import { InfoResolver } from "./resolvers/info";
// --------------------------------
// TODO: IMPORT YOUR RESOLVERS HERE
// --------------------------------
import { PersonResolver } from "./resolvers/person";
// --------------------------------
```

and include them in the resolvers list:

```typescript
    resolvers: [
      InfoResolver,
      // -----------------------------
      // TODO: ADD YOUR RESOLVERS HERE
      // -----------------------------
      PersonResolver,
      // -----------------------------
    ],
```

## Building and running

### Development

```bash
yarn run startdev
```

### Docker

```bash
docker build . -t <my-service>
docker run -p 8050:8050 <my-service>:latest
```

## Deploying the Service

Once you have built and tested your service locally, you are ready to deploy it to a Kubernetes cluster for integration testing or production rollout.  This section covers the two officially supported options.

### Ad Hoc Deployment

Use this approach during development and testing.

#### Prerequisites

* Maana CLI installed (`graphql-cli` and `graphql-cli-maana`).
* Docker installed and running on your machine.
* KubeCtl installed and configured.

#### Log into the Azure Container Registery

```
docker login --username [USER_NAME] --password [PASSWORD] [ACR_NAME].azurecr.io
```

#### Deploy the Service

```
gql mdeploy
```

Options:

* Select `Private Docker Registry`.
* Enter the name of your service. `template-service`
* Enter the path to the Dockerfile for the service, if running from within the directory then just use `.`.
* Enter the name of your docker registry, the same one you logged into. `[ACR_NAME].azurecr.io`
* Set the version to tag the container with, `v1.0.0` is a good starting point.
* Set the number fo pods to spin up, usually you want to start with `1`.
* Set the port number you setup for your service, the default for the template is `8050`.
* it `Y` to confirm you setup and start building and deploying your service.

### Production Deployment

In this approach, you will create a dedicated deployment repo with a Helm chart and a packaged version of your service.  This is most commonly used for production build and deployment scenarios.

See the [Maana Q standalone service deployment template](https://github.com/maana-io/q-template-deploy-service) for details.
