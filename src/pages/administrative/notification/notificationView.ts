import styled from 'styled-components'



export const NotificationView = styled.nav`
   display: flex;
  align-items: center;

  flex-direction: column;

  width: 100%;

  h1 {
    font-weight: 700;
    font-size: calc(90% + 2rem);
    line-height: 72px;
    text-align: center;
    letter-spacing: 0.5px;
  }

  p {
    font-weight: 400;
    font-size: 99.98%;
    line-height: 21px;
    text-align: center;
    letter-spacing: 0.5px;

    color: #AAAAAA;
  }

  .CommonQuestionsSection {
    width: 80%;
  }

  hr {
    border: 1px solid #DDDDDD;
  }

  /* .modal{
    display: flex;
    justify-self: flex-end;
    align-self: center;
    margin-left: 100px;

  } */
  .btn2{
      background: #254F7F;
      border-radius: 8px;
      color: white;
      width: 164px;
      height: 45px;
      border: none;
      margin-top: 10px;
  }
  .btn1{
      background:#FFBC10;
      border-radius: 8px;
      color: white;
      width: 164px;
      height: 45px;
      border: none;
      margin-top: 10px;
      margin-left: 6px;
  }
  .buttons{
    display: flex;
    justify-content: flex-start;
    align-self: flex-start;
    margin-top: 45px;
    margin-left: 16px;

  }
  .title{
    display: flex;
    justify-content: flex-start;
    align-self: flex-start;
    margin-left: 16px;
  }




`
