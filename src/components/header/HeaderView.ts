import styled from "styled-components";

export const HeaderView = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  height: 10rem;

  section {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0;
    padding: 0;

    :first-child {
      width: 30%;
    }
  }

  .icon {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 150px;
    height: 43px;

    border-radius: 8px;

    background-color: #254F7F;
    color: white;

    transform: translateX(20px);

    ::after {
      content: "";
      position: relative;
      left: 40px;
      background-color: #FFF;
      width: 45px;
      height: 45px;
      border-radius: 100%;
    }
  }
`
