import styled from 'styled-components'

export const TableView = styled.div`
  display: flex;

  padding: 2.5rem;

  justify-content: center;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  height: 100%;


  img{
    margin-left:30rem;
  }

  .btn{
    margin-top: 10px;
  }

  .tg{
    border-collapse:collapse;
    border-spacing:0;
    font-family:Poppins;
    width: 100%;
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
`;

export const TableHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  width: 100%;

  margin-bottom: 25px;

  .select{
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    width: 30rem;

    div {
      display: flex;
      justify-content: space-between;

      align-items: flex-start;
      flex-direction: column;

      width: 95%;
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

  background-color: #EFEFEF;

  width: 100%;

  border: rgb(221,223,225);
  border-style:solid;
  border-width: 1px;

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
