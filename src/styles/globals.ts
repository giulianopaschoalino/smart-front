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


  .datePicker {
      .css-1u3bzj6-MuiFormControl-root-MuiTextField-root,
      .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root,
      .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root,
      .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root,
      .MuiOutlinedInput-notchedOutline,
      .css-1d3z3hw-MuiOutlinedInput-notchedOutline,
      .MuiOutlinedInput-input,
      .MuiInputBase-input,
      .MuiInputBase-inputAdornedEnd,
      .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input{
        /* background-color: red!important; */
        /* border: none!important;
        outline: 0 */
        height: 45px;
      }

      .MuiFormControl-root,
      .MuiTextField-root,
      .css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
        margin-top: 8px;
      }

      .MuiOutlinedInput-input,
      .MuiInputBase-input,
      .MuiInputBase-inputAdornedEnd,
      .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input {
        border: none;
        outline: 0;
        background-color: transparent;
      }

      .MuiOutlinedInput-input,
      .MuiInputBase-input .MuiInputBase-inputAdornedEnd,
      .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input {
        padding-top: 6px;
      }

      .MuiButtonBase-root,
      .MuiIconButton-root,
      .MuiIconButton-edgeEnd,
      .MuiIconButton-sizeMedium,
      .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root {
        margin-bottom: 5px;
        width: 30px;
        height: 30px;
      }
    }

`;
