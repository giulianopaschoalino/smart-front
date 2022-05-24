import styled from 'styled-components'

interface MapCardViewInterface {
  statistic?: any
}

export const MapCardView = styled.figure<MapCardViewInterface>`
  display: flex;
  justify-content: flex;
  align-items: center;

  flex-direction: row;

  margin-right: 2px;

  h4 {
    margin-left: ${props => props.statistic? '0' : '10px'};
  }
  .footer {
    margin-left: ${props => props.statistic? '0' : '10px'};
    margin-bottom: ${props => props.statistic? '25px' : '0px'};
    margin-top: ${props => props.statistic? '0px' : '30px'};
  }

  * {
    margin: 0;
    padding: 0;
  }

  span {
    margin-left: ${props => props.statistic? '0' : '10px'};
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;

    article {
      display: flex;
      /* margin-left: 20px; */
    }
  }

  @media (max-width: 1640px) {
    margin-left: 1px;
    font-size: 14px;
  }
`
