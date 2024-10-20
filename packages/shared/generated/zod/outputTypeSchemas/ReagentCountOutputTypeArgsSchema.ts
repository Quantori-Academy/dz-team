import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { ReagentCountOutputTypeSelectSchema } from "./ReagentCountOutputTypeSelectSchema";

export const ReagentCountOutputTypeArgsSchema: z.ZodType<Prisma.ReagentCountOutputTypeDefaultArgs> =
    z
        .object({
            select: z.lazy(() => ReagentCountOutputTypeSelectSchema).nullish(),
        })
        .strict();

export default ReagentCountOutputTypeSelectSchema;
