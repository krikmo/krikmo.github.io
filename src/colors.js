var theColor = prompt("Tell me a color", "all lowercase, please");

if (theColor === "black") {
    document.body.style.background = "black";
} else if (theColor === "white") {
    document.body.style.background = "white";
} else if (theColor === "red") {
    document.body.style.background = "red";
} else if (theColor === "blue") {
    document.body.style.background = "blue";
} else if (theColor === "green") {
    document.body.style.background = "green";
} else {
    document.getElementById("result").innerHTML = ("Find a better color");
}
