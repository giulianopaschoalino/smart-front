import styled from "styled-components";

export const ChatTelemetryView = styled.main`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  flex-direction: column;

  width: 100%;

  padding-top: 40px!important;

  .chartContainer {
    display: flex;

    flex-direction: column;

    width: 100%;
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
`
