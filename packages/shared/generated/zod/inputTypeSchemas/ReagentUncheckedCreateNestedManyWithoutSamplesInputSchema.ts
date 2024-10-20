import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { ReagentCreateWithoutSamplesInputSchema } from "./ReagentCreateWithoutSamplesInputSchema";
import { ReagentUncheckedCreateWithoutSamplesInputSchema } from "./ReagentUncheckedCreateWithoutSamplesInputSchema";
import { ReagentCreateOrConnectWithoutSamplesInputSchema } from "./ReagentCreateOrConnectWithoutSamplesInputSchema";
import { ReagentWhereUniqueInputSchema } from "./ReagentWhereUniqueInputSchema";

export const ReagentUncheckedCreateNestedManyWithoutSamplesInputSchema: z.ZodType<Prisma.ReagentUncheckedCreateNestedManyWithoutSamplesInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => ReagentCreateWithoutSamplesInputSchema),
                    z.lazy(() => ReagentCreateWithoutSamplesInputSchema).array(),
                    z.lazy(() => ReagentUncheckedCreateWithoutSamplesInputSchema),
                    z.lazy(() => ReagentUncheckedCreateWithoutSamplesInputSchema).array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(() => ReagentCreateOrConnectWithoutSamplesInputSchema),
                    z.lazy(() => ReagentCreateOrConnectWithoutSamplesInputSchema).array(),
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => ReagentWhereUniqueInputSchema),
                    z.lazy(() => ReagentWhereUniqueInputSchema).array(),
                ])
                .optional(),
        })
        .strict();

export default ReagentUncheckedCreateNestedManyWithoutSamplesInputSchema;
