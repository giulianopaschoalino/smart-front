
import styled from 'styled-components';


export const TelemetriaView = styled.main`
   padding: 20px ;
   width: 100%;



`;

export const Buttons = styled.div`
   display: flex;
   min-width: 10rem;
   cursor: pointer;
   margin-top: 8rem;
   justify-content: space-around;
   flex-direction: row;

   height: 6rem;
   /* flex-direction: column; */
/*
   .btnSucess{
     font-size: 10px;
     cursor: pointer;
     background-color: #F48665;
     border: none;
   } */

   .btnGrafico {
	box-shadow:inset 0px 34px 0px -15px #F48665;
	background-color:#F48665;
	border:none;
  border-radius: 2px;
  max-width: 17rem;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:8px;
	font-weight:900;
	padding:9px 20px;
	text-decoration:none;
	text-shadow:0px -1px 0px #7a2a1d;

}
p{
  font-size:20px;
}
.myButton:hover {
	background-color:#F48665;
}
.myButton:active {
	position:relative;
	top:1px;
}

.btndownload{
  box-shadow:inset 0px 34px 0px -15px #9A56FF;
	background-color:#9A56FF;
	border:none;
  border-radius: 2px;
	display:inline-block;
	cursor:pointer;
  width: 17rem;
	color:#ffffff;
	font-family:Arial;
	font-size:9px;
	font-weight:900;
	padding:9px 20px;
	text-decoration:none;
	text-shadow:0px -1px 0px #7a2a1d;

}
p{
  font-size: 12px;
}
.myButton:hover {
	background-color:#D78AFD;
}
.myButton:active {
	position:relative;
  /* justify-content: space-between; */
	top:1px;


}

.btnDados{
  box-shadow:inset 100% #23BDB8;
	background-color:#23BDB8;
	border:none;
  border-radius: 2px;
	display:inline-block;
  width: 17rem;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:9px;
	font-weight:900;
	padding:9px 20px;
	text-decoration:none;
	text-shadow:0px -1px 0px #7a2a1d;

}
p{
  font-size: 12px;
}
.myButton:hover {
	background-color:#23BDB8;
}
.myButton:active {
	position:relative;
  /* justify-content: space-between; */
	top:1px;
}


`;





