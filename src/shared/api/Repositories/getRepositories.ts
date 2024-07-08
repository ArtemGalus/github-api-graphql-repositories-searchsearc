// import { makeRequest } from "../makeRequest";
// import { queryRepositoriesNextPage, queryRepositoriesPrevPage, queryUserRepositoriesNextPage, queryUserRepositoriesPrevPage } from "./queries";
// import { createEffect } from "effector";

// export const getRepositoriesNextPageFx = (query: string, cursor: string = "") => {
//     return makeRequest(queryRepositoriesNextPage, { query, cursor }).then(data => data.search.nodes);
// };

// export const getRepositoriesPrevPageFx = createEffect((query: string, cursor: string) => {
//     return makeRequest(queryRepositoriesPrevPage, { query, cursor });
// });

// export const getUserRepositoriesNextPageFx = createEffect((query: string, cursor?: string) => {
//     return makeRequest(queryUserRepositoriesNextPage, { query, cursor });
// });

// export const getUserRepositoriesPrevPageFx = createEffect((query: string, cursor: string) => {
//     return makeRequest(queryUserRepositoriesPrevPage, { query, cursor });
// });

