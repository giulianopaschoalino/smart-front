import styled from "styled-components";

export const ButtonGroupView = styled.div`
  background-color: #F4F5F9;
  border-radius: 10px;
  .switch {
    position: absolute;

    width: 85px;
    height: 40px;

    margin-top: 3.5px;
    transform: translateX(${props => props.timeCourse=='Mensal'? '4px' : props.timeCourse=='Semanal'? '94px' : '181px'});
    transition-duration: 0.5s;
    transition-delay: 0s;

    border-radius: 8px;

    background: #fff;
  }
`
