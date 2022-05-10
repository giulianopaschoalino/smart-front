import styled from "styled-components";

export const GradientButtonView = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  width: 30%;
  height: 150px;

  font-family: 'Poppins';

  color: #FFFFFF;

  background: ${ props => props.color==='orange'?
  'linear-gradient(200.86deg, #F48665 8.03%, #F48665 91.97%, #FDA23F 91.97%), #FFFFFF'
  :
  props.color === 'purple'?
  'linear-gradient(200.69deg, #9A56FF 8.53%, #D78AFD 91.47%), #FFFFFF'
  :
  'linear-gradient(200.69deg, #23BDB8 8.53%, #43E794 91.47%), #FFFFFF'
  };

  box-shadow: 0.5px 3px 10px rgba(119, 119, 119, 0.1);

  border-style: none;

  cursor: pointer;

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
`
