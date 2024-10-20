import { z } from "zod";

export const SampleScalarFieldEnumSchema = z.enum([
    "id",
    "title",
    "description",
    "structure",
    "initialQuantity",
    "unit",
    "deletedAt",
    "createdAt",
    "updatedAt",
]);

export default SampleScalarFieldEnumSchema;
