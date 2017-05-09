
function FormataData(Campo, teclapres){
	
	var tecla = teclapres.keyCode;
	var vr = new String(Campo.value);
	var er = /\D/;
	vr = vr.replace("/", "");
	vr = vr.replace("/", "");
	vr = vr.replace(er, "");
	
	if (tecla != 9 && tecla != 8){
		tam = vr.length + 1;
		Campo.value = vr;
		if (tam > 2 && tam < 5)
		{
			//alert('caso1');
			Campo.value = vr.substr(0, 2) + '/' + vr.substr(2, tam);
		
		}
		if (tam >= 5 && tam <=10)
		{
			//alert('caso2'+ ' ' + vr);
			Campo.value = vr.substr(0,2) + '/' + vr.substr(2,2) + '/' + vr.substr(4,4);
		}
		
	}	
	
	//alert(Campo.value);
}

function Tecla(e)
{
  if(document.all) // Internet Explorer
    var tecla = event.keyCode;
  else if(document.layers) // Nestcape
    var tecla = e.which;

  if(tecla > 47 && tecla < 58) // numeros de 0 a 9
    return true;
  else
    {
      if (tecla != 8) // backspace
        return false;
      else
        return true;
    }
}
//formatador de datas
function FormataHora(Campo, teclapres)
{
	
	var tecla = teclapres.keyCode;
	var vr = new String(Campo.value);
	var er = /\D/;
	vr = vr.replace(":", "");	
	vr = vr.replace(er, "");
	
	if (tecla != 9 && tecla != 8){
		tam = vr.length + 1;
		Campo.value = vr;
		if (tam > 2 && tam <=	 5)
		{
			//alert('caso1');
			Campo.value = vr.substr(0, 2) + ':' + vr.substr(2, tam);
		}
	}
	
}
