import styled from "styled-components";

export const GradientButtonView = styled.button`
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

  background: ${ props => props.color==='orange'?
  'linear-gradient(200.86deg, #e7992f 8.03%, #e7992f 91.97%),#FFFFFF'
  :
  props.color === 'purple'?
  'linear-gradient(200.69deg, #254f7f 9%, #254f7f 98%), #FFFFFF'
  :
  'linear-gradient(200.69deg, #018a8a 8.53%, #018a8a 98%), #FFFFFF'
  };

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
      font-size: 11px;

      text-transform: uppercase;
    }
  }
`
