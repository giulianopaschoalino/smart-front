import styled from 'styled-components'

export const MapCardView = styled.figure`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: row;

  margin-right: 2px;

  * {
    margin: 0;
    padding: 0;
  }

  span {
    margin-bottom: 25px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;

    article {
      display: flex;
    }
  }

  @media (max-width: 1640px) {
    margin-left: 1px;
    font-size: 14px;
  }
`
