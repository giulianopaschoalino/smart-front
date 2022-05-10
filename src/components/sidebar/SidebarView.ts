import styled from 'styled-components'

interface SidebarViewInterface {
  economiaDrawer: boolean | null,
  modalOpen: boolean | null
}

export const SidebarView = styled.nav<SidebarViewInterface>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  flex-direction: column;

  width: 20%;

  margin: 0;
  padding: 0;

  box-shadow: 18px 4px 35px rgba(0, 0, 0, 0.02);

  background-color: #FFFFFF;

  .actualPath {
    border-left: #254F7F solid 8px;
    background-color: #FAFBFF;

    font-weight: 600;
    font-size: 18px;
    line-height: 27px;

    color: #254F7F;

    stop-color: #254F7F;
    .svg {
      background-color: red;
    }
  }

  ul {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;

    list-style: none;

    width: 100%;

    padding: 0;

    li {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      width: 100%;
      height: 60px;

      gap: 15px;

      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 27px;

      color: #969BA0;

      cursor: pointer;

      padding-left: 40px;
    }

    .economiaDrawer {
      display: ${props => props.economiaDrawer? 'block' : 'none'};
    }
  }

  aside {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-wrap: wrap;

    width: 90%;
    height: 190px;

    background: linear-gradient(155.54deg, #254F7F 15.63%, #9C9C9C 136.34%);
    border-radius: 26px;

    p {
      text-align: center;
      width: 80%;

      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 90%;
      line-height: 21px;
      text-align: center;

      color: #FFFFFF;
    }

    h3 {
      font-size: 90%;
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 80%;
      height: 60px;

      background: #FFFFFF;
      border-radius: 8px;
    }
  }

  .drawer {
    margin-left: 20px;
  }

  .hamburger {
    display: none;
  }

  @media (max-width: 1548px) {
    align-items: flex-start;

    width: 100%;
    /* height: 0%; */
    /* height: ${props => props.modalOpen? '100%' : null}; */

    padding: 18px;

    border-bottom: solid black 1px;

    z-index: 2;

    .hamburger {
      display: flex;

      cursor: pointer;

      z-index: 2;
    }
    .imageNext {
      display: none;
    }
    ul {
      display: ${props => props.modalOpen? 'block' : 'none'};
      min-height: 100vh;

      background-color: #FFF;
    }
    aside {
      display: none;
    }
  }
`
