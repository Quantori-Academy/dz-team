import { getLoginApi } from "api/login";
import { genericDomain } from "logger";

export const loginFx = genericDomain.createEffect(
    async ({ username, password }: { username: string; password: string }) => {
        try {
            const response = await getLoginApi({ username, password });

            if (response) {
                return { token: response.token };
            }
            throw new Error("Unknown error");
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("Unknown error");
        }
    },
);

export const $loginState = genericDomain
    .createStore<{ errorMessage: string | null }>({ errorMessage: null })
    .on(loginFx.done, () => ({ errorMessage: null }))
    .on(loginFx.fail, (_, { error }) => ({ errorMessage: error.message }));
