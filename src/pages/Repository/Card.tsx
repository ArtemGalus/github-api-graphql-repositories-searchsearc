import React from "react";
import { queryRepositoryById } from "../../shared/api/Repositories/queries";
import type { RepositoryByIdQuery } from "../../gql/graphql";
import styled from "styled-components";
import { Table, Item, Row, Stars } from "../../shared/components/Table";
import { makeRequest } from "../../shared/api/makeRequest";


export const Card = React.memo<{id?: string}>((props) => {
    const { id } = props;
    const [ data, setData ] = React.useState<RepositoryByIdQuery>();

    React.useEffect(() => {
        makeRequest<RepositoryByIdQuery>(queryRepositoryById, {id: id}).then(data => setData(data.node?.__typename === "Repository" ? data : undefined));
    }, [id]);

    return (
            data?.node?.__typename === "Repository" &&
            <Container>
            <Table>    
                <Row>
                    <Item $position="start">{data?.node?.name}</Item>
                    <Item $position="end">{data?.node?.stargazerCount}<Stars>★</Stars></Item>
                    <Item $position="end">{new Date(data?.node.updatedAt).toUTCString()}</Item>
                    <Item $position="start"><a href={data?.node?.owner?.url}>{data?.node?.owner?.login}</a></Item>
                </Row>
                <Description>Описание: {data?.node?.description}</Description>
                <Description>Языки: {data?.node?.languages?.nodes?.map((item) =>`${item?.name}`).join(", ")}</Description>
            </Table>
                <img width={128} height={128} src={data?.node?.owner?.avatarUrl}></img>
            </Container>
    )
});

export const Container = styled.div`
  display: grid;
  flex-direction: row;
  flex-wrap: nowrap;
  grid-template-columns: 1fr auto;
  padding: 32px;
  flex-direction: column;
  gap: 32px;
`

export const Description = styled.div`
  margin-top: 32px;
  display: flex;
  
`
