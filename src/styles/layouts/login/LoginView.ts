
import styled from 'styled-components';

export const LoginView = styled.main<{auth: string}>`
  display: flex;
  display: ${props => props.auth == '/'? null : 'none'};
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  height: 100vh;

  padding: 0;
  margin: 0;

  @media (max-width: 1196px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    height: 100%;

    padding: 100px;
  }
`;

export const LoginContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  width: 40%;
  margin-left: 60px;

  border-radius: 10px;

  background-color: #FFF;

  h1{
    margin-bottom:5px;
    color: #092C4C;
  }

  h2{
    font-weight: 5;
    font-size: 21px;
    margin-bottom: 3rem;
    color: #092C4C;
    font-weight: 300;
    text-align: center;
  }

  .line {
    border-top: 0.7px solid #E1E1E1;
    border-bottom: none;
    border-left: none;
    border-right: none;
    display: block;
    text-align: center;
    width: 90%;
  }

  .line .text {
    padding: 19px 56px;
    color: #ABB3BB;
    font-size: 14px;
  }

  span{
    display: flex;
    align-self: flex-end;
    margin-right: 5%;
    justify-content: flex-end;
    cursor: pointer;
  }
  a {
    :nth-child(5) {
      align-self: flex-end;
      margin-right: 5%;
      margin-bottom: 40px;
      color: #5d83fc;
    }
  }

  p{
    color: #8B8B8B;
    text-align: center;
    margin-top: 1px;
  }

  @media (max-width: 1196px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    margin: 0;
  }
  @media (max-width: 1640px) {
    font-size: 80%;
    h2 {
      font-size: 16px;
    }

    input {
      height: 1.5rem;
    }
  }
`;
