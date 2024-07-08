import React from "react";
import styled from "styled-components";

type Props = {
    visiblePageCount: number;
    currentPage: number;
    pagesCount: number;
    onNext: () => void;
    onPrev: () => void;
}
export const Pagination = (props: Props) => {
    const { visiblePageCount, onNext, onPrev, currentPage, pagesCount } = props;

    const start = React.useMemo(() => {
      if (currentPage - Math.floor(visiblePageCount / 2) <= 0) {
        return 1;
      }
      return currentPage - Math.floor(visiblePageCount / 2);
    }, [currentPage, visiblePageCount]);

    const end = React.useMemo(() => {
      if (visiblePageCount > pagesCount) {
        return pagesCount;
      }
      if (start + visiblePageCount - 1 > pagesCount) {
        return pagesCount;
      }
      return start + visiblePageCount - 1;
    }, [currentPage, visiblePageCount, pagesCount, start]);
    
    return (
        <Container>
            <Button onClick={onPrev} disabled={pagesCount === 1 || currentPage === 1}>{"<"}</Button>
            {Array.from(new Array(end - start + 1), (_, i) => i + start).map((item) => {
                return <Page $isCurrent={currentPage === item} key={item}>{item}</Page>;
            })}
            <Button onClick={onNext} disabled={pagesCount === 1 || currentPage === pagesCount}>{">"}</Button>
        </Container>
    )
}

const Container = styled.div`
  position: relative ;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 4px;
`

const Button = styled.button`
  border-radius: 8px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  width: 32px;
  height: 32px;
  cursor: pointer;
  background: rgba(255, 255, 255, 1);
  
  &:hover {
    border: 2px solid rgba(0, 0, 0, 0.4);
  }
  &:active {
    border: 2px solid rgba(0, 0, 0, 0.6);
  }
  &:disabled {
    border: 2px solid rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.05);
    cursor: not-allowed;
  }
`

const Page = styled.div<{ $isCurrent: boolean }>`
  display: flex;
  justify-content: center;
  font-size: 18px;
  padding: 0 2px;
  color: ${p => p.$isCurrent ? "rgba(0, 0, 240, 0.8)" : "rgba(0, 0, 0, 0.5)"};
`