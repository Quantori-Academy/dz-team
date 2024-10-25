import { getUser, UserType } from "api/self";
import { genericDomain } from "logger";

export const getUserFx = genericDomain.createEffect(async (token: string) => {
    try {
        const response = await getUser(token);
        if (response) {
            return response;
        }
    } catch (err) {
        if (err instanceof Error) {
            dev.error(err.message, err.stack);
        }
        throw new Error("Failed to get user role");
    }
});

export const $userState = genericDomain
    .createStore<UserType | null>(null)
    .on(getUserFx.done, (_, { result }) => result)
    .on(getUserFx.fail, () => null);
