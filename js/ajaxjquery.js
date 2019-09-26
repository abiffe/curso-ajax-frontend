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
            document.cookie = "token="+result.success.token;
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
function login(usuario, senha, botao) {
    let botaoJ = $(botao);
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
        botaoJ.after("<div class='alert-success'>Login Efetuado com Sucesso!</div>");
    }).fail(function (error) {
       console.log("error");
       console.log(error);
       if(error.status == 0){
           botaoJ.after("<div class='alert-danger'>Algo de errado aconteceu, tente novamente.</div>");
       } 
       if(error.status == 401){
        botaoJ.after("<div class='alert-danger'>Seu login/senha estão incorretos.</div>");
       }
    }).always(function () {
        console.log("Always");
        removeSpinner(botao);
    });
}

/**
 * função para adicionar um spinner a um botão
 * @param {HTMLElement} botao 
 */
function apareceSpinner(botao) {
    let botaoJ = $(botao);
    //procura dentro do botao se já tem um spinner
    if(botaoJ.find(".spinner-border").length == 0){
        //se não tiver, adicione ele
        botaoJ.append(" <span class='spinner-border spinner-border-sm'></span>")
    }
}

function removeSpinner(botao) {
    let spinner = $(botao).find(".spinner-border");
    if(spinner.length > 0){
        spinner.remove();
    }
}

/**
 * função para adicionar um evento de submit em um formulário com id login
 */
function loginEvent() {
    $("#login").on("submit", function (e) {
        e.preventDefault();
        apareceSpinner(this.submit);
        login($(this.email).val(), $(this.password).val(), this.submit);
    });   
}

function obtemUsuarios() {
    $.ajax({
        url: "http://10.144.13.124:8000/api/users",
        type: "GET",
        dataType: "json",
        beforeSend: function (request) {
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Authorization", "Bearer "+getCookie("token"))
        },
        success: function (result) {
            console.log("Sucesso");
            console.log(result.users);
            let listaUsers = $("ul.list-group");
            result.users.forEach(usuario => {
                console.log(usuario);
                listaUsers.append('<li class="list-group-item d-flex '+
                'justify-content-between align-items-center">'+
                usuario.name+' <span>'+
                '<button class="btn btn-sm btn-danger" onclick="deletaUser('+usuario.id+', this)">'+
                '<i class="fas fa-trash"></i></button></span>'+
                '</li>');               
            });
        },
        error: function (error) {
            console.log("Error");
            console.log(error);
        }
    });
}

/**
 * função para excluir um usuário
 * @param {int} id_user 
 * @param {HTMLElement} botao 
 */
function deletaUser(id_user, botao) {
    console.log(id_user);
    console.log(botao);
    apareceSpinner(botao);
    $.ajax({
        url: "http://10.144.13.124:8000/api/delete",
        type: "DELETE",
        beforeSend: function (request) {
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Authorization", "Bearer "+getCookie("token"));
        },
        dataType: "json",
        data: {
            id: id_user
        },
        success: function () {
            let linha = $(botao).parent().parent();
            linha.fadeOut();
            setTimeout(function() {
                linha.remove();
            }, 1500);
        },
        error: function (error) {
            $(botao).before("<span>"+error.statusText+"</span>");
            removeSpinner(botao);
        }
    });
}

function logout() {
    $.ajax({
        url: "http://10.144.13.124:8000/api/logout",
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Authorization", "Bearer "+getCookie("token"));
        },
        dataType: "json"
    }).done(function (result) {
        console.log("Logout efetuado com sucesso");
    }).fail(function (error) {
        if(error.status != 0){
            console.error(error);
        }
        setTimeout(function () {
            if(error.status == 0){
                console.error("TIME OUT");
            }
        }, 2000);
    });
}