import styled from "styled-components";

export const ClientsView = styled.main`
  display: flex;
  flex-direction: column;

  section {
    display: flex;

    width: 100%;

    :nth-child(2) {
      justify-content: space-between;

      width: 18rem;

      margin: 45px 0 22px 0;
    }

    :last-child {
      width: 50rem;
      height: 30rem;
    }
  }
`

export const ClientsModalView = styled.main`
  display: grid;

  grid-template-columns: 100% 100%;
  grid-template-rows: 100% 100% 100% 100%;
`
