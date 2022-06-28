import styled from 'styled-components'

export const BannerView = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  width: 100%;
  height: 20%;
  max-height: 200px;

  margin-bottom: 30px;

  .gradient {
    position: absolute;
    width: 100%;
    height: 100%;

    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), rgba(7, 23, 100, 0.6);
    opacity: 0.9;

    z-index: 1;
  }

  h1 {
    font-size: 1.3em;

  }


  .text {
    position: relative;
    margin: 0 0 0 20px;

    font-family: 'Poppins';
    font-size:19px;
    font-style: normal;
    color: white;
    padding-top:45px;
    z-index: 2;

    overflow: hidden;

    text-overflow: ellipsis;

    p {
      font-size: 19px;
      /* height: 43px; */

      text-overflow: ellipsis;
    }

    * {
      margin: 0;
    }
  }

  @media (max-width: 1640px) {
    font-size: 10px;
  }

  @media (max-width: 1008px) {
    font-size: 170%;
  }

`
