eraseCookie("token");

document.getElementById("menu-list").children[2].style.display = "";
document.getElementById("menu-list").children[4].style.display = "";

setInterval(function () {  
	window.location = "/index.html";  
}, 3000);  
    