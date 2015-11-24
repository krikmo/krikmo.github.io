function getUrlData() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
var text = "";
var getLength = getUrlData()["len"];
function makepass() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@";
    for (var i = 0; i < getLength; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
document.getElementById("num").innerHTML = makepass();

if (text === "") {
    document.getElementById("num").innerHTML = "To generate your password, you need to format the URL like this: \"pass.html?len=23\", where 23 is the length of your password.";
} else {
}
