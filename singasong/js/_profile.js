const login = document.getElementById("login");
if(login !== null){
	login.onclick = function(){
		window.location = "/pages/login.html";
	}
}
	
const settings = document.getElementById("settings");
if(settings !== null){
	settings.onclick = function(){
		window.location = "/pages/settings.html";
	}
}

const about = document.getElementById("about");
if(about !== null){
	about.onclick = function(){
		window.location = "/pages/about.html";
	}
}