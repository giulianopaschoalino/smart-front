import styled from 'styled-components'

export const BasicButtonView = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1px;

  width: 140px;
  height: 45px;

  cursor: pointer;

  background: #254F7F;
  border-radius: 8px;
  border-style: none;

  font-family: 'Poppins';
  font-size: 90%;

  transition: all 350ms ease-in;

  :hover {
    transform: scale(1.02);
    opacity: 0.9;
    box-shadow: rgb(0, 0, 0, 0.2) 0px 2px 4px -1px;
  }

  color: #FFFFFF;
`
