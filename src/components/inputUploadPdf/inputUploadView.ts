import styled from 'styled-components'

export const InputUploadView = styled.div`

border-radius: 4px;
border:1px solid gray ;
background-color: white;
width: 300px;
height: 50px;

input[type="file"] {
    display: none;

  }

label {
    width: 140px;
    height: 30px;
    margin-top: 10px;
    border-radius: 4px;
    margin-left: 69px;
    background-color: #254F7F;
    color: white;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    display: flex;
    text-align: center;
    cursor: pointer;
  }
  .TitleButton{
    margin-top: 4px;
    margin-left: 30px;
  }

  .testess{
    margin-left: 80px;
    position: absolute;

  }

  .imgContainer{
  max-width: 40px;
  margin-top: 9px;
  margin-left: 4px;
  height: 30px;
}



`
