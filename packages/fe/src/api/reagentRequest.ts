import { z } from "zod";

export const CreateReagentRequest = z.object({
    userId: z.string(),
    name: z.string(),
    structure: z.string(),
    cas: z.string(),
    quantity: z.number(),
    unit: z.string(),
    status: z.string(),
    commentsUser: z.array(z.string()),
    commentsProcurement: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const initialFormData: CreateReagentRequestType = {
    userId: "",
    name: "",
    structure: "",
    cas: "",
    quantity: 0,
    unit: "",
    status: "",
    commentsUser: [""],
    commentsProcurement: [""],
    createdAt: "",
    updatedAt: "",
};

export type CreateReagentRequestType = z.infer<typeof CreateReagentRequest>;
