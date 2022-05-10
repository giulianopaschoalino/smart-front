import styled from "styled-components";

export const AboutUsView = styled.main`
  width: 100%;

  p {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 17px;
    line-height: 26px;
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
  }
`
