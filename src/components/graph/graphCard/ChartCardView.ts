import styled from 'styled-components';

export const ChartCardView = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;

  flex-direction: column;

  width: 100%;
  height: fit-content;
  min-height: 41rem;

  background: #F8F8F8;
	box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
	-webkit-box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
	-moz-box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
  border-radius: 20px;

  background-color: #FFFFFF;

  .graph {
    width: 90%;
    min-height: 300px;

    background-color: black;

    margin-bottom: 20px;
  }

  a {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;

    color: #2F4CDD;
  }

  .statusDot {
    max-width: 11px;
    max-height: 11px;
    min-width: 11px;
    min-height: 11px;

    border-radius: 100%;

    background-color: #2BC155;
  }

  .content {
    width: 90%;

    margin-top: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
  }

  aside {
    display: flex;
    justify-content: space-between;
    align-items: center;

    flex-direction: row;

    width: 100%;
    height: 4rem;

    margin: 30px 0 30px 0;

    border-radius: 12px;

    padding: 0 12px 0 12px;

    background-color: #E9FFEF;

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 40%;
      min-width: 50px;
    }

    .info {
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

  @media (max-width: 1640px) {
    font-size: 13px;
    min-height: 32rem;

    .info {
      max-width: 4rem;
    }
  }

`
