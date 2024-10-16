import { z } from "zod";

export const ReagentScalarFieldEnumSchema = z.enum([
    "id",
    "name",
    "structure",
    "description",
    "quantity",
    "unit",
    "size",
    "expirationDate",
    "storageLocation",
    "cas",
    "producer",
    "catalogId",
    "catalogLink",
    "pricePerUnit",
    "deletedAt",
    "createdAt",
    "updatedAt",
]);

export default ReagentScalarFieldEnumSchema;
