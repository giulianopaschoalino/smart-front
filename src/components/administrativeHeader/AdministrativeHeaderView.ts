import styled from "styled-components";

export const AdministrativeHeaderView = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  align-self: center;

  margin: 10px 0 20px 0;

  width: 95%;

  /* min-height: 80px; */

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

    transform: translateX(12%);

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
    .icon {
      transform: translateX(6%);
    }
    input {
      height: 2rem;
    }
  }
`
