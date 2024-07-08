import { request } from "graphql-request";

type Args = Parameters<typeof request>;
type ResultType = ReturnType<typeof request>;

export const makeRequest = (query: Args[1], variables?: Args[2]): ResultType => {
    return request(`${import.meta.env.VITE_GQL_END_POINT}`, query, variables, {
        authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    });
};
