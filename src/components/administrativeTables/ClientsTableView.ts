import styled from "styled-components";

export const ClientTableView = styled.main`
  width: 100%;

  color: #6A707E;

  thead {
    border-radius: 16px;
    background-color: #f9f9f9;

    th {
      font-size: 12px;
      font-family: 'inter';
      font-weight: 800;
      font-style: italic;
    }
  }
  tbody {
    border-radius: 16px;
    tr {
      th {
        font-family: 'poppins';
        font-weight: 500;
        font-size: 16px;
        color: #6A707E;
      }

      td {
        :nth-child(3) {
          font-family: 'poppins';
          font-weight: 500;
          font-size: 16px;
          color: #6A707E;
        }
        :nth-child(4) {
          font-family: 'poppins';
          font-weight: 400;
          font-size: 12px;
          color: #828282;
          text-decoration: underline;
        }
      }
    }
  }
`

export const StyledStatus = styled.div<{status: any}>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 72px;
  height: 31px;

  border-radius: 8px;

  background-color: ${props => props.status == 'ativo'? '#F0FFF8' : props.status == 'pendente'? '#FEFFE5' : '#FFF0F0'};
  color: ${props => props.status == 'ativo'? '#18AB56' : props.status == 'pendente'? '#FFBC10' : '#EB5757'};

  text-decoration: none!important;;
`
