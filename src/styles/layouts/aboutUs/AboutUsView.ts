import styled from "styled-components";

export const AboutUsView = styled.main`
  width: 100%;

  p {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 80%;
    line-height: 26px;
  }

  ul {
    list-style: none;

    li {
      display: flex;
      margin-bottom: 8px;

      font-size: 98.98%;
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

  @media (max-width: 1008px) {
    li {
      font-size: 170%!important;
    }

    img {
      width: 200px;
    }
  }
`
