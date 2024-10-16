import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { ReagentWhereUniqueInputSchema } from "./ReagentWhereUniqueInputSchema";
import { ReagentCreateWithoutSamplesInputSchema } from "./ReagentCreateWithoutSamplesInputSchema";
import { ReagentUncheckedCreateWithoutSamplesInputSchema } from "./ReagentUncheckedCreateWithoutSamplesInputSchema";

export const ReagentCreateOrConnectWithoutSamplesInputSchema: z.ZodType<Prisma.ReagentCreateOrConnectWithoutSamplesInput> =
    z
        .object({
            where: z.lazy(() => ReagentWhereUniqueInputSchema),
            create: z.union([
                z.lazy(() => ReagentCreateWithoutSamplesInputSchema),
                z.lazy(() => ReagentUncheckedCreateWithoutSamplesInputSchema),
            ]),
        })
        .strict();

export default ReagentCreateOrConnectWithoutSamplesInputSchema;
