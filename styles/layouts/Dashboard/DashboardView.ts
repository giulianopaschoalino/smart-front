import styled from 'styled-components'

export const DashboardView = styled.main`
  * {
    margin: 0;
    padding: 0;
  }

  display: flex;
  justify-content: center;
  align-items: flex-start;

  flex-wrap: wrap;

  flex-direction: column;

  width: 100%;

  margin: 0 0 0 20rem;

  padding-left: 30px;
  padding-right: 30px;

  span {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }

  h4 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 21px;
    line-height: 32px;
  }

  h1 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 42px;
  }

  p {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  .cardsSection {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    flex-wrap: wrap;

    box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.1);
    border-radius: 10px;

    width: 100%;
    height: fit-content;

    margin: 2rem 0 2rem 0;
  }

  .dashboard {
    display: grid;

    grid-template-columns: 50% 50%;
    grid-template-rows: 100%;

    gap: 40px;

    width: 99%;

    /* flex-wrap: wrap; */
  }

  @media (max-width: 1195px) {
    margin: 0;
    margin-top: 80px;
    margin-left: 20px;
  }

  @media (max-width: 1195px) {
    .dashboard {
      display: grid;

      grid-template-columns: 100%;
      grid-template-rows: 50% 50%;

      gap: 40px;

      width: 100%;

      /* flex-wrap: wrap; */
    }
  }
`
