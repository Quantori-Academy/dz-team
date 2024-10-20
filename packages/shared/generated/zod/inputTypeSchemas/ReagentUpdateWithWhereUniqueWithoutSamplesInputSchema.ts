import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { ReagentWhereUniqueInputSchema } from "./ReagentWhereUniqueInputSchema";
import { ReagentUpdateWithoutSamplesInputSchema } from "./ReagentUpdateWithoutSamplesInputSchema";
import { ReagentUncheckedUpdateWithoutSamplesInputSchema } from "./ReagentUncheckedUpdateWithoutSamplesInputSchema";

export const ReagentUpdateWithWhereUniqueWithoutSamplesInputSchema: z.ZodType<Prisma.ReagentUpdateWithWhereUniqueWithoutSamplesInput> =
    z
        .object({
            where: z.lazy(() => ReagentWhereUniqueInputSchema),
            data: z.union([
                z.lazy(() => ReagentUpdateWithoutSamplesInputSchema),
                z.lazy(() => ReagentUncheckedUpdateWithoutSamplesInputSchema),
            ]),
        })
        .strict();

export default ReagentUpdateWithWhereUniqueWithoutSamplesInputSchema;
