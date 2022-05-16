import styled from 'styled-components'

export const AppView = styled.main`
  display: flex;

  height: 100%;

  margin: 0 0 10rem 0;
  padding: 0;

  @media (max-width: 1008px) {
    flex-direction: column;
    margin: 0;
  }
`
