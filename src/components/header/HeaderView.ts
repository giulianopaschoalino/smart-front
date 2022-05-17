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
      align-items: flex-start;

      height: fit-content;
    }
  }

  .icon {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 150px;
    height: 40px;

    border-radius: 8px;

    background-color: #254F7F;
    color: white;

    transform: translateX(20px);

    ::after {
      content: "";
      position: relative;
      left: 2.5rem;
      background-color: #fff;
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }

  @media (max-width: 1020px) {
    .icon {
      display: none;
    }
    section {
      width: 50%;
    }
  }
  @media (max-width: 1640px) {
    input {
      height: 2rem;
    }
  }
`
