usertoken = getCookie('token');

if(getCookie('dateOK')){
	showmessage('Fuif datum is gezet','green', 2000);
	eraseCookie("dateOK");
}

document.getElementById('font-up-btn').addEventListener('click', function() {
	if(document.body.classList.contains('xs')) {
		document.body.classList.replace("xs","s"); 
		return;
	}
	if(document.body.classList.contains('s')) {
		document.body.classList.replace("s","m"); 
		return;
	}
	if(document.body.classList.contains('m')) {
		document.body.classList.replace("m","l"); 
		return;
	}
	if(document.body.classList.contains('l')) {
		document.body.classList.replace("l","xl"); 
		return;
	}
	if(document.body.classList.contains('xl')) {
		showmessage('Tijd voor een bril, ni ?', 'orange', 3000);
		return;
	}
});

document.getElementById('font-down-btn').addEventListener('click', function() {
	if(document.body.classList.contains('xl')) {
		document.body.classList.replace("xl","l"); 
		return;
	}
	if(document.body.classList.contains('l')) {
		document.body.classList.replace("l","m"); 
		return;
	}
	if(document.body.classList.contains('m')) {
		document.body.classList.replace("m","s"); 
		return;
	}
	if(document.body.classList.contains('s')) {
		document.body.classList.replace("s","xs"); 
		return;
	}
	if(document.body.classList.contains('xs')) {
		showmessage('Vergrootglas nodig ?', 'orange', 3000);
		return;
		
	}
});

// ####
// ## Show admin elements
// ####
if(usertoken){
	jQuery.ajax({
		type: "POST",
		url: '../php/users.php',
		data: {
			functionname: 'getUserDetails',
			param: usertoken
		},
		success: function (response) {
			result = JSON.parse(response);			
			if( result[0].role === 'admin'){
				document.getElementById("pageSetup").style.display = '';
				document.getElementById("admin").style.display = '';
			} 
		},
		error: function () {
		}
	});
}

// ####
// ## Update all user tokens
// ####
const updateUserToken = document.getElementById("updateUserToken");
if(updateUserToken !== null){
	updateUserToken.onclick = function(){	
		jQuery.ajax({
			type: "POST",
			url: '../php/users.php',
			data: {
				functionname: 'UpdateAllUserTokens'
			},
			success: function (response) {
				window.location = "/index.html";
			},
			error: function () {
			}
		});
	}
}

// ####
// ## Load Songlist
// ####
const loadSongs_btn = document.getElementById("loadSongs-btn");
if(loadSongs_btn){
	loadSongs_btn.onclick = function() {
		$('#loader').fadeIn(250);
		jQuery.ajax({
			type: "POST",
			url: '../php/songs.php',
			data: {functionname: 'LoadSongList'},
			success: function (response) {
				console.log(response);
				var results = JSON.parse(response);
				text = results +  ' nummers geupate';
				$('#media').html('<div id=\"socials\" style=\"background: green;color: var(--elements); border:2px solid var(--elements); box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);position:fixed;width:80%;left:50%;bottom:30%;transform: translate(-50%, -50%);z-index: 10;padding: 10px; border-radius: 10px;text-align: center;\">' + text + '</div>');
				document.getElementById('bgMediaOverlay').style.display = 'block';
				$('#loader').fadeOut(250);
			},
			error: function () {
				text = 'Error met het updaten van de nummers..';
				$('#media').html('<div id=\"socials\" style=\"background: red;color: var(--elements); border:2px solid var(--elements); box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);position:fixed;width:80%;left:50%;bottom:30%;transform: translate(-50%, -50%);z-index: 10;padding: 10px; border-radius: 10px;text-align: center;\">' + text + '</div>');
				document.getElementById('bgMediaOverlay').style.display = 'block';
			}
		});
	}
}

const users = document.getElementById("users");
if(users !== null){
	users.onclick = function(){
		window.location = "/pages/users.html";
	}
}

const queue = document.getElementById("queue");
if(queue !== null){
	queue.onclick = function(){
		window.location = "/pages/queue.html";
	}
}

const setDate = document.getElementById("setDate");
if(setDate !== null){
	setDate.onclick = function(){
		new Rolldate({
			format: 'MM-DD-YYYY',
			beginYear: new Date().getFullYear() -1,
			endYear: new Date().getFullYear() +5,
			confirm: function(date) {
				jQuery.ajax({
					type: "POST",
					url: '../php/date.php',
					data: {
						functionname: 'setGameDate',
						param: date
					},
					success: function (response) {
						location.reload;
					},
					error: function () {
					}
				});
			}
		});
		
		$('#menu-header').html('Wanneer is de eerst volgende fuif ?')
				
		document.getElementById('song-menu').style.visibility = 'visible'; 
		document.getElementById('song-menu').style.transform = 'translate(0px)';
		document.getElementById('bgMenuOverlay').style.display = 'block';		
	}
}

const saveSettings = document.getElementById("saveSettings");
if(saveSettings !== null){
	saveSettings.onclick = function() {
		
		theme = root.style.getPropertyValue('--theme-color');
		theme = theme.substring(6, theme.length -1);
		localStorage.setItem("theme-color", theme);
		
		type = root.style.getPropertyValue('--font');
		type = type.substring(6, type.length -1);
		localStorage.setItem("font-type", type);
		
		if(document.body.classList.contains('dark-mode')) {
			localStorage.setItem("dark-mode", "enabled");	
		} else {
			localStorage.removeItem("dark-mode");
		}
		
		if(document.body.classList.contains('row')) {
			localStorage.setItem("row-order", "row");	
		} 
		if(document.body.classList.contains('reverse')) { 
			localStorage.setItem("row-order", "reverse");	
		}
		
		if(document.body.classList.contains('topper_footer')) {
			localStorage.setItem("balk-order", "topper_footer");	
		} 
		if(document.body.classList.contains('footer_topper')) {
			localStorage.setItem("balk-order", "footer_topper");	
		} 
		
		if(document.body.classList.contains('xs')) {
			localStorage.setItem("font-size", "xs");
		} 
		if(document.body.classList.contains('s')) {
			localStorage.setItem("font-size", "s");
		} 
		if(document.body.classList.contains('m')) {
			localStorage.setItem("font-size", "m");
		} 
		if(document.body.classList.contains('l')) {
			localStorage.setItem("font-size", "l");
		} 
		if(document.body.classList.contains('xl')) {
			localStorage.setItem("font-size", "xl");
		} 
		
		if(usertoken){
			window.location = "/pages/profile.html";
		} else {
			window.location = "/pages/_profile.html";
		}
	}
}

const resetSettings = document.getElementById("resetSettings");
if(resetSettings !== null){
	resetSettings.onclick = function() {
		
		localStorage.removeItem("theme-color");
		localStorage.removeItem("dark-mode");
		localStorage.removeItem("font-size");
		localStorage.removeItem("font-type");
		localStorage.removeItem("row-order");
		localStorage.removeItem("balk-order");
				
		if(usertoken){
			window.location = "/pages/profile.html";
		} else {
			window.location = "/pages/_profile.html";
		}
	}
}

const goBack = document.getElementById("goBack");
if(goBack !== null){
	goBack.onclick = function() {
		
		if(usertoken){
			window.location = "/pages/profile.html";
		} else {
			window.location = "/pages/_profile.html";
		}
	}
}

const inputs = document.querySelectorAll("input[name='theme']");
for(const input of inputs) {
    if(theme && input.value === theme) {
        input.checked = true; 
        updateRootTheme(theme);
    }
    input.onchange = e => {
        updateRootTheme(e.target.value);
    }
}

const types = document.querySelectorAll("input[name='font']");
for(const fonts of types) {
    if(fonttype && fonts.value === fonttype) {
        fonts.checked = true;
        updateRootType(fonttype);
    }
    fonts.onchange = e => {
        updateRootType(e.target.value);
    }
}


const themebox = document.getElementById('themebox');
if (themebox !== null) {
	if (darkMode === "enabled") {
		themebox.checked = true;
	}

    themebox.addEventListener('change', e => {
        if(e.target.checked === true) {
            document.body.classList.add("dark-mode");
        }
        if(e.target.checked === false) {
            document.body.classList.remove("dark-mode");
        }
    });
}

const toggleHorButton = document.getElementById('hor-btn');
const topper = document.getElementById('topper');
toggleHorButton.addEventListener('click', () => {
    if(document.body.classList.contains('reverse')){
		document.body.classList.remove("reverse");
		document.body.classList.add("row");
		showmessage('menu elementen zijn gedraaid','green', 2000);
    } else {
		document.body.classList.remove("row");
        document.body.classList.add("reverse");
		showmessage('menu elementen zijn gedraaid','green', 2000);
    }
});

const toggleVerButton = document.getElementById('ver-btn');
toggleVerButton.addEventListener('click', () => {
    if(document.body.classList.contains('footer_topper')){
		document.body.classList.remove("footer_topper");
		document.body.classList.add("topper_footer");
		showmessage('menu balken zijn verwisseld','green', 2000);
    } else {
		document.body.classList.remove("topper_footer");
        document.body.classList.add("footer_topper");
		showmessage('menu balken zijn verwisseld','green', 2000);
    }
});