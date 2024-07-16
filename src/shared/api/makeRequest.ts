import { request } from "graphql-request";

type Args = Parameters<typeof request>;

export function makeRequest<T> (query: Args[1], variables?: Args[2]): Promise<T> {
    return request(`${import.meta.env.VITE_GQL_END_POINT}`, query, variables, {
        authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    }) as Promise<T>;
}