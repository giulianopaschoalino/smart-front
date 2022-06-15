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

    .select {
      display: flex;
      justify-content: center;
      align-items: flex-start;

      flex-direction: column;

      /* margin-top: 10px; */
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;

  min-width: 14rem;
  height: 6rem;

  margin-top: 5rem;

  padding-left: 100px;
  padding-right: 100px;

`;

export const Uploads = styled.div`
  display: flex;
  justify-content: space-evenly;

  flex-direction: row;

  padding-left: 100px;
  padding-right: 100px;
`;





