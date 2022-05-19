import styled from "styled-components";

export const NewsView = styled.main`
  width: 100%;

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
}`;

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
