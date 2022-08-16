import styled from "styled-components";

export const HeaderView = styled.header`
  display: flex;
  justify-content: space-between;

  width: 100%;

  margin-bottom: 40px;

  .icon {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    height: 40px;

    border-radius: 8px;

    background-color: #254F7F;

    padding: 14px;

    margin-left: 20px;

    p{
      color: white;

      white-space: nowrap;
    }
  }

  .logoContainer {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40%;
    max-width: 120px;
    max-height: 100px;

    img {
      width: 100%;
      height: auto;

      border-radius: 8px;
    }
  }

  section {
    display: flex;
    align-items: center;
    justify-content: center;

    :first-child {
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
    }
  }
`
