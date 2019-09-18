var urlAtual = $(location);
$(document).ready(function () {
    /*console.log($("h1").text());
    var bemVindo = $(".bem-vindo");
    bemVindo.text("Olá Seja Bem Vindo!");
    bemVindo.removeClass("bem-vindo");
    var h2 = $("h2");
    h2.text("Estou aqui para aprender");
    h2.addClass("bem-vindo-red");
    $(".navbar-brand").text("Sistema"); 
    console.log($("ul li"));
    console.log($("ul > li"));
    console.log($("ul.navbar-nav li"));
    console.log($("ul.navbar-nav li.nav-item"));
    console.log($("li a"));
    console.log($("li a[href!='#']"));*/
    $("ul.navbar-nav li.nav-item").each(function () {
       let $this = $(this);
        console.log($this);
        if($this.hasClass("active")){
            console.log("Ativo");
            $this.removeClass("active");
        }
       console.log(urlAtual.attr("href").includes("form.html"));
       
       if(urlAtual.attr("href").includes("form.html")){
        //console.log("Form");   
        //console.log($this.find("a").attr("href") == "form.html");
        let href = $this.find("a").attr("href");
        if(href == "form.html"){
            $this.addClass("active");
        }   
        //$("li > a[href='form.html']").addClass("active");
       } 

       if(urlAtual.attr("href").includes("index.html")){
            console.log($("li > a[href='index.html']"));
            $("li > a[href='index.html']").addClass("active");
        } 
    });
    /*$("h1").click(function () {
        $(this).toggleClass("bem-vindo"); 
    });*/
    $("h1").on("click mouseenter", function () {
        $(this).toggleClass("bem-vindo"); 
    });

    quantidadeCaracteres();

});

/**
 * função e evento de keypress para contar os caracteres de um textarea
 */
function quantidadeCaracteres() {
    $("#campoDigitacao").on("keypress", function () {
        console.log($(this).val().length);
    });
}