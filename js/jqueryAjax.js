$(document).ready(function () {
     //cadastraUser();
     //login();
     cadastraUser("André", "andre6@biffe.com", "123456", "123456");
 });

 /**
  * função para obter as inforções do usuário logado
  * tem que informar o token de acesso
  */
 function detalhesUser() {
    $.ajax({
        url: "http://192.168.56.110:8000/api/details",
        type: "POST",
        dataType: "json",
        beforeSend: function (request) {
            request.setRequestHeader('Accept', 'application/json');
            request.setRequestHeader('Authorization', 'Bearer '+ getCookie("token"));  
        },
        success: function (result) {
            console.log("Sucesso jQuery");
            console.log(result.success);
        },
        error: function (error) {
            console.log("Erro jQuery");
            /**
             * se o erro.status for != 0 então o servidor está up
             */
            if(error.status != 0){
                console.log(error);
            }
            setTimeout(function (){
                //se não informe time out
                if(error.status == 0){
                    console.log("TIME OUT");
                }
            }, 1500);
        }
    });
 }

 /**
  * função apra fazer o cadastro de um usuário
  * 
  * @param {string} name 
  * @param {string} email 
  * @param {string} password 
  * @param {string} c_password 
  */
 function cadastraUser(name, email, password, c_password) {
    $.ajax({
        url: "http://192.168.56.110:8000/api/register",
        type: "POST",
        dataType: "json",
        data: {
            name : name,
            email: email,
            password: password,
            c_password: c_password
        },
        success: function (result) {
            console.log("Sucesso Cadastro");
            console.log("Result");
            console.log(result);
            console.log(result.success.token);
            document.cookie = 'token='+result.success.token;
        },
        error: function (error) {
            console.log("ERRO Cadastro");
            /**
             * se o erro.status for != 0 então o servidor está up
             */
            if(error.status != 0){
                let errors = error.responseJSON;
                if(errors.length != 0){
                    console.log(errors.error);
                }
                console.log(error.status);
            }
            setTimeout(function (){
                //se não informe time out
                if(error.status == 0){
                    console.log("TIME OUT");
                }
            }, 1500);
        }
    });
 }

 /**
  * função para fazer o login de um usuário
  * 
  * @param {string} user email 
  * @param {string} password 
  */
 function login (user, password){
     $.ajax({
         url: "http://192.168.56.110:8000/api/login",
         type: "POST",
         dataType: "json",
         data: {
             email: user,
             password: password
         },
     }).done(function(result){
         console.log("Sucesso");
         console.log(result);
         console.log(result.success.token);
        document.cookie = 'token='+result.success.token;
     }).fail(function (error){
        console.log("Erro");
        console.log(error);
        console.log(error.responseJSON.error);
        console.log(error.status);
     }).always(function(){
         console.log("Always");
     });
 }

 /**
  * função para fazer logout
  * tem que passar o token de acesso
  */
 function logout() {
    $.ajax({
        url: "http://192.168.56.110:8000/api/logout",
        type: "POST",
        dataType: "json",
        beforeSend: function (request) {
            request.setRequestHeader('Accept', 'application/json');
            request.setRequestHeader('Authorization', 'Bearer '+ getCookie("token"));  
        },
        success: function (result) {
            console.log("Sucesso jQuery");
            console.log(result.message);
        },
        error: function (error) {
            console.log("Erro jQuery");
            /**
             * se o erro.status for != 0 então o servidor está up
             */
            if(error.status != 0){
                console.log(error.status);
                console.log(error.responseJSON.message);
            }
            setTimeout(function (){
                //se não informe time out
                if(error.status == 0){
                    console.log("TIME OUT");
                }
            }, 1500);
        }
    });
 }
 
 /**
  * função para deletar um usuário a partir de seu id
  * 
  * @param {int} id 
  */
 function deleteUser(id) {
    $.ajax({
        url: "http://192.168.56.110:8000/api/delete",
        type: "DELETE",
        dataType: "json",
        beforeSend: function (request) {
            request.setRequestHeader('Accept', 'application/json');
            request.setRequestHeader('Authorization', 'Bearer '+ getCookie("token"));  
        },
        data: {
            id: id,
        },
        success: function (result) {
            console.log("Sucesso jQuery");
            console.log(result.message);
        },
        error: function (error) {
            console.log("Erro jQuery");
            /**
             * se o erro.status for != 0 então o servidor está up
             */
            if(error.status != 0){
                console.log(error.status);
                console.log(error.responseJSON.error);
            }
            setTimeout(function (){
                //se não informe time out
                if(error.status == 0){
                    console.log("TIME OUT");
                }
            }, 1500);
        }
    });
 }

 /**
  * função para obter os usuários
  * tem que passar o token de acesso
  */
 function users() {
    $.ajax({
        url: "http://192.168.56.110:8000/api/users",
        type: "GET",
        dataType: "json",
        beforeSend: function (request) {
            request.setRequestHeader('Accept', 'application/json');
            request.setRequestHeader('Authorization', 'Bearer '+ getCookie("token"));  
        },
        success: function (result, textStatus, xhr) {
            console.log("Sucesso jQuery");
            console.log(xhr);
            console.log(result.users);
        },
        complete: function (xhr) {
            console.log(xhr);
        },
        error: function (error) {
            console.log("Erro jQuery");
            /**
             * se o erro.status for != 0 então o servidor está up
             */
            if(error.status != 0){
                console.log(error);
            }
            setTimeout(function (){
                //se não informe time out
                if(error.status == 0){
                    console.log("TIME OUT");
                }
            }, 1500);
        }
    });
 }

 /**
  * obter um token armazenado no cookie
  * @param {string} cname 
  */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
 