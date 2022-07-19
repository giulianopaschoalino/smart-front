import styled from "styled-components"

export const ChartView = styled.div`
  min-width: 90%;

  div{
    /* margin-top: 10px; */
  }

  @media (max-width: 900px) {
    min-width: 20rem
  }

`

export const ChartTitleView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  flex-direction: column;

  * {
    margin: 0;
  }
`
