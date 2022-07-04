import styled from "styled-components";

export const AboutUsView = styled.main`
  width: 100%;

  font-weight: 300;

  article {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    aside {
      position: absolute;
      margin-bottom: 150px;

      display: flex;
      justify-content: center;
      align-items: center;

      width: fit-content;

      flex-direction: column;
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
