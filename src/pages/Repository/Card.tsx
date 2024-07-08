import React from "react";
import request from "graphql-request";
import { queryRepositoryById } from "../../shared/api/Repositories/queries";
import type { QueryRepositoryByIdQuery } from "../../gql/graphql";
import styled from "styled-components";
import { Table, Item, Row, Stars } from "../../shared/components/Table"; 


export const Card = React.memo<{id?: string}>((props) => {
    const { id } = props;
    const [ data, setData ] = React.useState<QueryRepositoryByIdQuery>();

    React.useEffect(() => {
        request(`${import.meta.env.VITE_GQL_END_POINT}`, queryRepositoryById, { id: id ?? "" }, {
            authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        }).then(data => setData(data.node?.__typename === "Repository" ? data : undefined));
    }, []);

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
                    <Description>{`Языки:\ `}{data?.node?.languages?.nodes?.map((item) =>`${item?.name}`).join(", ")}{`\ `}</Description>
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
