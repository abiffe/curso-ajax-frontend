$(document).ready(function () {
   cadastroEvent();
   loginEvent();
});

/**
 * função para cadastrar um usuário
 * 
 * @param {string} pName 
 * @param {email} pEmail 
 * @param {string} pPassword 
 * @param {string} pC_password 
 */
 function cadastraUser(pName, pEmail, pPassword, pC_password) {
    $.ajax({
        url: "http://10.144.13.124:8000/api/register",
        type: "POST",
        dataType: "json",
        data: {
            name: pName,
            email: pEmail,
            password: pPassword,
            c_password: pC_password
        },
        success: function (result, statusText, xhr) {
            console.log("Sucesso");
            console.log(result);
        },
        error: function (xhr) {
            console.log("Erro");
            let erros = xhr.responseJSON.error;
            console.log(erros);
            if(erros.email != null){
                let email = $("#email");
                //email.parent().find(".invalid-feedback").text(erros.email);
                if(email.hasClass("is-invalid")){
                    email.parent().find(".invalid-feedback").text(erros.email);
                }else{
                    email.addClass("is-invalid");//adiciona a classe de invalido ao email
                    email.after("<div class='invalid-feedback'>"+
                                    erros.email+
                                    "</div>");//adiciona a mensagem de invalido ao email
                }
            }
            if(erros.password != null){
                let password = $("#password");
                if(password.hasClass("is-invalid")){
                    password.parent().find(".invalid-feedback").text(erros.password);
                }else{
                    password.addClass('is-invalid');
                    password.parent().append("<div class='invalid-feedback'>"+
                                    erros.password+
                                    "</div>");//adiciona a mensagem de invalido na senha
                }
            }
        },
        complete: function (xhr) {
            console.log("Finalizou");
            console.log(xhr);
        }
    });
}

/**
 * função para adicionar um evento de submit em um formulário com id cadastro
 */
function cadastroEvent() {
    $("#cadastro").on("submit", function (e) {
        e.preventDefault();
        console.log($(this.submit));
        cadastraUser($(this.name).val(),$(this.email).val(),
        $(this.password).val(), $(this.c_password).val());
    });   
}

/**
 * função para fazer um login ajax
 * 
 * @param {string} usuario 
 * @param {string} senha 
 */
function login(usuario, senha) {
    $.ajax({
        url: "http://10.144.13.124:8000/api/login",
        type: "POST",
        dataType: "json",
        data: {
            email: usuario,
            password: senha
        },
    }).done(function (result) {
        console.log("Sucesso");
        console.log(result);
        document.cookie = "token="+result.success.token;
    }).fail(function (error) {
       console.log("error");
       console.log(error); 
    }).always(function () {
        console.log("Always");
    });
}

/**
 * função para adicionar um evento de submit em um formulário com id login
 */
function loginEvent() {
    $("#login").on("submit", function (e) {
        e.preventDefault();
        login($(this.email).val(), $(this.password).val());
    });   
}