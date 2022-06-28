import styled from 'styled-components';

export const TelemetriaView = styled.main`
  padding: 20px ;
  width: 100%;

  .title {
    color: black;
    font-weight: 600;
    font-size: 14px;

    margin: 0 0 0 10px;
  }

  input {
    width: 15rem;
    height: 2.5rem;

    padding: 14px;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;

    border-radius: 6px;
    border: solid gray 1px;

    background-color: #F9F9F9;
  }

  span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #667085;
  }

  .titleMenuItem {
    color: #667085;
    font-family: Inter;
    font-size: 14px;
    font-weight: 600;
  }

  .paragraph {
    color: #22d1f0;
    text-align: center;
    margin-top: 60px;
  }

  section {
    display: flex;

    justify-content: center;
    align-items: center;

    flex-wrap: wrap;

    .select {
      display: flex;
      justify-content: center;
      align-items: flex-start;

      flex-direction: column;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;

  flex-wrap: wrap;

  max-width: 100%;

  margin-top: 5rem;

  padding-left: 100px;
  padding-right: 100px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;
    border-radius: 2px;

    width: 30%;
    min-width: 240px;
    height: 110px;
    min-height: 110px;
    margin-bottom: 25px;

    font-family: 'Poppins';
    font-size: 10px;

    color: #FFFFFF;

    :first-child {
      background: linear-gradient(200.86deg, #F48665 8.03%, #F48665  91.97%), #FFFFFF;
    }

    box-shadow: 0.5px 3px 10px rgba(119, 119, 119, 0.1);

    border-style: none;

    * {
      margin: 0;
      padding: 0;
    }

    p {
      :first-child {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-size: calc(20px);

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }
      :last-child {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-size: 12;

        text-transform: uppercase;
      }
    }
  }

  @media (max-width: 942px) {
    align-items: center;
    justify-content: center;

    flex-direction: column;
  }
`;

export const Uploads = styled.div`
  display: flex;
  justify-content: space-evenly;

  flex-direction: row;

  padding-left: 100px;
  padding-right: 100px;
`;





