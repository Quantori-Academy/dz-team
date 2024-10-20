import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { ReagentWhereUniqueInputSchema } from "./ReagentWhereUniqueInputSchema";
import { ReagentUpdateWithoutSamplesInputSchema } from "./ReagentUpdateWithoutSamplesInputSchema";
import { ReagentUncheckedUpdateWithoutSamplesInputSchema } from "./ReagentUncheckedUpdateWithoutSamplesInputSchema";
import { ReagentCreateWithoutSamplesInputSchema } from "./ReagentCreateWithoutSamplesInputSchema";
import { ReagentUncheckedCreateWithoutSamplesInputSchema } from "./ReagentUncheckedCreateWithoutSamplesInputSchema";

export const ReagentUpsertWithWhereUniqueWithoutSamplesInputSchema: z.ZodType<Prisma.ReagentUpsertWithWhereUniqueWithoutSamplesInput> =
    z
        .object({
            where: z.lazy(() => ReagentWhereUniqueInputSchema),
            update: z.union([
                z.lazy(() => ReagentUpdateWithoutSamplesInputSchema),
                z.lazy(() => ReagentUncheckedUpdateWithoutSamplesInputSchema),
            ]),
            create: z.union([
                z.lazy(() => ReagentCreateWithoutSamplesInputSchema),
                z.lazy(() => ReagentUncheckedCreateWithoutSamplesInputSchema),
            ]),
        })
        .strict();

export default ReagentUpsertWithWhereUniqueWithoutSamplesInputSchema;
