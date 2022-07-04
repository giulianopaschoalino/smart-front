import styled from "styled-components"

export const PldTableView = styled.main`
  width: 100%;

  .actual {
    font-weight: bold!important;
    background-color: red!important;
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
    vertical-align:top;
    padding: 10px 18px;
    text-align: center;

    color: white;

    background-color: #254F7F;
  }
  .tg .tg-uulg{
    background-color:#efefef;
    font-size:14px;
    text-align:center;
    vertical-align:top
  }
  .tg .tg-gceh{
    background-color:#efefef;
    font-size:14px;
    text-align:center;
    vertical-align:top
  }
  .tg .tg-0tzy{
    font-size:14px;
    text-align:center;
    vertical-align:top
  }
  .tg .tg-hq65{
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

  .green {
    background-color: #0F9D58!important;
    color: black!important;
  }

  .dullGreen {
    background-color: #AED094!important;
    color: black!important;
  }

  .red {
    background-color: #DB4437!important;
    color: black!important;
  }

  .dullRed {
    background-color: #FFAA95!important;
    color: black!important;
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
      display: flex;
      justify-content: center;
      align-items: center;

      width: 40%;
      height: 8rem;

      margin: 40px;

      border-radius: 20px;
      box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
      -webkit-box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
      -moz-box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
      background: #F8F8F8;

      cursor: pointer;
    }
  }

  footer {
    label {
      cursor: pointer;
      margin: 20px;
    }
  }

  .btnDownload{
    margin-top: 25px;
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

  input {
    width: 20rem;
    height: 3.5rem;

    padding: 14px;

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
