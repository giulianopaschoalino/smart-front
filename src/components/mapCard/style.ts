import styled from 'styled-components'

export const MapCardView = styled.figure`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: row;

  margin-right: 25px;

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
`
