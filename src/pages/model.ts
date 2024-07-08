import { createEvent, createStore } from "effector";
import { persist } from "effector-storage/local";

type Type = {
    cursorStart: string,
    cursorEnd: string,
    pagesCount: number,
    currentPage: number,
    searchValue: string,
}

export const changeSearchState = createEvent<Type>();

export const $repositorySearchState = createStore<Type>({
    cursorStart: '',
    cursorEnd: '',
    pagesCount: 1,
    currentPage: 1,
    searchValue: '',
}).on(changeSearchState, (_, payload) => payload);

persist({
    key: 'repositorySearchState',
    store: $repositorySearchState,
});
