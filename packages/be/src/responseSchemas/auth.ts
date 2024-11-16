import { FastifyZodOpenApiSchema } from "fastify-zod-openapi";
import { z } from "zod";
import { loginUserSchema } from "shared/zodSchemas";

export const POST_USER_AUTH_SCHEMA: FastifyZodOpenApiSchema = {
    summary: "Generates access token for user.",
    description: "Log in a user.",
    tags: ["Auth"],
    security: [], // Ensures that endpoint won't be locked
    body: loginUserSchema,
    response: {
        200: {
            description: "A JWT token if and only if authenticated successfully",
            content: {
                "application/json": {
                    schema: z.object({
                        token: z
                            .string()
                            .default(
                                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMmI0YTM2Ni0wYzFjLTQ3MWMtOTYyNS1jMmE4NGQyNzZlZGMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzE3NzQ5MzcsImV4cCI6MTczMTc3ODUzN30.EH7O3eh1NK3wGaA0G7Iee31fuZYyCmrUspz_71zdqKc",
                            ),
                    }),
                },
            },
        },
        401: {
            description: "Incorrect credentials",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Invalid username or password."),
                    }),
                },
            },
        },
        400: {
            description: "Validation Error - Missing fields",
            content: {
                "application/json": {
                    schema: z.object({
                        statusCode: z.number().default(400),
                        code: z.string().default("FST_ERR_VALIDATION"),
                        error: z.string().default("Bad Request"),
                        message: z.string().default("body/username Required"),
                    }),
                },
            },
        },
    },
};
