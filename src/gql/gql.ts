/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query RepositoriesNextPage ($query: String!, $cursor: String!) {\n        search(type: REPOSITORY, query: $query, first:10, after: $cursor) {\n            repositoryCount,\n            nodes {\n                __typename\n                ... on Repository {\n                    id,\n                    name,\n                    stargazerCount,\n                    url,\n                    updatedAt,\n                }\n            }\n            pageInfo {\n                startCursor,\n                endCursor,\n                hasNextPage\n            }\n        },\n    }": types.RepositoriesNextPageDocument,
    "\n    query RepositoriesPrevPage ($query: String!, $cursor: String!) {\n        search(type: REPOSITORY, query: $query, last:10, before: $cursor) {\n            repositoryCount,\n            nodes {\n                __typename\n                ... on Repository {\n                    id,\n                    name,\n                    stargazerCount,\n                    url,\n                    updatedAt,\n                }\n            }\n            pageInfo {\n                startCursor,\n                endCursor,\n            }\n        },\n    }": types.RepositoriesPrevPageDocument,
    "\n    query UserRepositoriesNextPage($login: String!, $cursor: String!) {\n        user(login: $login) {\n            repositories(first:10 after: $cursor) {\n                totalCount,\n                pageInfo {\n                    startCursor,\n                    endCursor,\n                },\n                nodes {\n                    __typename,\n                    id,\n                    name,\n                    stargazerCount,\n                    url,\n                    updatedAt,\n                }\n            }\n        }\n    }": types.UserRepositoriesNextPageDocument,
    "\n    query UserRepositoriesPrevPage($login: String!, $cursor: String!) {\n        user(login: $login) {\n            repositories(first:10 before: $cursor) {\n                totalCount,\n                pageInfo {\n                    startCursor,\n                    endCursor,\n                },\n                nodes {\n                    __typename,\n                    name,\n                    id,\n                    stargazerCount,\n                    url,\n                    updatedAt,\n                }\n            }\n        }\n    }": types.UserRepositoriesPrevPageDocument,
    "\n    query RepositoryById($id: ID!){ \n        node(id: $id){\n            __typename,\n            ... on Repository {\n                name,\n                stargazerCount,\n                updatedAt,\n                description,\n                languages(first: 20) {\n                    nodes{\n                        name\n                    }\n                }\n                owner {\n                    avatarUrl,\n                    login,\n                    url\n                }\n            }\n        }\n    }": types.RepositoryByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query RepositoriesNextPage ($query: String!, $cursor: String!) {\n        search(type: REPOSITORY, query: $query, first:10, after: $cursor) {\n            repositoryCount,\n            nodes {\n                __typename\n                ... on Repository {\n                    id,\n                    name,\n                    stargazerCount,\n                    url,\n                    updatedAt,\n                }\n            }\n            pageInfo {\n                startCursor,\n                endCursor,\n                hasNextPage\n            }\n        },\n    }"): (typeof documents)["\n    query RepositoriesNextPage ($query: String!, $cursor: String!) {\n        search(type: REPOSITORY, query: $query, first:10, after: $cursor) {\n            repositoryCount,\n            nodes {\n                __typename\n                ... on Repository {\n                    id,\n                    name,\n                    stargazerCount,\n                    url,\n                    updatedAt,\n                }\n            }\n            pageInfo {\n                startCursor,\n                endCursor,\n                hasNextPage\n            }\n        },\n    }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query RepositoriesPrevPage ($query: String!, $cursor: String!) {\n        search(type: REPOSITORY, query: $query, last:10, before: $cursor) {\n            repositoryCount,\n            nodes {\n                __typename\n                ... on Repository {\n                    id,\n                    name,\n                    stargazerCount,\n                    url,\n                    updatedAt,\n                }\n            }\n            pageInfo {\n                startCursor,\n                endCursor,\n            }\n        },\n    }"): (typeof documents)["\n    query RepositoriesPrevPage ($query: String!, $cursor: String!) {\n        search(type: REPOSITORY, query: $query, last:10, before: $cursor) {\n            repositoryCount,\n            nodes {\n                __typename\n                ... on Repository {\n                    id,\n                    name,\n                    stargazerCount,\n                    url,\n                    updatedAt,\n                }\n            }\n            pageInfo {\n                startCursor,\n                endCursor,\n            }\n        },\n    }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query UserRepositoriesNextPage($login: String!, $cursor: String!) {\n        user(login: $login) {\n            repositories(first:10 after: $cursor) {\n                totalCount,\n                pageInfo {\n                    startCursor,\n                    endCursor,\n                },\n                nodes {\n                    __typename,\n                    id,\n                    name,\n                    stargazerCount,\n                    url,\n                    updatedAt,\n                }\n            }\n        }\n    }"): (typeof documents)["\n    query UserRepositoriesNextPage($login: String!, $cursor: String!) {\n        user(login: $login) {\n            repositories(first:10 after: $cursor) {\n                totalCount,\n                pageInfo {\n                    startCursor,\n                    endCursor,\n                },\n                nodes {\n                    __typename,\n                    id,\n                    name,\n                    stargazerCount,\n                    url,\n                    updatedAt,\n                }\n            }\n        }\n    }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query UserRepositoriesPrevPage($login: String!, $cursor: String!) {\n        user(login: $login) {\n            repositories(first:10 before: $cursor) {\n                totalCount,\n                pageInfo {\n                    startCursor,\n                    endCursor,\n                },\n                nodes {\n                    __typename,\n                    name,\n                    id,\n                    stargazerCount,\n                    url,\n                    updatedAt,\n                }\n            }\n        }\n    }"): (typeof documents)["\n    query UserRepositoriesPrevPage($login: String!, $cursor: String!) {\n        user(login: $login) {\n            repositories(first:10 before: $cursor) {\n                totalCount,\n                pageInfo {\n                    startCursor,\n                    endCursor,\n                },\n                nodes {\n                    __typename,\n                    name,\n                    id,\n                    stargazerCount,\n                    url,\n                    updatedAt,\n                }\n            }\n        }\n    }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query RepositoryById($id: ID!){ \n        node(id: $id){\n            __typename,\n            ... on Repository {\n                name,\n                stargazerCount,\n                updatedAt,\n                description,\n                languages(first: 20) {\n                    nodes{\n                        name\n                    }\n                }\n                owner {\n                    avatarUrl,\n                    login,\n                    url\n                }\n            }\n        }\n    }"): (typeof documents)["\n    query RepositoryById($id: ID!){ \n        node(id: $id){\n            __typename,\n            ... on Repository {\n                name,\n                stargazerCount,\n                updatedAt,\n                description,\n                languages(first: 20) {\n                    nodes{\n                        name\n                    }\n                }\n                owner {\n                    avatarUrl,\n                    login,\n                    url\n                }\n            }\n        }\n    }"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;