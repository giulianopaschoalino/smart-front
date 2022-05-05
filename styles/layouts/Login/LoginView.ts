import styled from 'styled-components';

export const LoginView = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10rem;

  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #F9F9F9;
    height: 34rem;
    width: 49rem;
    margin-left: 10rem;
    margin-top:4rem;
    color: #092C4C;
    text-align: center;
    border-radius: 4px;

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
    width: 30rem;
    height: 15rem;
    border-radius: 5px;
    margin-bottom: 10px;
    border-style: none;
    border: solid #D0D0D0 1px;

  }

  button{
    width: 30rem;
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
  span{
    margin-left: 23rem;
    font-size: 12px;
    color: #254F7F;


  }
  p{
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
    width: 30rem;


  }
  fieldset legend {
      padding: 19px 56px;
      color: #ABB3BB;
      font-size: 14px;
  }
  img{
    /* background-color: black; */
    display: none;
  }



  @media (max-width: 1150px) {
  img{visibility:hidden }
  }




`;
