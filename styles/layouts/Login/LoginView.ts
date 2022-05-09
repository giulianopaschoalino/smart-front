import styled from 'styled-components';

export const LoginView = styled.main<{auth: string}>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 100%;
  min-height: fit-content;
  height: 100vh;
  background-color: #f9f9f9;

  display: ${props => props.auth == '/'? null : 'none'};

  .container{
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #FFFFFF;
    height: 33rem;
    text-align: center;
    border-radius: 4px;
    width: 100%;
    max-width: 30rem;
    padding-left: 50px;
    padding-right: 50px;
    margin-left: 8rem;
  }

  @media screen and (max-width: 1008px) {
    justify-content: center;
    .container {
      margin: 0;
    }
  }

  h1{
    margin-bottom:5px;
    color: #092C4C;
  }

  h2{
    font-weight: 5;
    font-size: 21px;
    margin-bottom: 3rem;
    color: #092C4C;
  }
  input{

    width: 100%;
    height: 15rem;
    border-radius: 5px;
    margin-bottom: 10px;
    border-style: none;
    border: solid #D0D0D0 1px;
  }


  button{
    width: 100%;
    height: 18rem;
    background-image: linear-gradient(to right, #254F7F 10%, #888888 100%);
    color: white;
    font-size: 15px;
    border-radius: 5px;
    border: 0;
    margin-top: 2.5rem;
  }

  input::placeholder {
    color: #ABB3BB;
    font-size: 12px;
  }

  span {
    font-size: 12px;
    color: #254F7F;
  }

  p {
    color:#8B8B8B;
    font-size: 12px;
    margin-bottom: 22px;
  }

  fieldset {
    border-top: 0.7px solid #E1E1E1;
    border-bottom: none;
    border-left: none;
    border-right: none;
    display: block;
    text-align: center;
    width: 100%;
  }

  fieldset legend {
      padding: 19px 56px;
      color: #ABB3BB;
      font-size: 14px;
  }
`;
