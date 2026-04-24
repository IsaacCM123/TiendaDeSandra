import{CAREBOT_GLY}from'./17_Extend.js';

document.getElementById('ingresarBTN').addEventListener('click',()=>{
	if (document.getElementById('textID').value === CAREBOT_GLY){
		localStorage.setItem('admin','true')
		document.getElementById('textID').value=''
		document.getElementById('passID').value=''
		document.getElementById('emoji').innerHTML='<ion-icon name="checkmark-sharp"></ion-icon>'
	}
	else{
		document.getElementById('textID').value=''
		document.getElementById('passID').value=''
		document.getElementById('ventanaModal').style.display='none'
	}
})