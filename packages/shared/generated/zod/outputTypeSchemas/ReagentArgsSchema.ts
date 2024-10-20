import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { ReagentSelectSchema } from "../inputTypeSchemas/ReagentSelectSchema";
import { ReagentIncludeSchema } from "../inputTypeSchemas/ReagentIncludeSchema";

export const ReagentArgsSchema: z.ZodType<Prisma.ReagentDefaultArgs> = z
    .object({
        select: z.lazy(() => ReagentSelectSchema).optional(),
        include: z.lazy(() => ReagentIncludeSchema).optional(),
    })
    .strict();

export default ReagentArgsSchema;
