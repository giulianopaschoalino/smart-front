import styled from 'styled-components';

export const TelemetriaView = styled.main`
  padding: 20px;
  width: 100%;

  .modal {
    position: absolute;

    background: rgba( 255, 255, 255, 0.25 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    z-index: 999;
  }

  #preloader_1{
    position:absolute;
    top: 50%;
    left: 50%;
  }
  #preloader_1 span{
    display:block;
    bottom:0px;
    width: 9px;
    height: 5px;
    background:#254F7F;
    position:absolute;
    animation: preloader_1 1.5s  infinite ease-in-out;
  }

  #preloader_1 span:nth-child(2){
    left:11px;
    animation-delay: .2s;

  }
  #preloader_1 span:nth-child(3){
    left:22px;
    animation-delay: .4s;
  }
  #preloader_1 span:nth-child(4){
    left:33px;
    animation-delay: .6s;
  }
  #preloader_1 span:nth-child(5){
    left:44px;
    animation-delay: .8s;
  }
  @keyframes preloader_1 {
    0% {height:5px;transform:translateY(0px);background:rgb(1,138,138);}
    25% {height:30px;transform:translateY(15px);background:#254F7F;}
    50% {height:5px;transform:translateY(0px);background:rgb(231,153,47);}
    100% {height:5px;transform:translateY(0px);background:rgb(1,138,138);}
  }

  .title {
    color: black;
    font-weight: 600;
    font-size: 14px;

    margin: 0 0 0 10px;
  }

  .sendButton {
    width: 100px;
    height: 40px;

    background:#254F7F;
    color: white;

    border: none;
    border-radius: 8px;

    font-family: 'Poppins';
    font-size: 14px;

    color: #FFFFFF;

    margin-top: 20px;
  }

  table {
    display: none;
  }

  .tg{
    border-collapse:collapse;
    border-spacing:0;
    font-family:Poppins;
    width: 100%;
  }

  .tg td{
    border-color:#DDDFE1;
    border-style:solid;
    border-width:1px;
    font-family:Poppins;
    font-size: 10px;
    overflow:hidden;
    padding:17px 30px;
    word-break:normal;
  }

  .tg th{
    border-color:#DDDFE1;
    border-style:solid;
    border-width:1px;
    font-family:Poppins;
    font-size:10px;
    font-weight:500;
    overflow:hidden;
    padding:10px 5px;
    word-break:normal;
  }
  .tg .tg-8oo6{
    color:#464a53;
    font-size:13px;
    text-align:center;
    vertical-align:top;
    padding: 10px 18px;
    text-align: center;
  }
  .tg .tg-uulg{
    background-color:#efefef;
    color:#abafb3;
    font-size:14px;
    text-align:center;
    vertical-align:top
  }
  .tg .tg-gceh{
    background-color:#efefef;
    color:#6a707e;
    font-size:14px;
    text-align:center;
    vertical-align:top
  }
  .tg .tg-0tzy{
    color:#abafb3;
    font-size:14px;
    text-align:center;
    vertical-align:top
  }
  .tg .tg-hq65{color:#6a707e;
    font-size:14px;
    text-align:center;
    vertical-align:top
  }

  .tg .tg-baqh{
    text-align:center;
    vertical-align:top
  }
  .tg .tg-0lax{
    text-align:left;
    vertical-align:top
  }
  .tg .tg-womg{
    background-color:#dddfe1;
    text-align:center;
    vertical-align:top
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

  #preloader_1{
    position:absolute;
    top: 50%;
    left: 50%;
  }
  #preloader_1 span{
    display:block;
    bottom:0px;
    width: 9px;
    height: 5px;
    background:#254F7F;
    position:absolute;
    animation: preloader_1 1.5s  infinite ease-in-out;
  }

  #preloader_1 span:nth-child(2){
    left:11px;
    animation-delay: .2s;

  }
  #preloader_1 span:nth-child(3){
    left:22px;
    animation-delay: .4s;
  }
  #preloader_1 span:nth-child(4){
    left:33px;
    animation-delay: .6s;
  }
  #preloader_1 span:nth-child(5){
    left:44px;
    animation-delay: .8s;
  }
  @keyframes preloader_1 {
    0% {height:5px;transform:translateY(0px);background:rgb(1,138,138);}
    25% {height:30px;transform:translateY(15px);background:#254F7F;}
    50% {height:5px;transform:translateY(0px);background:rgb(231,153,47);}
    100% {height:5px;transform:translateY(0px);background:rgb(1,138,138);}
  }

  .loadingTable {
    position: relative;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;

    z-index: 9999999;

    background-color: #FFFFFF;
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





