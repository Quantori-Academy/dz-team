import { getreagentRequest, reagentRequestType } from "api/reagentRequest";
import { genericDomain } from "logger";

export const reagentRequestFx = genericDomain.createEffect(() => {
    const response = getreagentRequest();
    return response;
});

export const $reagentRequestStore = genericDomain.createStore<reagentRequestType>([]);
$reagentRequestStore.on(reagentRequestFx.done, (_, { result }) => result);
