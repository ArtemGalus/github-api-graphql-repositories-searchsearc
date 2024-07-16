import React from "react";
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
  const pagination = useUnit(model.$pagination);
  const [currentPage, onPageChange] = useUnit([model.$currentPage, model.onPageChange]);
  const [searchValue, onValueChange] = useUnit([model.$searchValue, model.onValueChange]);
  const [loadingNext, loadingPrev, loadingUserNext, loadingUserPrev] = useUnit([model.getRepositoriesNextPageFx.pending, model.getRepositoriesPrevPageFx.pending, model.getUserRepositoriesNextPageFx.pending, model.getUserRepositoriesPrevPageFx.pending]);

  const loading = React.useMemo(() => loadingNext || loadingPrev || loadingUserNext || loadingUserPrev, [loadingNext, loadingPrev, loadingUserNext, loadingUserPrev]);

  const onNext = React.useCallback(() => {
    if (searchValue) {
      model.getRepositoriesNextPageFx({ query: searchValue, cursor: pagination.cursorEnd }).then(data => {
        setData(data.search.nodes);
        onPageChange(currentPage + 1);
      });
      return;
    }
    model.getUserRepositoriesNextPageFx({ query: searchValue, cursor: pagination.cursorEnd }).then(data => {
      setData(data.user?.repositories?.nodes);
      onPageChange(currentPage + 1);
    });
  }, [searchValue, pagination.cursorEnd, onPageChange, currentPage]);

  const onPrev = React.useCallback(() => {
    if (searchValue) {
      model.getRepositoriesPrevPageFx({ query: searchValue, cursor: pagination.cursorStart }).then(data => {
        setData(data.search.nodes);
        onPageChange(currentPage - 1);
      });
      return;
    }
    model.getUserRepositoriesPrevPageFx({ query: searchValue, cursor: pagination.cursorStart }).then(data => {
      setData(data.user?.repositories?.nodes);
      onPageChange(currentPage - 1);
    });
  }, [searchValue, pagination.cursorStart, onPageChange, currentPage]);

  React.useEffect(() => {
    if (searchValue) {
      model.getRepositoriesNextPageFx({ query: searchValue, cursor: "" }).then(data => {
        setData(data.search.nodes);
        onPageChange(1);
      });
      return;
    }
    if (searchValue === '') {
      model.getUserRepositoriesNextPageFx({ login: `${import.meta.env.VITE_GITHUB_LOGIN}`, cursor: "" }).then(data => {
        setData(data.user?.repositories?.nodes as DataType);
        onPageChange(1);
      });
    }
    
  }, [searchValue, onPageChange]);
  
  return (
    <Container>
      <Input type="text" placeholder="Search" value={searchValue} onChange={(e) => onValueChange(e.target.value)} />
      {!loading && <RepositoriesList
        data={data ? data.filter(item => item?.__typename === "Repository"): []}
      />}
      {loading && <div>Loading...</div>}
      {!loading && <Pagination
        itemsCount={10}
        currentPage={currentPage}
        totalCount={pagination.repositoryCount}
        onNext={onNext}
        onPrev={onPrev}
        visiblePageCount={VISIBLE_PAGE_COUNT}
      />}
    </Container>
  )
});
