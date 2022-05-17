import styled from "styled-components"

export const ChartView = styled.div`
  width: 90%;

  @media (max-width: 900px) {
    min-width: 20rem
  }
`

export const ChartTitleView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  * {
    margin: 0;
  }
`
