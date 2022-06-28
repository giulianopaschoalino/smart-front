import styled from "styled-components";

export const IndustryInfoView = styled.main`
  display: flex;
  flex-direction: column;

  width: 100%;

  .title {
    margin-bottom: 50px;
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
  }
  .inputTeste{
    display: flex;
    align-items: center;
    width: 50%;
    height: 50px;
    background: white;
    border-radius:10px;
  }

  input[type="file"] {
    display: block;
  }

  label {
    display: flex;
    justify-content: flex-start;
    padding: 2px 10px;
    width: 200px;
    background-color: #333;
    color: #FFF;
    text-transform: uppercase;
    text-align: center;
    display: block;
    margin-top: 10px;
    cursor: pointer;
  }



`
