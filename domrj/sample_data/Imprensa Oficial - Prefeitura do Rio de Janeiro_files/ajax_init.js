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
   alert("Esse browser não tem recursos para uso do Ajax");
   req = null;
  }
 }
}

return req;
}

//Fila de conexões
fila=[]
ifila=0
//Executa a próxima conexão da fila
function ajaxRun(){
    //Abre a conexão
    xmlhttp.open("GET",fila[ifila][1],true);
    //Função para tratamento do retorno
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4){
            //Mostra o HTML recebido
            retorno=unescape(xmlhttp.responseText.replace(/\+/g," "))
            document.getElementById(fila[ifila][0]).innerHTML=retorno
            //Roda o próximo
            ifila++
            if(ifila<fila.length)setTimeout("ajaxRun()",20)
        }
    }
    //Executa
    xmlhttp.send(null)
}

//Executa a próxima conexão da fila
function ajaxRun(){
    //Abre a conexão
    xmlhttp.open("GET",fila[ifila][1],true);
    //Função para tratamento do retorno
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4){
            //Mostra o HTML recebido
            retorno=unescape(xmlhttp.responseText.replace(/\+/g," "))
            document.getElementById(fila[ifila][0]).innerHTML=retorno
            //Roda o próximo
            ifila++
            if(ifila<fila.length)setTimeout("ajaxRun()",20)
        }
    }
    //Executa
    xmlhttp.send(null)
}