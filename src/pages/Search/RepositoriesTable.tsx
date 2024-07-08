import React from "react";
import { request } from "graphql-request";
import { queryRepositoriesNextPage, queryRepositoriesPrevPage, queryUserRepositoriesNextPage } from "../../shared/api/Repositories/queries";
import type { RepositoriesNextPageQuery } from "../../gql/graphql";
import { Pagination } from "../../shared/components/Pagination";
import * as model from "../model";
import { useUnit } from "effector-react";
import {RepositoriesList} from "./RepositoriesList";
import { Container, Input } from "./styles";

type DataType = RepositoriesNextPageQuery["search"]["nodes"]

const VISIBLE_PAGE_COUNT = 10;

export const RepositoriesTable = React.memo(() => {
  const [data, setData] = React.useState<DataType>([]);
  const [state, onChangePage] = useUnit([model.$repositorySearchState, model.changeSearchState]);
  

  const onNext = React.useCallback(() => {
    request(`${import.meta.env.VITE_GQL_END_POINT}`, queryRepositoriesNextPage, { query: state.searchValue, cursor: state.cursorEnd }, {
      authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    }).then(data => {
      setData(data.search.nodes);
      let totalCount = data.search.repositoryCount;
      totalCount = totalCount % VISIBLE_PAGE_COUNT === 0 ? totalCount / VISIBLE_PAGE_COUNT : Math.floor(totalCount / VISIBLE_PAGE_COUNT) + 1;
      onChangePage({
        cursorStart: data.search.pageInfo.startCursor ?? "",
        cursorEnd: data.search.pageInfo.endCursor ?? "",
        pagesCount: totalCount,
        currentPage: state.currentPage + 1,
        searchValue: state.searchValue,
      });

    });
  }, [state.searchValue, state.cursorEnd]);

  const onPrev = React.useCallback(() => {
    request(`${import.meta.env.VITE_GQL_END_POINT}`, queryRepositoriesPrevPage, { query: state.searchValue, cursor: state.cursorStart }, {
      authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    }).then(data => {
      setData(data.search.nodes);
      let totalCount = data.search.repositoryCount;
      totalCount = totalCount % VISIBLE_PAGE_COUNT === 0 ? totalCount / VISIBLE_PAGE_COUNT : Math.floor(totalCount / VISIBLE_PAGE_COUNT) + 1;
      onChangePage({
        cursorStart: data.search.pageInfo.startCursor ?? "",
        cursorEnd: data.search.pageInfo.endCursor ?? "",
        pagesCount: totalCount,
        currentPage: state.currentPage - 1,
        searchValue: state.searchValue,
      });

    });
  }, [state.searchValue, state.cursorStart]);

  React.useEffect(() => {
    
    if (state.searchValue) {
      request(`${import.meta.env.VITE_GQL_END_POINT}`, queryRepositoriesNextPage, { query: state.searchValue, cursor: state.cursorEnd }, {
      authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    }).then(data => {
      setData(data.search.nodes);
      let totalCount = data.search.repositoryCount;
      totalCount = totalCount % VISIBLE_PAGE_COUNT === 0 ? totalCount / VISIBLE_PAGE_COUNT : Math.floor(totalCount / VISIBLE_PAGE_COUNT) + 1;
      onChangePage({
        cursorStart: data.search.pageInfo.startCursor ?? "",
        cursorEnd: data.search.pageInfo.endCursor ?? "",
        pagesCount: totalCount,
        currentPage: state.currentPage,
        searchValue: state.searchValue,
      });

    });
      return;
    }
    if (state.searchValue === '') {
      request(`${import.meta.env.VITE_GQL_END_POINT}`, queryUserRepositoriesNextPage, { login: `${import.meta.env.VITE_GITHUB_LOGIN}`, cursor:"" }, {
        authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      }).then(data => {
        setData(data.user?.repositories?.nodes as DataType);
        let totalCount = data.user?.repositories?.totalCount ?? 1;
        totalCount = totalCount % VISIBLE_PAGE_COUNT === 0 ? totalCount / VISIBLE_PAGE_COUNT : Math.floor(totalCount / VISIBLE_PAGE_COUNT) + 1;
        onChangePage({
          cursorStart: data.user?.repositories.pageInfo.startCursor ?? "",
          cursorEnd: data.user?.repositories.pageInfo.endCursor ?? "",
          pagesCount: totalCount,
          currentPage: 1,
          searchValue: state.searchValue,
        });
      });
    }
  }, [state.searchValue]);
  
  return (
    <Container>
      <Input type="text" placeholder="Search" value={state.searchValue} onChange={(e) => onChangePage({
        cursorStart: "",
        cursorEnd: "",
        pagesCount: 1,
        currentPage: 1,
        searchValue:e.target.value,
        })} />
      <RepositoriesList
        data={data ? data.filter(item => item?.__typename === "Repository"): []}
        />
      {state.pagesCount > 1 && <Pagination
        currentPage={state.currentPage}
        pagesCount={state.pagesCount}
        onNext={onNext}
        onPrev={onPrev}
        visiblePageCount={10}
      />}
    </Container>
  )
});
