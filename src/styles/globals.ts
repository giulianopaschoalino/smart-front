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

  /* .MuiInputLabel-outlined {
    margin-top: 11px;
  }
  .Mui-focused {
    margin-top: 0!important;
  } */

  .datePicker {
    .MuiOutlinedInput-input, .MuiInputBase-input, .MuiInputBase-inputAdornedEnd, .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input {
      padding: 0 0 0 15px;
      width: 100%;
      height: 63px!important;
    }
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
        /* background-color: red; */
        /* position: relative; */
        /* width: 100%;
        height:63px; */
      }

      .MuiFormControl-root,
      .MuiTextField-root,
      .css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
        /* margin-top: 8px; */
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
        /* padding-top: 6px; */
      }

      .MuiButtonBase-root,
      .MuiIconButton-root,
      .MuiIconButton-edgeEnd,
      .MuiIconButton-sizeMedium,
      .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root {
        /* width: 30px;
        height: 30px; */
      }
    }

    .MuiInputLabel-root
    .MuiInputLabel-formControl, .MuiInputLabel-animated,
    .MuiInputLabel-shrink,
    .MuiInputLabel-outlined,
    .MuiFormLabel-root,
    .MuiFormLabel-colorPrimary,
    .MuiFormLabel-filled,
    .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root {
      /* color: rgba(0, 0, 0, 0.6);
      font-family: "Roboto","Helvetica","Arial",sans-serif;
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.4375em;
      letter-spacing: 0.00938em;
      padding: 0;
      position: relative;
      display: block;
      transform-origin: top left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: calc(133% - 24px);
      position: absolute;
      left: 0;
      user-select: none;
      z-index: 1;
      pointer-events: auto; */
    }
`;
