function usersXML() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Sucesso XML");
            console.log(JSON.parse(this.responseText));
        }else{
            console.log('erro');
            console.log(this.statusText);
            console.log(this.status);
            console.log(this.responseText);
        }
    };
    xhttp.open("GET", "http://10.144.13.124:8000/api/users", true);
    xhttp.setRequestHeader("Accept", 'application/json');
    xhttp.setRequestHeader("Authorization", 'Bearer '+ getCookie("token"));
    xhttp.send();
}