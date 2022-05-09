import styled from "styled-components";

export const GrossSavingsView = styled.main`
  display: flex;
  flex-direction: column;

  width: 100%;

  span {
    color: #969BA0;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }

  section {
    margin-bottom: 160px;

    canvas {
      max-height: 30rem;
    }
  }
`
