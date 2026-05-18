import styled from 'styled-components'

export const TableView = styled.div`
  display: flex;

  padding: 2.5rem;

  justify-content: center;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-x: auto;

  -webkit-overflow-scrolling: touch;

  .btn{
    margin-top: 10px;
  }

  .tg{
    border-collapse:collapse;
    border-spacing:0;
    font-family:Poppins;
    width: 100%;
    min-width: 920px;
    table-layout: fixed;
  }

  .tg td{
    border-color:#DDDFE1;
    border-style:solid;
    border-width:1px;
    font-family:Poppins;
    font-size: 10px;
    overflow:hidden;
    padding: 17px 20px;
    word-break:normal;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .tg th{
    border-color:#DDDFE1;
    border-style:solid;
    border-width:1px;
    font-family:Poppins;
    font-size:10px;
    font-weight:500;
    overflow:hidden;
    padding:10px 5px;
    word-break:normal;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .tg .tg-8oo6{
    font-size:14px;
    text-align:center;
    vertical-align:top;
    padding: 10px 18px;
    text-align: center;

    color: white;

    background-color: #254F7F;
  }

  .tg .tg-gceh{
    background-color: transparent;
    color:#6a707e;
    font-size:14px;
    text-align:center;
    vertical-align:top;
  }

  h3{
    font-weight: 600;
    font-size: 22px;
    line-height: 54px;

    color: #254F7F;
  }

  .teste {
    width: 10rem;
  }

  table, th {
    vertical-align: middle;
  }

  table, th:last-child {
    border: transparent;
    border-top-right-radius: 8px;
  }

  table, th:first-child {
    border: transparent;
    border-top-left-radius: 8px;
  }

  table, td {
    border: transparent;
    border-top-left-radius: 8px;

    text-overflow: ellipsis;
  }

  @media (max-width: 1024px) {
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .tg td,
    .tg th {
      padding-left: 12px;
      padding-right: 12px;
    }
  }
`;

export const TableHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1rem;

  width: 100%;

  margin-bottom: 25px;

  article {
    min-width: 0;
  }

  article:first-child {
    flex: 1 1 32rem;
  }

  article:last-child {
    flex: 0 0 auto;
  }

  .select{
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;

    width: 100%;
    max-width: 42rem;

    > div {
      display: flex;
      justify-content: space-between;

      align-items: flex-start;
      flex-direction: column;

      flex: 1 1 16rem;
      min-width: 0;
      width: auto;
    }
  }

  @media (max-width: 768px) {
    align-items: stretch;

    article:first-child,
    article:last-child {
      flex: 1 1 100%;
    }

    .select {
      max-width: 100%;
    }
  }
`

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .number{
    color: #2E5581;
  }
  .numberColor{
    color: #ABAFB3;
  }
`

export const NewTableLine = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  flex-direction: column;

  margin: 0 0 15px 0;

  width: 100%;
  article {
    display: flex;
    justify-content: space-between;
    align-items: center;

    flex-direction: row;

    width: 100%;

    margin: 0 0 10px 0;
  }
`

export const TableBodyView = styled.section`
  border-radius: 8px;

  background-color: #fff;

  width: 100%;

  border: rgb(221,223,225);
  border-style:solid;
  border-width: 1px;

  background: #F8F8F8;
	box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
	-webkit-box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
	-moz-box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
  border-radius: 10px;

  tr {
    :last-child {
      /* background-color: red; */

      border-bottom-color: transparent;

      td {
        :first-child {
          border-left-color: transparent;
          border-bottom-color: transparent;
          /* background-color: red; */
        }
        :last-child {
          border-right-color: transparent;
          border-bottom-color: transparent;
        }
      }
    }
  }
`
