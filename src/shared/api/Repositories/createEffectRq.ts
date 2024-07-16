import { makeRequest } from "../makeRequest";
import { createEffect } from "effector";

type Args = Parameters<typeof makeRequest>;

export function createEffectRq<T> (query: Args[0]) {
    return createEffect(async (variables: Args[1]) => {
        const data = makeRequest<T>(query,variables);
        return data;
    });
}
