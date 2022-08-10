import styled from 'styled-components'

export const EconomyView = styled.main`
  width: 100%;

  background: #F8F8F8;
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
  -webkit-box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
  -moz-box-shadow: 0 0 11px rgba(0, 0, 0, 0.2)  ;
  border-radius: 10px;

  background-color: #FFFFFF;

  margin-top: 10px;

  section {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .MuiInputLabel-outlined {
    margin-top: 11px;
  }
  .Mui-focused, .MuiInputLabel-shrink {
    margin-top: 0!important;
  }

  .chartBox {
  }

  article {
    display: flex;
    align-items: center;
    justify-content: space-between;

    b {
      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 17px;
      p {
        font-size: 20px;
        text-decoration: underline;
      }
    }

    p {
      :first-child {
        margin-left: '3%'
      }
      :last-child {
        color: #254F7F;
      }
    }
  }
`
