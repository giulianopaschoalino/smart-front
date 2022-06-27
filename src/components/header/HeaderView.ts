import styled from "styled-components";

export const HeaderView = styled.header`
  display: flex;
  justify-content: space-between;

  margin: 0 0 75px 0;

  width: 100%;

  section {
    width: 30%;

    :last-child {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      height: fit-content;
    }
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    min-width: 120px;
    height: 40px;

    border-radius: 8px;

    background-color: #254F7F;

    p{
      color: white;
      margin-left: 15%;
    }
  }
`
