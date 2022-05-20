import styled from 'styled-components'


export const TableView = styled.div`
  display: flex;
  padding: 2.5rem;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;

  .select{
    display: flex;


    margin-bottom: 25px;

    width: 20rem;
  }
  .titleUnidade{

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
    padding:17px 30px;
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
    color:#464a53;
    font-size:13px;
    text-align:center;
    vertical-align:top;
    padding: 10px 18px;
    text-align: center;
  }
  .tg .tg-uulg{
    background-color:#efefef;
    color:#abafb3;
    font-size:14px;
    text-align:center;
    vertical-align:top
  }
  .tg .tg-gceh{
    background-color:#efefef;
    color:#6a707e;
    font-size:14px;
    text-align:center;
    vertical-align:top
  }
  .tg .tg-0tzy{
    color:#abafb3;
    font-size:14px;
    text-align:center;
    vertical-align:top
  }
  .tg .tg-hq65{color:#6a707e;
    font-size:14px;
    text-align:center;
    vertical-align:top
  }

  .tg .tg-baqh{
    text-align:center;
    vertical-align:top
  }
  .tg .tg-0lax{
    text-align:left;
    vertical-align:top
  }
  .tg .tg-womg{
    background-color:#dddfe1;
    text-align:center;
    vertical-align:top
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
`;

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



`;

