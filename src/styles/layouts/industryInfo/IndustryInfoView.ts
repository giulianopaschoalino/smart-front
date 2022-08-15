import styled from "styled-components";

export const IndustryInfoView = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;

  background: #F8F8F8;
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
  -webkit-box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
  -moz-box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
  border-radius: 10px;

  background-color: #FFFFFF;

  .title {
    margin-bottom: 50px;
  }

  p {
    text-align: justify!important;
  }

  button{
    height: 70px;
    width: 30%;
    cursor: pointer;
    background: #254F7F;
    border-radius: 8px;
    border-style: none;
    font-family: 'Poppins';
    font-size: 90%;
    color: #FFFFFF;
    margin-top: 30px;
  }

  form {
    label {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 150px;
      margin-left: 10px;
      transform: translateY(20px);
      background-color: #254F7F;
      color: white;
      border-radius: 8px;
    }
  }

  input[type="file"] {
    padding-top: 20px;
    padding-left: 41px;
    width: 350px;
    height: 60px;
    border: 1px solid black;
    border-radius: 6px;
  }

  article {
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    p {
      text-align: justify;
      width: 75%
    }
  }
`
