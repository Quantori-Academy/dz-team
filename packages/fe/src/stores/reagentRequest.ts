import { createReagentRequest } from "api/reagentRequest";
import { genericDomain } from "logger";
import { RequestCreationBody } from "shared/zodSchemas/request/requestSchemas";

export const initialFormData: RequestCreationBody = {
    name: "",
    structure: "",
    cas: "",
    quantity: 1,
    unit: "ml",
    status: "pending",
};

export const $formData = genericDomain.createStore<RequestCreationBody>(initialFormData);
export const setFormData = genericDomain.createEvent<RequestCreationBody>();

$formData.on(setFormData, (state, payload) => ({
    ...state,
    ...payload,
}));

export const addReagentRequestFx = genericDomain.createEffect(async () => {
    const data = $formData.getState();
    const response = await createReagentRequest(data);
    setFormData(initialFormData);
    return response;
});
