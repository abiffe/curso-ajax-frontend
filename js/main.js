var urlAtual = $(location);
$(document).ready(function () {
    quantidadeCaracteres();
    paginaAtual();
    apareceAjuda();
    mostraSenha();
    $("#ajuda").animate({
        opacity: 0.3,
        "margin-left": "10em",
    }, {
        duration: 3000,
        easing: "linear"
    });
    $("#ajuda2").animate({
        opacity: 0.3,
        "margin-left": "10em",
    }, {
        duration: 3000,
        easing: "swing"
    })
});

/**
 * função e evento de keypress para contar os caracteres de um textarea
 */
function quantidadeCaracteres() {
    $("#campoDigitacao").on("keypress input", function () {
        let campoDigitacao = $(this);
        campoDigitacao.off("keypress");
        console.log(campoDigitacao.val().length);
        let caracteresInformados = $("#caracteres_informados");
        if(caracteresInformados.length == 0){
            campoDigitacao.parent().append("<p id='caracteres_informados'>"+
            "Caracteres Digitados "+campoDigitacao.val().length+"</p>");
            removeContador();
        }else{
            caracteresInformados.text("Caracteres Digitados "+campoDigitacao.val().length);
        }
    });
}

/**
 * função verificar em qual página estamos e mostrar na navbar
 */
function paginaAtual() {
    /**
     * obtenha todos li com classe nav-item que sejam filhos
     * de um ul com classe navbar-nav
     */
    $("ul.navbar-nav li.nav-item").each(function () {
        let $this = $(this);
        /**
         * separando as funções executadas para compreender:
         * $this.find("a").attr("href") -->  
         *  a partir do elemento atual (<li>) encontre um elemento <a> e pegue seu atributo href
         * urlAtual.attr("href").includes("string a ser procurada") --> 
         *  verifica se o atributo da urlAtual contém a string que estamos procurando
         */
         if(urlAtual.attr("href").includes($this.find("a").attr("href"))){
             /**
              * caso encontre, ou seja, caso a página atual seja 
              * o elemento que estamos lendo, marque como ativo
              */
             $this.addClass("active");
         }else{
             //se não, se tiver uma classe ativo, remova ela
             if($this.hasClass("active")){
                 $this.removeClass("active");
             }
         }
     });
}

/**
 * função para mostrar ou retirar o texto de ajuda
 */
function apareceAjuda() {
    $("#ajuda").on("click", function () {
         let textoAjuda = $("#textoAjuda");
         if(textoAjuda.is(":hidden")){
            textoAjuda.stop().slideDown("slow");
         }else{
            textoAjuda.stop().slideUp("slow");
         }
    });
}

/**
 * remover o contador de caracteres quando houver um double click
 */
function removeContador() {
    $("#caracteres_informados").one("dblclick", function () {
        $(this).remove();
    });
}
 /**
  * função para mostrar a senha quando o mouse entrar no e deixar invivel quando sair do campo
  */
function mostraSenha() {
    let password = $("#password");
    password.on("mouseenter mouseleave", function (e) {
        console.log(e);
        if($(e).attr("type") == "mouseenter"){
            password.attr("type", "text");
        }
        if($(e).attr("type") == "mouseleave"){
            password.attr("type", "password");
        }
    });
}
