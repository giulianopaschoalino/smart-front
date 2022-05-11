import styled from 'styled-components'

export const BannerView = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  width: 100%;
  height: 19rem;

  .gradient {
    position: absolute;
    width: 100%;
    height: 19rem;

    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), rgba(7, 23, 100, 0.6);
    opacity: 0.9;

    z-index: 1;
  }

  .text {
    position: relative;
    margin: 0 0 0 20px;

    font-family: 'Poppins';
    font-style: normal;

    color: white;

    z-index: 2;

    overflow: hidden;

    p {
      font-size: 30px;
    }

    * {
      margin: 0;
    }
  }

  @media (max-width: 1008px) {
    font-size: 170%;
  }
`
