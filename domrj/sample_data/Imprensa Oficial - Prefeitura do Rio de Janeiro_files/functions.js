function lalala () {
	window.open("preview1.php","view","width=520,height=400,scrollbars=yes,status=yes,resizable=yes");
}

function ToggleAll(checked) {
    len = document.listagem.elements.length;
    var i = 0;
    for(i = 0; i < len; i++) {
        document.listagem.elements[i].checked = checked;
    }
}

function ver_modelo (modelo) {
	window.open("ver_modelo.php?modelo="+modelo,"modelo","resizable=no,scrollbars=no,menubar=no,status=no");
}


function ver_foto (foto, w, h) {
		spl = window.open ("","foto","height="+h+",width="+w+",resizable=no");
		spl.document.write ("<html><head><title>AGIOSUL</title></head><body leftmargin=0 topmargin=0 marginheight=0 marginwith=0><img src='"+foto+"' border=0></body></html>")
}

function ver_tarja (foto, w, h) {
		spl = window.open ("","foto","height="+h+",width="+w+",resizable=no");
		spl.document.write ("<html><head><title>AGIOSUL</title></head><body leftmargin=0 topmargin=0 marginheight=0 marginwith=0><img src='"+foto+"' border=0 width="+w+" height="+h+"></body></html>")
}


		// Função que altera o status dos checkbox da matéria para DISABLED 
		// quando uma categoria é selcionada (define as opções de destaque disponíveis)
		function teste () {
			var nome = document.cadastro.ca_id.options[cadastro.ca_id.selectedIndex].text;
			var comeco = 0, fim = 0;
				
				for (c = 0; c < document.cadastro.elements.length; c++) {
					if (document.cadastro.elements[c].name == "ca_id") {
						comeco = c;
					}
					if (document.cadastro.elements[c].name == "ma_publicado") {
						fim = c;
					}
				}
				
				for (a = comeco; a < fim; a++) {
					if (document.cadastro.elements[a].type == "checkbox" &&
					    document.cadastro.elements[a].name != "destino_"+nome+"[]") {
						document.cadastro.elements[a].disabled = true;
					} else {
						document.cadastro.elements[a].disabled = false;
					}
				}
		}

// Relógio de maxo :)
var military = 0;
var seconds = 1;

function oclock ( ) {
	for (a = 0; a < document.forms[0].elements; a++) {
		alert(document.forms[0].elements.name.indexOf ("hora"));
	}
}

function clock(campo)
{
   time = new Date;

   hour = time.getHours();
   if( hour >= 12 )
   {
      am = 0;
      if( military == 0 )
      {
         hour -= 12;
         if( hour == 0 )
            hour = 12;
      }
   }
   else
      am = 1;
   if( hour < 10 )
      hour = "0" + hour;
   min = time.getMinutes();
   if( min < 10 )
      min = "0" + min;
   sec = time.getSeconds();
   if( sec < 10 )
      sec = "0" + sec;
   x = hour + ":" + min;
   if( seconds )
      x = x + ":" + sec;

   campo.value = x;
   setTimeout( "oclock()", seconds ? 1000 : 10000 );
}
