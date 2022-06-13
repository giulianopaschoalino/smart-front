import styled from "styled-components";

export const ClientsView = styled.main`
  display: flex;
  flex-direction: column;

  width: 100%;

  section {
    display: flex;

    width: 100%;

    :nth-child(3) {
      justify-content: space-between;

      width: 18rem;

      margin: 45px 0 22px 0;
    }
  }
  .btn2{
      background: #254F7F;
      border-radius: 8px;
      color: white;
      width: 164px;
      height: 48px;
      border: none;
      margin-top: 10px;
  }
  .btn1{
      background:#FFBC10;
      border-radius: 8px;
      color: white;
      width: 164px;
      height: 48px;
      border: none;
      margin-top: 10px;
      margin-left: 4px;
  }
  .buttons{
    display: flex;
    margin-top: 40px;

  }
`

export const ClientsModalView = styled.main`
  display: flex;
  flex-direction: column;

  width: 70%;
  article {
    display: grid;

    align-self: flex-start;
    width: 100%;

    grid-template-columns: 80% 80%;
    grid-template-rows: 50% 50%;

    margin-top: 70px
  }
`

export const ConfirmModalView = styled.main`
  display: flex;
  align-items: center;
  justify-content: space-around;

  margin: 0;
  padding: 0;

  width: 100%;
  height: 100%;


`
