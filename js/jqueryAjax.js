$(document).ready(function () {
     cadastraUser();
 });

 function datalhesUser() {
    $.ajax({
        url: "http://192.168.100.6:8000/api/details",
        type: "POST",
        dataType: "json",
        beforeSend: function (request) {
            request.setRequestHeader('Accept', 'application/json');
            request.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU4ODc4YWRiNDBiZTIzYTJiMzNjMGIwM2Q1YTI5ZDcyMzg3MGE2NTViNTljNmU3MzE1YjFhMmU0NTk3YzE5OGYzYzc1NDFjMDIyMDc3OGJmIn0.eyJhdWQiOiIxIiwianRpIjoiZTg4NzhhZGI0MGJlMjNhMmIzM2MwYjAzZDVhMjlkNzIzODcwYTY1NWI1OWM2ZTczMTViMWEyZTQ1OTdjMTk4ZjNjNzU0MWMwMjIwNzc4YmYiLCJpYXQiOjE1Njg0ODU4ODIsIm5iZiI6MTU2ODQ4NTg4MiwiZXhwIjoxNjAwMTA4MjgyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.m6M9yf0C-YsoGfy0CHplK1pZcc5ZnFsFVEb3JFEGRQJAjLcuwl_u2BhJGYe6UbP3HOW7Eh5_feAa8eO9WFNdixtV9iPXsWDmbIIC_ICFMJJFVtF-X-ecdtiI5ByGY_Jc2dfNAH-IWzLFXpbxIRi9xutoneSx5KVz9C78yUAHXAEND0puEgORY4_vIt-i4zbZkwDLlJ-5EDorX1SYWtC9KcQ2OUmlfv-m1QAxKJ_L8CFYC2rvxyyK_QFna_x5XLHSE27wcFVVWEjI6c9udQNcOTD1ZnvgCW0sVN4CyW267znRHmSwhn8iy99oiKc1I_fA9-J5NHaOS_gcT3lVUZs1UHvM3QwdBsFM1EC1q4P2BIomctxpncsxUvuUKyo9nd_dzDUf-sABi1p7pTu_GyapgOPDTu8tlQA7TLKBaWjTy6qe5pUkTW-68Op37aOryhzZzIjklehBKsGOc-EEkhj-0bRkrGM9wyJ4k1jqCmOZQI1GlENjVvBYwvYAgZvRz2TSIqfTmeOgWiiv8YsO6t8sdyo1KpcZpbTOob1vNcGyOQdYOF5IlLWntyTS8UGc0d-bCbQJzXY5HQTSUgWEXnbv5W3IgCV09_TTJeg4Fb0VYhSxB8rv15-cqxYwcgvwtkzicFE8Yjl81AhfGcGAz0qUWMT1pcCTWV2jrxckG3Tj9KU');  
        },
        success: function (result) {
            console.log("Sucesso jQuery");
            console.log(result);
        },
        error: function (error) {
            console.log(error);
        }
    }).fail(function () {
        console.log("ERRO");
    });
 }

 function cadastraUser() {
    $.ajax({
        url: "http://192.168.100.6:8000/api/register",
        type: "POST",
        dataType: "json",
        data: {
            name : "André",
            email: "andre+biffe@biffe.com",
            password: "123456",
            c_password: "123456"
        },
        success: function (result) {
            console.log("Sucesso jQuery");
            console.log(result);
        },
        error: function (error) {
            let errors = error.responseJSON;
            console.log(errors.error.email != null);
        }
    });
 }
 