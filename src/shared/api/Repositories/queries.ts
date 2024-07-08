import { graphql } from "../../../gql";

export const queryRepositoriesNextPage = graphql(`
    query RepositoriesNextPage ($query: String!, $cursor: String!) {
        search(type: REPOSITORY, query: $query, first:10, after: $cursor) {
            repositoryCount,
            nodes {
                __typename
                ... on Repository {
                    id,
                    name,
                    stargazerCount,
                    url,
                    updatedAt,
                }
            }
            pageInfo {
                startCursor,
                endCursor,
                hasNextPage
            }
        },
    }`
);


export const queryRepositoriesPrevPage = graphql(`
    query RepositoriesPrevPage ($query: String!, $cursor: String!) {
        search(type: REPOSITORY, query: $query, last:10, before: $cursor) {
            repositoryCount,
            nodes {
                __typename
                ... on Repository {
                    id,
                    name,
                    stargazerCount,
                    url,
                    updatedAt,
                }
            }
            pageInfo {
                startCursor,
                endCursor,
            }
        },
    }`
);

export const queryUserRepositoriesNextPage = graphql(`
    query queryUserRepositoriesNextPage($login: String!, $cursor: String!) {
        user(login: $login) {
            repositories(first:10 after: $cursor) {
                totalCount,
                pageInfo {
                    startCursor,
                    endCursor,
                },
                nodes {
                    __typename,
                    id,
                    name,
                    stargazerCount,
                    url,
                    updatedAt,
                }
            }
        }
    }`
);

export const queryUserRepositoriesPrevPage = graphql(`
    query queryUserRepositoriesPrevPage($login: String!, $cursor: String!) {
        user(login: $login) {
            repositories(first:10 before: $cursor) {
                totalCount,
                pageInfo {
                    startCursor,
                    endCursor,
                },
                nodes {
                    __typename,
                    name,
                    id,
                    stargazerCount,
                    url,
                    updatedAt,
                }
            }
        }
    }`
);

export const queryRepositoryById = graphql(`
    query queryRepositoryById($id: ID!){ 
        node(id: $id){
            __typename,
            ... on Repository {
                name,
                stargazerCount,
                updatedAt,
                description,
                languages(first: 20) {
                    nodes{
                        name
                    }
                }
                owner {
                    avatarUrl,
                    login,
                    url
                }
            }
        }
    }`
);
