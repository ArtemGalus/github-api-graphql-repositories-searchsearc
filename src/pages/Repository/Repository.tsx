import React from "react";
import { useParams } from "react-router-dom";
import { Card } from "./Card";
import styled from "styled-components";


export const Repository = React.memo(() => {
    const {id} = useParams();
    return (
       <Card id={id}/>
        
    )
});

export const Container = styled.div`
  display: flex;
  padding: 32px;
  width: calc(100% - 32px);
`