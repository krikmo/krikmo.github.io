function makepass() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 23; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

document.getElementById("num").innerHTML = makepass();
