import styled from "styled-components";

export const NewsView = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  width: 100%;

  margin-bottom: 100px;

  .description {
    a {
      display: none;
    }
    p {
      :last-child {
        display: none;
      }
    }
    .read-more {
      display: none;
    }
  }

  p {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 17px;
    line-height: 26px;
  }
  h2{
    color: #254F7F;
  }

  ul {
    list-style: none;

    li {
      display: flex;
      margin-bottom: 8px;
    }
    button{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      width: 140px;
      height: 45px;
      cursor: pointer;
      background: #254F7F;
      border-radius: 8px;
      border-style: none;
      font-family: 'Poppins';
      font-size: 90%;
      color: #FFFFFF;
    }
  }

  section {
    article {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      aside {
        display: flex;
        justify-content: center;
        align-items: center;

        width: fit-content;

        flex-direction: column;
      }
    }
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1px;

    width: 170px;
    height: 45px;

    cursor: pointer;

    background: #dadada;
    border-radius: 8px;
    border-style: none;

    font-family: 'Poppins';
    font-size: 90%;

    transition: all 350ms ease-in;

    :hover {
      transform: scale(1.02);
      opacity: 0.9;
      box-shadow: rgb(0, 0, 0, 0.2) 0px 2px 4px -1px;
    }

    color: #000;
  }
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;

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
      /* padding: 25px 4px; */
      color: #ABB3BB;
      font-size: 14px;
  }

`;
