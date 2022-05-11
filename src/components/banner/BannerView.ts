import styled from 'styled-components'

export const BannerView = styled.div`
  position: relative;
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
    margin:  90px 30px;
    font-family: 'Poppins';
    font-size:19px;
    font-style: normal;
    color: white;
    padding-top:45px;
    z-index: 2;
  }




`
