import styled from "styled-components";

export const AboutUsView = styled.main`
  width: 100%;

  font-weight: 300;

  background: #F8F8F8;
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
  -webkit-box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
  -moz-box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
  border-radius: 10px;

  background-color: #FFFFFF;

  article {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    aside {
      position: relative;
      bottom: 220px;
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
