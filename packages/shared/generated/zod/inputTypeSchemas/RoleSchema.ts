import { z } from "zod";

export const RoleSchema = z.enum(["admin", "procurementOfficer", "researcher"]);

export type RoleType = `${z.infer<typeof RoleSchema>}`;

export default RoleSchema;
