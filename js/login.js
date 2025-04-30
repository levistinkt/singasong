logincookie = getCookie('login');

if (logincookie){
	showmessage('Gebruikersnaam of wachtwoord ongeldig, probeer het opnieuw', 'orange', 3000);
	
	eraseCookie("login");
}

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#psw-form");

togglePassword.addEventListener("click", function () {
	const type = password.getAttribute("type") === "password" ? "text" : "password";
	password.setAttribute("type", type);
	this.classList.toggle("bi-eye");
});