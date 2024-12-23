## API Documentation with Swagger

Once you run the application, you can view the API documentation at:  
**[127.0.0.1:1337/docs](http://127.0.0.1:1337/docs) or [localhost:1337/docs](http://localhost:1337/docs)**

### Step 1: Registering New Schemas

To manually register new schemas as Swagger models, you need to modify `utils/swaggerConfig.ts`.

#### Steps to Register a Schema(Model):

1. Locate the `components` object within the configuration file.
2. Under `components`, find `schemas`.
3. Add a new schema registration by following this format:

```ts
server.register(
    swagger,
    withRefResolver({
        components: {
            schemas: {
                'Name': convertZodToJsonSchema('ZodObject')
            },
            ...
        },
        ...
    }),
);
```

-   **'Name'**: Use a descriptive name for the schema. For example, if the schema describes a user, use `User`.
-   **'ZodObject'**: Replace this with the name of the Zod schema you want to register. For example, `UserSchema` or `UserZodObject` (ensure it matches the Zod schema type).

#### Example:

```ts
server.register(
    swagger,
    withRefResolver({
        components: {
            schemas: {
                User: convertZodToJsonSchema(UserSchema),
            },
        },
    }),
);
```

---

### Step 2: Documenting the API

#### Route Structure:

In the `routes` folder, you'll find various API routes for different entities. Each route defines methods such as `POST`, `GET`, `PATCH`, `PUT`, and `DELETE`.

Each route includes:

-   **params**: Path parameters (if available).
-   **querystring**: Query parameters (if available).
-   **body**: The body of the request (if available).
-   **path**: The URL path for the endpoint.
-   **options**: Options passed as JSON, including `schema` for documentation.
-   **async function**: For Request/response processing.

Here's an example of how a route might look:

```ts
{server}.{METHOD}<...params, ...querystring, ...body>(
    {url},
    {
        schema: {schemaName} satisfies FastifyZodOpenApiSchema,
    },
    {function}
);
```

#### Schema Naming Convention:

-   The **schema name** should be descriptive and reflect its purpose, such as `GET_ORDER_BY_ID_SCHEMA`.

To define a schema for your endpoint, create a new file inside the `responseSchemas` folder (e.g., `orders.ts`).

---

### Step 3: Creating the Schema File

Inside the `responseSchemas` folder, create a file for each endpoint you want to document (e.g., `orders.ts`). Each file should define the schema for every HTTP method in the following format:

```ts
export const {SchemaName}: FastifyZodOpenApiSchema = {
    summary: {API summary},
    description: {Brief description of the functionality},
    querystring: {Zod schema for query params (if available)},
    params: {Zod schema for path params (if available)},
    tags: [{API group tags}],
    body: {Zod schema for the request body (if available)},
    response: {
        200: {
            description: {What the 200 status code returns},
            content: {
                "application/json": {
                    schema: {Returned Zod schema}
                }
            }
        },
        400: badRequestResponse (in same format as shown for 200),
        401: unauthorizedResponse (same applies here),
        500: internalServerErrorResponse (same applies here)
    }
};
```

#### Example Schema:

```ts
export const GET_ORDERS_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Retrieves all orders with metadata for available pages",
    description: "Fetches a list of all available orders.",
    querystring: OrderSearchSchema,
    tags: ["Orders"],
    response: {
        200: {
            description: "List of orders with metadata.",
            content: {
                "application/json": {
                    schema: OrdersListSchema,
                },
            },
        },
    },
};
```

---

### Step 4: Linking the Schema to the Route

After creating the response schema, go back to the `routes` folder and update the relevant route file. Import the newly defined schema and use it in the `schema` option of the route.

```ts
app.GET<{ querystring; body }>(
    "/orders",
    {
        schema: GET_ORDERS_SCHEMA,
    },
    { handlerFunction },
);
```

---

### Step 5: Final Steps

Once you've completed the schema registration and route updates, the API documentation will automatically be generated and available in Swagger at [127.0.0.1:1337/docs](http://127.0.0.1:1337/docs) or [localhost:1337/docs](http://localhost:1337/docs).
