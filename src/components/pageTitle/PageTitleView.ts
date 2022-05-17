import styled from "styled-components";

export const PageTitleView = styled.div`
display: flex;
justify-content: center;
align-items: flex-start;

flex-direction: column;

width: 100%;

h1 {
  margin: 0;
}

p {
  margin: 0;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 99%;
  line-height: 27px;

  color: #969BA0;
}

  @media (max-width: 1640px) {
    font-size: 15px;
  }
`
