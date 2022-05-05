import styled from 'styled-components'

export const DashboardView = styled.main`
  * {
    margin: 0;
  }
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  margin: 60px;

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

  .graph {
    width: 42rem;
    height: 310px;

    background-color: grey
  }

  .graphBig {
    width: 90rem;
    height: 310px;

    background-color: grey
  }

  .cardSection {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;

    box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.1);
    border-radius: 10px;

    width: 100%;
    height: fit-content;

    margin: 2rem 0 2rem 0;

    span {
      margin-bottom: 25px;
    }

    figure {
      display: flex;
      justify-content: center;
      align-items: center;

      flex-direction: row;

      margin-right: 25px;



      :first-child {
        margin-right: 95px;
      }

      div {
        display: flex;
        justify-content: center;
        align-items: center;

        flex-direction: column;

        figure {
          margin: 0;
          align-items: flex-start;
        }
      }
    }
  }

  .dashboard {
    display: flex;
    justify-content: space-between;

    flex-wrap: wrap;

    article {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      flex-direction: column;

      max-width: 120rem;
      min-width: fit-content;

      min-height: 30rem;

      margin-bottom: 30px;

      padding: 30px;

      /* border: solid black 1px; */
      box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.1);
      border-radius: 10px;
    }

    .asideConsumo {
      display: flex;
      justify-content: space-between;
      align-items: center;

      flex-direction: row;

      width: 32rem;
      height: 4rem;

      margin: 30px 0 30px 0;

      border-radius: 12px;

      padding: 0 12px 0 12px;

      background-color: #E9FFEF;

      a {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        /* identical to box height */


        color: #2F4CDD;
      }

      .asideConsumoContent {
        display: flex;
        align-items: center;
        justify-content: space-between;

        width: 40%;

        .count {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 87px;
          height: 44px;

          border-radius: 12px;

          background-color: #2BC155;
          color: white;
        }
      }
    }
    .statusDot {
      max-width: 11px;
      max-height: 11px;
      min-width: 11px;
      min-height: 11px;

      border-radius: 100%;

      background-color: #2BC155;
    }
  }
`
