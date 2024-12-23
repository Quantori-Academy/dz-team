import fs from "fs";
import path from "path";
import { FastifyZodInstance } from "../types";

// Helper function to generate and save OpenAPI schema
export const generateOpenApiSchema = (server: FastifyZodInstance) => {
    const openapiJson = server.swagger(); // Generate the OpenAPI spec as a JSON object
    fs.writeFileSync(
        path.join(__dirname, "../openapi", "openapi.json"),
        JSON.stringify(openapiJson, null, 2),
    );
    console.log("OpenAPI spec has been generated and saved to openapi/openapi.json");
};
