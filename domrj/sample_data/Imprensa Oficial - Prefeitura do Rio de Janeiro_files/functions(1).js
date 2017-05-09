//Renato Chermont Silva
//Gendata Sistemas

//recupera dados de uma URL e coloca na div especificada
function LoadCategorias(vetCat, vetTipo, tipo, divName)
{
	var tamCat = vetCat.length;
	var tamTipo = vetTipo.length;
	
	var resultado = "";
	for (i = 0; i < tamTipo; i++)
	{
		//alert(vetCat[vetTipo[i]] + '==' + tipo + '   ' + vetTipo[i]);
		if (vetCat[vetTipo[i]] == tipo)
		{
			resultado = resultado + '<input type="checkbox" name="cat[]" value="'+ vetTipo[i] + '"/>' + vetCatDesc[vetTipo[i]] + '\n<br>'; 
			document.forms['categorias'].elements['cat[]'].value= vetTipo[i];
		}
			
	}
	///alert (resultado);
	return resultado;

}
//função que cheka todos os dados de um formulário
function ChecaDados(form_name, campos)
{
	//form_name 	= nome do form
	//campos 		= nome dos checkbox, que deverão ser em forma de array
	//campo_comp 	= um campo que servirá de comparação para o checador, pode ser de qualquer tipo,
	//e de preferencia ser setado inicialmente como "true", será em foma de string mesmo
	//ex; campo[0], campo[1] ..... e deve sempre começar do 0 e ir de 1 em 1
	
	var elem = document.forms[form_name];
	var i = 0;
	var campo = campos + "[" + i + "]";
	var ckd;	
	//alert(elem.elements['mat_id[0]'.value);
	//return;
	if (elem.elements[campo].value == "false")
	{
		elem.elements[campo].value = "true";
		ckd = false;
	}
	else
	{
		elem.elements[campo].value = "false";
		ckd = true;
	}	
	
	while (elem.elements[campo])	
	{		
		elem.elements[campo].checked = ckd;		
		i++;
		var campo = campos + "[" + i + "]";		
	}
	
	return;
}

//soma um valor campo a um campo_soma determinado e mostra no id 
function SomaDados(form_name, campo_soma, campo, id)
{
	var elem = document.forms[form_name];
	elem.elements[campo_soma].value += elem.elements[campo].value;
	document.GetElementById(id).InnerHTML.value = elem.elements[campo_soma].value;
}



//-----------------------------------------------
//-----------------------------------------------
//------FUNÇÕES DE VALIDAÇÃO DE CAMPOS-----------

function IsNumero(frm, campo, obr)
{

	var elem = document.forms[frm].elements[campo];
	var vr = elem.value;
	var er = /^\d*$/;
	
	if (obr)
	{
		if (CampoVazio(frm, campo))
		{
			alert('Campo '+ campo.toUpperCase() +' Obrigatório');
			elem.focus();
			return false;
		}			
	}
	if (!vr.match(er))
	{
		alert('Campo '+ campo.toUpperCase() +' incorreto');
		elem.focus();
		elem.value="";
		return false;
	}
	
	return true;	
}

function CampoVazio(frm, campo)
{
	var elem = document.forms[frm].elements[campo];
	var vr = elem.value;
	var er = /^$/;
	if (!vr.match(er)) return false;
	return true;
}
function IsCpfCnpj(frm, campo, opt)
{	
	var elem = document.forms[frm].elements[campo];
	var vr = elem.value;
	
	if (opt == 0)
	{
		if (checkCPF(vr))
			return true;
		elem.focus();
		return false;
	}
	else if (opt = 1)
	{
		if (checkCNPJ(vr))
			return true;
		elem.focus();
		return false;
	}
		
}


function VerifyCNPJ(CNPJ)
{
	CNPJ = LIMP(CNPJ);
	if(isNUMB(CNPJ) != 1)
	{
		return(0);
	}	
	else
	{
		if(CNPJ == 0)
		{
			return(0);
		}
		else
		{
			g=CNPJ.length-2;
			if(RealTestaCNPJ(CNPJ,g) == 1)
			{
				g=CNPJ.length-1;
				if(RealTestaCNPJ(CNPJ,g) == 1)
				{	
					return(1);
				}
				else
				{
					return(0);
				}
			}
			else
			{
				return(0);
			}
		}
	}
}
function RealTestaCNPJ(CNPJ,g)
{
	var VerCNPJ=0;
	var ind=2;
	var tam;
	for(f=g;f>0;f--)
	{
		VerCNPJ+=parseInt(CNPJ.charAt(f-1))*ind;
		if(ind>8)
		{
			ind=2;
		}
		else
		{
			ind++;
		}
	}
	VerCNPJ%=11;
	if(VerCNPJ==0 || VerCNPJ==1)
	{
		VerCNPJ=0;
	}
	else
	{
		VerCNPJ=11-VerCNPJ;
	}
	if(VerCNPJ!=parseInt(CNPJ.charAt(g)))
	{
		return(0);
	}
	else
	{
		return(1);
	}
}

function isNUMB(c)
{
	if((cx=c.indexOf(","))!=-1)
	{		
		c = c.substring(0,cx)+"."+c.substring(cx+1);
	}
	if((parseFloat(c) / c != 1))
	{
		if(parseFloat(c) * c == 0)
		{
			return(1);
		}
		else
		{
			return(0);
		}
	}
	else
	{
		return(1);
	}
}

function LIMP(c)
{
	while((cx=c.indexOf("-"))!=-1)
	{		
		c = c.substring(0,cx)+c.substring(cx+1);
	}
	while((cx=c.indexOf("/"))!=-1)
	{		
		c = c.substring(0,cx)+c.substring(cx+1);
	}
	while((cx=c.indexOf(","))!=-1)
	{		
		c = c.substring(0,cx)+c.substring(cx+1);
	}
	while((cx=c.indexOf("."))!=-1)
	{		
		c = c.substring(0,cx)+c.substring(cx+1);
	}
	while((cx=c.indexOf("("))!=-1)
	{		
		c = c.substring(0,cx)+c.substring(cx+1);
	}
	while((cx=c.indexOf(")"))!=-1)
	{		
		c = c.substring(0,cx)+c.substring(cx+1);
	}
	while((cx=c.indexOf(" "))!=-1)
	{		
		c = c.substring(0,cx)+c.substring(cx+1);
	}
	return(c);
}


function checkCPF(vCPF){
   var mControle = ""
   var mContIni = 2, mContFim = 10, mDigito = 0;
   for (j = 1 ; j <= 2 ; j++){
      mSoma = 0;
      for (i = mContIni ; i <= mContFim ; i++)
         mSoma = mSoma + (vCPF.substring((i-j-1),(i-j)) * (mContFim + 1 + j - i));
      if (j == 2 ) mSoma = mSoma + ( 2 * mDigito );
      mDigito = ( mSoma * 10 ) % 11;
      if (mDigito == 10) mDigito = 0;
      mControle1 = mControle;
      mControle = mDigito;
      mContIni = 3;
      mContFim = 11;
   }
   var digVerificador = (mControle1 * 10) + mControle;
	var flag_cpf = true;	
	var er = /\D/;
	if (vCPF.length != 11) flag_cpf = false;
	if (vCPF.match(er)) flag_cpf = false;
	//if (vCPF.substr(9,2) != digVerificador.toString()) alert('Use ' + digVerificador + ' no final do cpf') ;
	if (vCPF == "00000000000" || vCPF == "11111111111" || vCPF == "22222222222" || vCPF == "33333333333" || vCPF == "44444444444" || vCPF == "55555555555" || vCPF == "66666666666" || vCPF == "77777777777" || vCPF == "88888888888" || vCPF == "99999999999")
		flag_cpf = false;
	
	if (!flag_cpf)
	{
		//alert('       CPF Inválido!!!      ');
		return false;
	}
	return true;
		
}

function GerarLinkImpressao(formname, urlname)
{
	//numero de elementos do form		
	//alert('teste');
	var numele = document.forms[formname].length;
	var urlresult = urlname + '?';
	for (var i=0; i< numele; i++)
	{
		var campo = document.forms[formname].elements[i].name;
		var valor = document.forms[formname].elements[i].value;
				
		urlresult += campo + '=' + valor +'&';
		
	}
	window.open(urlresult, 'imprimir', "top=0, left=0, width=800, height=600, scrollbars=yes");
	//alert(urlresult);
	return;
}


function MudarActionSubmit(formname, urlname, targetname)
{	
	//document.forms[formname].action=urlname;
	//document.forms[formname].target=targetname;			
	//target  = document.forms[formname].target;
	//if (target!=12)
	//alert(document.forms[formname].action);
	//{
		document.getElementById("cadastroid").target = targetname;
		//document.getElementById("cadastroid").action.value = urlname;
		document.forms[formname].action=urlname;
		//alert(document.getElementById("cadastroid").action);
		//document.forms[formname].action=urlname;
		//document.getElementById("cadastroid").submit();
		
		
		//alert(target);
	//}
	//alert(document.getElementById("cadastroid").target);
	//document.getElementById("cadastroid").action.value = urlname
	//document.forms[formname].action=urlname;
	//document.forms[formname].target=targetname;			
	document.forms[formname].submit();
	//document.forms[formname].action = action_old;
	
}

function MudarAction(formname, urlname, targetname)
{
	document.getElementById("cadastroid").target = targetname;
	//document.forms[formname].target=targetname;		
	document.forms[formname].action=urlname;
}
/*
function externalLinks() 
{
	if (!document.getElementsByTagName) return;
	var anchors = document.getElementsByTagName("a");
	for (var i=0; i<anchors.length; i++) {
		var anchor = anchors[i];
		if (anchor.getAttribute("href") && anchor.getAttribute("rel") == "external")
			anchor.target = "_blank";
	}
	document.getElementById("felix").target="_blank";
}
window.onload = externalLinks;
*/


function FormataValor(Campo, teclapres, formname, field1, field2, field3)
{
	//alert('teste;');
	//return;
	var tecla = teclapres.keyCode;
	var vr = new String(Campo.value);
	var er = /\D/;
	vr = vr.replace(",", "");	
	vr = vr.replace(er, "");
	
	//if (tecla != 9 && tecla != 8){
		tam = vr.length + 1;
		Campo.value = vr;
		var pos = tam - 3;
		//alert(vr.substr(0, 1));
		
		if (tam > 2)
		{
			Campo.value = vr.substr(0, pos) + ',' + vr.substr(pos, tam);
		}
		else
		{
			Campo.value = '0' + ',' + vr.substr(pos, tam);
		}
		var vr2 = new String(Campo.value);
		if (tam==5 && vr.substr(0, 1)=='0')
		{			
			Campo.value = vr2.substr(1, tam);
		}
		tam = vr2.length;
		//alert(tam);
		if (tam==3 && vr2.substr(0, 1)==',')
		{			
			Campo.value = '0'+vr2.substr(0, tam);
		}
		//CalculoFatura(formname,  field1, field2, field3);
		//alert(vr.substr(0, pos) + ',' + vr.substr(pos, tam));
	//}
	
}



function FormataNumero(Campo, teclapres)
{
	//return;
	var tecla = teclapres.keyCode;
	var vr = new String(Campo.value);
	var er = /\D/;
	vr = vr.replace(",", "");	
	vr = vr.replace(er, "");
	tam = vr.length + 1;
	Campo.value = vr;
	
	
}


function abre_editor_html(campo, path) {
	window.open(path+"admin/includes/tiny_mce/editor_html.php?iid=" + campo.id, "janela_editor_html", "alwaysRaised=yes,dependent=yes,menubar=no,personalbar=no,resizable=yes,scrollbars=auto,staus=no,toolbar=no,width=" + screen.width*0.7 + ",height=" + screen.height*0.7 + ",left=" + (screen.width-(screen.width*0.7))/2 + ",top=" + (screen.height-(screen.height*0.7))/2);
}
function abre_editor_cores(campo, path) {
	window.open(path+"admin/editorhtml/editor_cores.php?iid=" + campo.id, "janela_editor_cores", "alwaysRaised=yes,dependent=yes,menubar=no,personalbar=no,resizable=yes,scrollbars=auto,staus=no,toolbar=no,width=300,height=370,left=" + (screen.width-280)/2 + ",top=" + (screen.height-350)/2);
}


function IsData(frm, campo, obr)
{

    var elem = document.forms[frm].elements[campo];
    var vr = elem.value;
    var er = /^\d{2}\/\d{2}\/\d{4}$/;
    
    if (obr)
    {
        if (CampoVazio(frm, campo))
        {
            alert('Campo '+ campo.toUpperCase() +' Obrigatório');
            elem.focus();
            return false;
        }            
    }
    if (!vr.match(er))
    {
        alert('Campo '+ campo.toUpperCase() +' incorreto');
        elem.focus();
        elem.value="";
        return false;
    }
    
    return true;    
}