import styled from 'styled-components'

export const InputUploadView = styled.button`
  width: 350px;
  margin-left: 63px;
  height: 58px;

  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #adacac;


  margin-top: 13px;

.imgContainer{
  max-width: 40px;
  height: 30px;
}

  input[type="file"] {
    display: none;

  }
  label {
    width: 169px;
    height: 30px;
    border-radius: 4px;
    background-color: #254F7F;
    color: white;
    margin-left: 3px;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    display: flex;
    text-align: center;
    cursor: pointer;
  }
  .image{
    width:30px;
  }

  .text{
    margin-left: 60px;
  }
  .update{
    margin-left: 160px;
    margin-top: -29px;
  }
  .TitleButton{
    margin-left: 9px;
    margin-top: 6px;
    font-family: 'Poppins';
  }



`
