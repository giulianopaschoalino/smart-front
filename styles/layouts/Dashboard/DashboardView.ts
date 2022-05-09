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

    grid-template-columns: 50% 50% 100%;
    grid-template-rows: 50% 50%;

    gap: 30px;

    width: 99%;

    padding-right: 20px;

    .footerGraph {
      grid-row-start: 2;

      grid-column-start: 1;
      grid-column-end: 3;
    }
  }

  @media (max-width: 1195px) {
    /* align-items: center; */
    width: 100%;
    padding: 30px;
    margin: 0;

    .dashboard {
      display: flex;

      padding: 0;
      margin: 0;

      justify-content: center;
      align-items: center;

      flex-wrap: wrap;

      grid-template-columns: 50% 50%;

      grid-auto-rows: 1;
      grid-auto-columns: 1;

      width: 100%;
    }
  }
`
