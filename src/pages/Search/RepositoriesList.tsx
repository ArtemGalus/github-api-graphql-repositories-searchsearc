import React from "react";
import { Table, Row, Item, Stars } from "./styles";
import type { RepositoriesNextPageQuery } from "../../gql/graphql";
import { Link } from "react-router-dom";


type T = RepositoriesNextPageQuery["search"]["nodes"];
type V = NonNullable<T>[number];
export type DataType = {
  data: Extract<V, {__typename: "Repository", name: string, stargazerCount: number, url: string, updatedAt: string}>[];
}

export const RepositoriesList = React.memo<DataType>((props) => {
    const { data } = props;
  return (
      <Table>
          {data.map((item, index) => {
              return (
                <Row key={index}>
                  <Item $position="start"><Link to={`/repository/${item.id}`}>{item.name}</Link></Item>
                  <Item $position="end">{item.stargazerCount}<Stars>★</Stars></Item>
                  <Item $position="end">{new Date(item.updatedAt).toUTCString()}</Item>
                  <Item $position="start"><a href={item.url}>{item.url}</a></Item>
                </Row>
              )
          })}
      </Table>
  )
});
