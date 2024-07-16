import { createEvent, createStore, sample } from "effector";
import { persist } from "effector-storage/local";
import { RepositoriesNextPageQuery, RepositoriesPrevPageQuery, UserRepositoriesNextPageQuery, UserRepositoriesPrevPageQuery } from "../gql/graphql";
import { createEffectRq } from "../shared/api/Repositories/createEffectRq";
import { queryRepositoriesNextPage, queryRepositoriesPrevPage, queryUserRepositoriesNextPage, queryUserRepositoriesPrevPage } from "../shared/api/Repositories/queries";


type Type = {
    cursorStart: string,
    cursorEnd: string,
    repositoryCount: number,
}

export const onChangePagination = createEvent<Type>();
export const onValueChange = createEvent<string>();
export const onPageChange = createEvent<number>();

export const getRepositoriesNextPageFx = createEffectRq<RepositoriesNextPageQuery>(queryRepositoriesNextPage);
export const getRepositoriesPrevPageFx = createEffectRq<RepositoriesPrevPageQuery>(queryRepositoriesPrevPage);
export const getUserRepositoriesNextPageFx = createEffectRq<UserRepositoriesNextPageQuery>(queryUserRepositoriesNextPage);
export const getUserRepositoriesPrevPageFx = createEffectRq<UserRepositoriesPrevPageQuery>(queryUserRepositoriesPrevPage);

export const $searchValue = createStore<string>('').on(onValueChange, (_, payload) => payload);
export const $currentPage = createStore<number>(1).on(onPageChange, (_, payload) => payload);
export const $pagination = createStore<Type>({
    cursorStart: '',
    cursorEnd: '',
    repositoryCount: 1,
}).on(onChangePagination, (_, payload) => payload);

persist({
    key: 'pagination',
    store: $pagination,
});

persist({
    key: 'currentPage',
    store: $currentPage,
});

persist({
    key: 'searchValue',
    store: $searchValue,
});

sample({
    clock: [
        getRepositoriesNextPageFx.doneData,
        getRepositoriesPrevPageFx.doneData,
    ],
    fn: (data): Type => ({
        cursorStart: data.search.pageInfo.startCursor ?? "",
        cursorEnd: data.search.pageInfo.endCursor ?? "",
        repositoryCount: data.search.repositoryCount,
    }),
    target: onChangePagination,
});

sample({
    clock: [
        getUserRepositoriesNextPageFx.doneData,
        getUserRepositoriesPrevPageFx.doneData,
    ],
    fn: (data): Type => ({
        cursorStart: data.user?.repositories.pageInfo.startCursor ?? "",
        cursorEnd: data.user?.repositories.pageInfo.endCursor ?? "",
        repositoryCount: data.user?.repositories.totalCount ?? 0,
    }),
    target: onChangePagination,
});