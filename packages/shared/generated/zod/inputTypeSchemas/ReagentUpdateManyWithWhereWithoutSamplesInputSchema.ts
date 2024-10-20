import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { ReagentScalarWhereInputSchema } from "./ReagentScalarWhereInputSchema";
import { ReagentUpdateManyMutationInputSchema } from "./ReagentUpdateManyMutationInputSchema";
import { ReagentUncheckedUpdateManyWithoutSamplesInputSchema } from "./ReagentUncheckedUpdateManyWithoutSamplesInputSchema";

export const ReagentUpdateManyWithWhereWithoutSamplesInputSchema: z.ZodType<Prisma.ReagentUpdateManyWithWhereWithoutSamplesInput> =
    z
        .object({
            where: z.lazy(() => ReagentScalarWhereInputSchema),
            data: z.union([
                z.lazy(() => ReagentUpdateManyMutationInputSchema),
                z.lazy(() => ReagentUncheckedUpdateManyWithoutSamplesInputSchema),
            ]),
        })
        .strict();

export default ReagentUpdateManyWithWhereWithoutSamplesInputSchema;
