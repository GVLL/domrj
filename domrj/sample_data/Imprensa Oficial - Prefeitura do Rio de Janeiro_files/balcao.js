$(function(){
    
    $("#browser").treeview({
        toggle: function() {
            //console.log("%s was toggled.", $(this).find(">span").text());
        }
    });
    
    $('#idDataPublicacao').datepicker({changeMonth: true,changeYear: true},$.datepicker.regional['pt']);
    //$('#DocumentoDtFim').datepicker({changeMonth: true,changeYear: true},$.datepicker.regional['pt']);
    //=========================================
    //autocomplete do cliente
    //=========================================
    
   
    var alpha = $( "#clienteNomeId").autocomplete({
        minLength: 0,
        source: "includes/cliente/buscar_cliente.php" + $("#clienteNomeId").val(),
        focus: function( event, ui ) {
            $( "#clienteNomeId" ).val( ui.item.cli_nome );
            $( "#IdUsr" ).val( ui.item.usr_id );
            $( "#IdCli" ).val( ui.item.cli_id );     
            return false;
        },
        select: function( event, ui ) {
            $( "#IdUsr" ).val( ui.item.usr_id );
            $( "#IdCli" ).val( ui.item.cli_id );
            //alert($( "#IdCli" ).val());
            return false;
        }
    });
    if (alpha.length>0){
        alpha.data( "autocomplete" )._renderItem = function( ul, item ) {
            return $( "<li></li>" )
                .data( "item.autocomplete", item )
                .append( "<a style='font-size:9px;'>"  + item.cli_nome + "</a>")
                //.append( "<a style='font-size:9px;'>" + item.orgao_sigla +  " &gt; " + item.classe +  " &gt; " +  item.subclasse +  " &gt; " +  item.serie + " &gt; " +   item.value +  "</a>")
                .appendTo( ul );
        };
    } 
    //=========================================
    //autocomplete do estado
    //=========================================
    alpha2 = $( "#estadoNomeId").autocomplete({
        minLength: 0,
        source: "includes/cliente/buscar_estado.php",
        focus: function( event, ui ) {
            $( "#estadoNomeId" ).val( ui.item.est_nome );
            $( "#IdEst" ).val( ui.item.est_sigla ); 
            return false;
        },
        select: function( event, ui ) {
            $( "#IdEst" ).val( ui.item.est_sigla );
            $("#cidadeNomeId").val('');
            $( "#IdCid" ).val('');
            $( "#cidadeNomeId").autocomplete("option", "source", "includes/cliente/buscar_cidade.php?est_sigla=" + ui.item.est_sigla); 
            return false;
        }
    });
    
    if (alpha2.length>0){  
        //alert('teste');
        //return;
        alpha2.data( "autocomplete" )._renderItem = function( ul, item ) {
            //alert(item.est_sigla);
            return $( "<li></li>" )
                .data( "item.autocomplete", item )
                .append( "<a style='font-size:9px;'>" + item.est_sigla +  " - " + item.est_nome + "</a>")
                //.append( "<a style='font-size:9px;'>" + item.orgao_sigla +  " &gt; " + item.classe +  " &gt; " +  item.subclasse +  " &gt; " +  item.serie + " &gt; " +   item.value +  "</a>")
                .appendTo( ul );
        };
    }
    
    //=========================================
    //autocomplete da cidade
    //=========================================   
    
    alpha3 = $( "#cidadeNomeId").autocomplete({
        minLength: 0,
        source: "includes/cliente/buscar_cidade.php?est_sigla=" + $( "#IdEst" ).val(),
        focus: function( event, ui ) {
            $( "#cidadeNomeId" ).val( ui.item.cid_nome );
            $( "#IdCid" ).val( ui.item.cid_id ); 
            
            return false;
        },
        select: function( event, ui ) {
            $( "#IdCid" ).val( ui.item.cid_id );
            $( "#IdEst" ).val( ui.item.est_sigla ); 
             
            return false;
        }
    }) ;
    if (alpha3.length>0){
        alpha3.data( "autocomplete" )._renderItem = function( ul, item ) {
            return $( "<li></li>" )
                .data( "item.autocomplete", item )
                .append( "<a style='font-size:9px;'>" + item.est_sigla +  " - " + item.cid_nome + "</a>")
                //.append( "<a style='font-size:9px;'>" + item.orgao_sigla +  " &gt; " + item.classe +  " &gt; " +  item.subclasse +  " &gt; " +  item.serie + " &gt; " +   item.value +  "</a>")
                .appendTo( ul );
        };
    }
    
    $("#cep").mask("99999-999");
    $("#tel").mask("(99)9999-9999"); 
    //$("#cnpj").mask("99.999.999/9999-99"); 
    //$("#cpf").mask("999.999.999-99"); 
   
});

function TrocarCliente()
{   
    $('#TrocarCliente').css('visibility', 'visible');
    $('#TrocarCliente').css('width', '');
    $('#botaoTrocarCliente').css('visibility', 'hidden');
}

function MudarTipoCliente(divId, divMask, change){
    var tipo = $(divId).val();
    var valor = $(divMask).val();
    $(divMask).val('');
    //return;
    
    $(divMask).mask("99.999.999/9999-99");   
    if (tipo == 2){
         $(divMask).unmask("999.999.999-99"); 
         $(divMask).mask("99.999.999/9999-99");    
    } 
    if (tipo == 1){
        $(divMask).unmask("99.999.999/9999-99");    
        $(divMask).mask("999.999.999-99");    
    } 
    if (!change)
    $(divMask).val(valor); 
}