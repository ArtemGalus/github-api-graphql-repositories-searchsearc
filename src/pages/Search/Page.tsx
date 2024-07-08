import React from "react";
import styled from "styled-components";
import { RepositoriesTable } from "./RepositoriesTable";

export const Search = React.memo(() => {
  
  return (
    <Container>
      <RepositoriesTable />
    </Container>
  )
});

const Container = styled.div`
  position: relative ;
  display: flex;
  padding: 32px;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 32px);
  gap: 32px;
`
