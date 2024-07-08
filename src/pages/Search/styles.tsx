import styled from "styled-components"

export const Input = styled.input`
  border-radius: 16px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  width: inherit;
  height: 32px;
  padding: 2px 16px;
  &:hover, :focus, :active {
      border: 2px solid rgba(0, 0, 0, 0.4);
  }
  &:focus {
    outline: none !important;
    border: 2px solid rgba(0, 0, 0, 0.6);
  }   
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 32px);
  gap: 32px;
`

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 16px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  padding: 12px;
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 2fr;
  line-height: 24px;
  padding: 2px;
  grid-gap: 8px;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
`
export const Item = styled.div<{$position: "start" | "end" | "center"}>`
  display: flex;
  padding: 4px 8px;
  align-items: center;
  justify-content: ${(props) => props.$position};
  &:not(:last-child) {
    border-right: 1px solid rgba(0, 0, 0, 0.25);
  }
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const Stars = styled.div`
  color: rgba(243, 200, 12, 0.6);
`
