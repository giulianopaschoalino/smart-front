import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body::-webkit-scrollbar {
    width: 15px;
  }
  body::-webkit-scrollbar-track {
    background-color: #EFEFEF;
  }
  body::-webkit-scrollbar-thumb {
    background-color: rgb(37,79,127);
    border: 3px solid #EFEFEF;
    border-radius: 10px;
  }
  body::-webkit-scrollbar-thumb:hover {
    background-color: #1d3e63;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins';
    background-color: #f9f9f9;
  }

  main {
    padding: 2.5rem;

    button {
      cursor: pointer
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;
