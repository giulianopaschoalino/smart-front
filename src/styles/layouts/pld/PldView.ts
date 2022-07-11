import styled from "styled-components"

export const PldTableMinMaxView = styled.div`
  width: 100%;

  border-radius: 8px!important;

  border-color:#DDDFE1;
  border-style:solid;
  border-width: 1px;

  background-color: #EFEFEF;

  margin-top: 15px;

  table {
    p {
      font-size: 12px;
    }
  }

  .actual {
    font-weight: bold!important;
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
    font-size:20px;
    text-align:center;
    vertical-align:center;
    padding: 10px 18px;
    text-align: center;

    color: white;

    background-color: #254F7F;
  }
  .tg .tg-uulg{
    font-size:14px;
    text-align:center;
    vertical-align:top;

    :first-child {
      background-color: red;
    }
    :last-child {
      border-right-color: transparent;
    }
  }

  .tg .tg-gceh{
    font-size:14px;
    text-align:center;
    vertical-align:top;
    :first-child {
      border-left-color: transparent;
    }
  }

  table, th:last-child{
    border: transparent;
    border-top-right-radius: 8px;
  }

  table, th:first-child {
    border: transparent;
    border-top-left-radius: 8px;
  }

  h3{
    font-weight: 600;
    font-size: 22px;
    line-height: 54px;

    color: #254F7F;
  }

  .images {
    display: flex;
    justify-content: space-around;
    align-items: center;

    margin: 40px;
  }

  section {
    display: flex;
    justify-content: center;
    align-items: center;

    article {
      position: relative;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 40%;
      height: 8rem;

      margin: 40px;

      background: #255488;
      color: white;

      border-radius: 8px;
      box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
      -webkit-box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
      -moz-box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;

      cursor: pointer;

      background: darken($red, 1.5%);

      background: linear-gradient(200.69deg, #254f7f 9%, #3183e0 98%), #FFFFFF;

      :hover {
        transition: all 0.2s linear;
        transform: scale(1.1);
      }

      svg {
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }

      rect {
        fill: none;
        stroke: #fff;
        stroke-width: 2;
        stroke-dasharray: 422, 0;
        transition: all 0.35s linear;
      }
    }

    .btn-1:hover {
      background: rgba($red, 0);
      letter-spacing: 1px;


      rect {
        stroke-width: 5;
        stroke-dasharray: 15, 310;
        stroke-dashoffset: 48;
        transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
      }
    }
  }

  footer {
    label {
      cursor: pointer;
      margin: 20px;
    }
  }

  .btnDownload{
    width: fit-content;
    margin-bottom: 15px;
    :hover {
      position: relative;
      transition: all 0.2s linear;
      transform: translateY(-6px);
    }
  }

  .space {
    background-color: #F7F7F7;

    border-color: transparent;

    border-bottom-color: #DDDFE1;

    height: 15px!important;

    padding: 0!important;
  }
`
export const PldTableView = styled.div`
  width: 100%;

  border-radius: 8px!important;

  border-color:#DDDFE1;
  border-style:solid;
  border-width: 1px;

  background-color: #EFEFEF;

  margin-top: 38px;

  table {
    p {
      font-size: 12px;
    }
  }

  .actual {
    font-weight: bold!important;
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
    font-size:20px;
    text-align:center;
    vertical-align:center;
    padding: 10px 18px;
    text-align: center;

    color: white;

    background-color: #254F7F;
  }
  .tg .tg-uulg{
    font-size:14px;
    text-align:center;
    vertical-align:top;

    :first-child {
      background-color: red;
    }
    :last-child {
      border-right-color: transparent;
    }
  }

  .tg .tg-gceh{
    font-size:14px;
    text-align:center;
    vertical-align:top;
    :first-child {
      border-left-color: transparent;
    }
  }

  table, th:last-child{
    border: transparent;
    border-top-right-radius: 8px;
  }

  table, th:first-child {
    border: transparent;
    border-top-left-radius: 8px;
  }

  h3{
    font-weight: 600;
    font-size: 22px;
    line-height: 54px;

    color: #254F7F;
  }

  .images {
    display: flex;
    justify-content: space-around;
    align-items: center;

    margin: 40px;
  }

  section {
    display: flex;
    justify-content: center;
    align-items: center;

    article {
      position: relative;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 40%;
      height: 8rem;

      margin: 40px;

      background: #255488;
      color: white;

      border-radius: 8px;
      box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
      -webkit-box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
      -moz-box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;

      cursor: pointer;

      background: darken($red, 1.5%);

      background: linear-gradient(200.69deg, #254f7f 9%, #3183e0 98%), #FFFFFF;

      :hover {
        transition: all 0.2s linear;
        transform: scale(1.1);
      }

      svg {
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }

      rect {
        fill: none;
        stroke: #fff;
        stroke-width: 2;
        stroke-dasharray: 422, 0;
        transition: all 0.35s linear;
      }
    }

    .btn-1:hover {
      background: rgba($red, 0);
      letter-spacing: 1px;


      rect {
        stroke-width: 5;
        stroke-dasharray: 15, 310;
        stroke-dashoffset: 48;
        transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
      }
    }
  }

  footer {
    label {
      cursor: pointer;
      margin: 20px;
    }
  }

  .btnDownload{
    width: fit-content;
    margin-bottom: 15px;
    :hover {
      position: relative;
      transition: all 0.2s linear;
      transform: translateY(-6px);
    }
  }

  .space {
    background-color: #F7F7F7;

    border-color: transparent;

    border-bottom-color: #DDDFE1;

    height: 15px!important;

    padding: 0!important;
  }
`

export const PldGraphView = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
  flex-wrap: wrap;

  width: 100%;

  .MuiOutlinedInput-input {
    height: 30px;

    outline: none;
    border: none;
  }

  .select {
    width: 20rem;
  }

  .toolsbar {
    display: flex;
    justify-content: center;
    align-items: flex-start!important;

    flex-direction: row;

    padding-bottom: 13px;

    p {
      margin: 0;
    }
  }
  .toolsbar2 {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start!important;

    flex-direction: column;

    margin-bottom: 9px;

    /* transform: translateY(-8px); */

    p {
      margin: 0;
    }
  }

  input {
    width: 16.6rem;
    height: 3.5rem;

    /* padding: 14px; */

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;

    border-radius: 6px;
    border: solid gray 1px;

    background-color: #F9F9F9;
  }

  section {
    display: flex;
    align-items: center;

    flex-wrap: wrap;

    :first-child {
      justify-content: flex-start;
      align-items: center;
    }
    :nth-child(2) {
      margin-top: 50px;
      margin-bottom: 50px;
      justify-content: space-evenly;
    }

    width: 100%;
  }



  footer {
    label {
      cursor: pointer;
      margin: 20px;
    }
  }
`

export const GoBack = styled.label`
  cursor: pointer;
`

export const NewTableLine = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  flex-direction: column;

  margin: 50px 0px 0px 0;

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

export const TableHeader = styled.label`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  flex-direction: row;

  padding: 0 40px 0 40px
`
