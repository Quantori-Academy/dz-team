import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { ReagentCreateWithoutSamplesInputSchema } from "./ReagentCreateWithoutSamplesInputSchema";
import { ReagentUncheckedCreateWithoutSamplesInputSchema } from "./ReagentUncheckedCreateWithoutSamplesInputSchema";
import { ReagentCreateOrConnectWithoutSamplesInputSchema } from "./ReagentCreateOrConnectWithoutSamplesInputSchema";
import { ReagentUpsertWithWhereUniqueWithoutSamplesInputSchema } from "./ReagentUpsertWithWhereUniqueWithoutSamplesInputSchema";
import { ReagentWhereUniqueInputSchema } from "./ReagentWhereUniqueInputSchema";
import { ReagentUpdateWithWhereUniqueWithoutSamplesInputSchema } from "./ReagentUpdateWithWhereUniqueWithoutSamplesInputSchema";
import { ReagentUpdateManyWithWhereWithoutSamplesInputSchema } from "./ReagentUpdateManyWithWhereWithoutSamplesInputSchema";
import { ReagentScalarWhereInputSchema } from "./ReagentScalarWhereInputSchema";

export const ReagentUpdateManyWithoutSamplesNestedInputSchema: z.ZodType<Prisma.ReagentUpdateManyWithoutSamplesNestedInput> =
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
            upsert: z
                .union([
                    z.lazy(() => ReagentUpsertWithWhereUniqueWithoutSamplesInputSchema),
                    z.lazy(() => ReagentUpsertWithWhereUniqueWithoutSamplesInputSchema).array(),
                ])
                .optional(),
            set: z
                .union([
                    z.lazy(() => ReagentWhereUniqueInputSchema),
                    z.lazy(() => ReagentWhereUniqueInputSchema).array(),
                ])
                .optional(),
            disconnect: z
                .union([
                    z.lazy(() => ReagentWhereUniqueInputSchema),
                    z.lazy(() => ReagentWhereUniqueInputSchema).array(),
                ])
                .optional(),
            delete: z
                .union([
                    z.lazy(() => ReagentWhereUniqueInputSchema),
                    z.lazy(() => ReagentWhereUniqueInputSchema).array(),
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => ReagentWhereUniqueInputSchema),
                    z.lazy(() => ReagentWhereUniqueInputSchema).array(),
                ])
                .optional(),
            update: z
                .union([
                    z.lazy(() => ReagentUpdateWithWhereUniqueWithoutSamplesInputSchema),
                    z.lazy(() => ReagentUpdateWithWhereUniqueWithoutSamplesInputSchema).array(),
                ])
                .optional(),
            updateMany: z
                .union([
                    z.lazy(() => ReagentUpdateManyWithWhereWithoutSamplesInputSchema),
                    z.lazy(() => ReagentUpdateManyWithWhereWithoutSamplesInputSchema).array(),
                ])
                .optional(),
            deleteMany: z
                .union([
                    z.lazy(() => ReagentScalarWhereInputSchema),
                    z.lazy(() => ReagentScalarWhereInputSchema).array(),
                ])
                .optional(),
        })
        .strict();

export default ReagentUpdateManyWithoutSamplesNestedInputSchema;
