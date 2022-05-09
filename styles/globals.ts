import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins';
  }

  main {
    padding: 2.5rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    /* margin: 0; */
  }
`;

// html,
// body {
//   padding: 0;
//   margin: 0;
//   font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
//     Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
// }


