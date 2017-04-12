// JavaScript Document
function ajaxInit() {
var req;

try {
 req = new ActiveXObject("Microsoft.XMLHTTP");
} catch(e) {
 try {
  req = new ActiveXObject("Msxml2.XMLHTTP");
 } catch(ex) {
  try {
   req = new XMLHttpRequest();
  } catch(exc) {
   alert("Esse browser n�o tem recursos para uso do Ajax");
   req = null;
  }
 }
}

return req;
}

//Fila de conex�es
fila=[]
ifila=0
//Executa a pr�xima conex�o da fila
function ajaxRun(){
    //Abre a conex�o
    xmlhttp.open("GET",fila[ifila][1],true);
    //Fun��o para tratamento do retorno
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4){
            //Mostra o HTML recebido
            retorno=unescape(xmlhttp.responseText.replace(/\+/g," "))
            document.getElementById(fila[ifila][0]).innerHTML=retorno
            //Roda o pr�ximo
            ifila++
            if(ifila<fila.length)setTimeout("ajaxRun()",20)
        }
    }
    //Executa
    xmlhttp.send(null)
}

//Executa a pr�xima conex�o da fila
function ajaxRun(){
    //Abre a conex�o
    xmlhttp.open("GET",fila[ifila][1],true);
    //Fun��o para tratamento do retorno
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4){
            //Mostra o HTML recebido
            retorno=unescape(xmlhttp.responseText.replace(/\+/g," "))
            document.getElementById(fila[ifila][0]).innerHTML=retorno
            //Roda o pr�ximo
            ifila++
            if(ifila<fila.length)setTimeout("ajaxRun()",20)
        }
    }
    //Executa
    xmlhttp.send(null)
}