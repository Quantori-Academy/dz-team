import { z } from "zod";

export const ReagentRequest = z.object({
    id: z.string(),
    userId: z.string(),
    reagentName: z.string(),
    structure: z.string(),
    casNumber: z.string(),
    desiredQuantity: z.string(),
    userComments: z.string(),
    procurementComments: z.string(),
    status: z.string(),
    creationDate: z.string(),
    dateModified: z.string(),
});

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

export type ReagentRequestType = z.infer<typeof ReagentRequest>;
export type CreateReagentRequestType = z.infer<typeof CreateReagentRequest>;
