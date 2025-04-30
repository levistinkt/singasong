usertoken = getCookie('token');
userResult = getCookie("userResult");
pwchangeResult = getCookie("pwchangeResult");
logincookie = getCookie('login');
addRequest = getCookie('addRequest');

const checkbox = document.getElementById('active-queue-box');

if (logincookie){
	PassFavourites();	
	eraseCookie("login");
}

if (userResult) {
	if (userResult === 'OK'){
		showmessage('Actie succesvol uitgevoerd', 'green', 2000);
	} else {
		showmessage(decodeURIComponent(userResult)  + ', probeer het opnieuw', 'orange', 3000);
	}	
	eraseCookie("userResult");
}

if (pwchangeResult) {
	if (pwchangeResult === 'OK'){
		showmessage('Wachtwoord succesvol aangepast', 'green', 2000);
	} else {
		showmessage(decodeURIComponent(pwchangeResult)  + ', probeer het opnieuw', 'orange', 3000);
	}	
	eraseCookie("pwchangeResult");
}

if (addRequest) {
	window.location = "/pages/request.html";
}

userDetails(usertoken);
userRequests(usertoken);

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
			
			if(result[0].active === '1'){
				showQueue();
			} 
		},
		error: function () {
		}
	});
}

function showQueue(){
	jQuery.ajax({
		type: "POST",
		url: '../php/date.php',
		data: {
			functionname: 'getGameDate'
		},
		success: function (response) {
			
			const gamedate = new Date(response);
			const today = new Date();
			const gamedate2 = new Date(gamedate);
			gamedate2.setDate(gamedate.getDate() + 1);
			
			if(today.toDateString() === gamedate.toDateString() || today.toDateString() === gamedate2.toDateString()){
				queueOverview();
				setInterval(function() {
					queueOverview();
				}, 2 * 1000); 
				document.getElementById("queue-section").style.display = "";
			}
			
		},
		error: function () {
		}
	});
}
	
function userDetails(id){
	var token = id;
	
	jQuery.ajax({
		type: "POST",
		url: '../php/users.php',
		data: {
			functionname: 'getUserDetails',
			param: token
		},
		success: function (response) {
			result = JSON.parse(response);
			document.querySelector('h3').textContent = 'Hallo ' + result[0].firstname + ' ' + result[0].lastname ;
			
			text = '<table id="tbl5" border="0">';
			text += '<tr><td>ID</td>' +'<td>'+ result[0].id + '</td></tr>';
			text += '<tr><td>Gebruikersnaam</td>' +'<td>'+ result[0].username + '</td></tr>';
			text += '<tr><td>Voornaam</td>' +'<td>'+ result[0].firstname + '</td></tr>';
			text += '<tr><td>Achternaam</td>' +'<td>'+ result[0].lastname + '</td></tr>';
			text += '<tr><td>Rol</td>' +'<td>'+ result[0].role + '</td></tr>';
			
			document.getElementById('profile').innerHTML = text; 

			if (result[0].favourites) {
				userFavourites(result[0].favourites);
			}
		},
		error: function () {
		}
	});
}

function userRequests(id){
	var token = id;
	var check = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="request-menu-btn" viewBox="0 -0.5 21 21" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="request-menu-btn" transform="translate(-179.000000, -400.000000)"><g id="icons" transform="translate(56.000000, 160.000000)"><path d="M141.9,243 C141.9,242.448 141.4296,242 140.85,242 L126.15,242 C125.5704,242 125.1,242.448 125.1,243 L125.1,257 C125.1,257.552 125.5704,258 126.15,258 L140.85,258 C141.4296,258 141.9,257.552 141.9,257 L141.9,243 Z M144,242 L144,258 C144,259.105 143.06025,260 141.9,260 L125.1,260 C123.93975,260 123,259.105 123,258 L123,242 C123,240.895 123.93975,240 125.1,240 L141.9,240 C143.06025,240 144,240.895 144,242 L144,242 Z M137.72205,247.015 C138.1326,247.405 138.1326,248.039 137.72205,248.429 L133.63965,252.317 C133.0233,252.903 132.0258,252.903 131.40945,252.317 L129.5541,250.55 C129.1446,250.16 129.1446,249.527 129.5541,249.136 C129.96465,248.746 130.6293,248.746 131.0388,249.136 L131.7801,249.842 C132.19065,250.233 132.8574,250.233 133.269,249.842 L136.23735,247.015 C136.64685,246.624 137.31255,246.624 137.72205,247.015 L137.72205,247.015 Z" id="done-[#1477]"></path></g></g></g></svg>'

	jQuery.ajax({
		type: "POST",
		url: '../php/users.php',
		data: {
			functionname: 'getUserRequests',
			param: token
		},
		success: function (response) {
            result = JSON.parse(response);
			
			duetIcon = '<svg id="duetIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="none"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z" stroke="white"/><path d="M14.3675 12.0632C14.322 12.1494 14.3413 12.2569 14.4196 12.3149C15.0012 12.7454 15.7209 13 16.5 13C18.433 13 20 11.433 20 9.5C20 7.567 18.433 6 16.5 6C15.7209 6 15.0012 6.2546 14.4196 6.68513C14.3413 6.74313 14.322 6.85058 14.3675 6.93679C14.7714 7.70219 15 8.5744 15 9.5C15 10.4256 14.7714 11.2978 14.3675 12.0632Z" stroke="white" /><path fill-rule="evenodd" clip-rule="evenodd" d="M4.64115 15.6993C5.87351 15.1644 7.49045 15 9.49995 15C11.5112 15 13.1293 15.1647 14.3621 15.7008C15.705 16.2847 16.5212 17.2793 16.949 18.6836C17.1495 19.3418 16.6551 20 15.9738 20H3.02801C2.34589 20 1.85045 19.3408 2.05157 18.6814C2.47994 17.2769 3.29738 16.2826 4.64115 15.6993Z" stroke="white"/><path d="M14.8185 14.0364C14.4045 14.0621 14.3802 14.6183 14.7606 14.7837V14.7837C15.803 15.237 16.5879 15.9043 17.1508 16.756C17.6127 17.4549 18.33 18 19.1677 18H20.9483C21.6555 18 22.1715 17.2973 21.9227 16.6108C21.9084 16.5713 21.8935 16.5321 21.8781 16.4932C21.5357 15.6286 20.9488 14.9921 20.0798 14.5864C19.2639 14.2055 18.2425 14.0483 17.0392 14.0008L17.0194 14H16.9997C16.2909 14 15.5506 13.9909 14.8185 14.0364Z" stroke="white"/></svg>';
			karaokeIcon = '<svg id="karaokeIcon2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="karaokeIcon" viewBox="0 0 512 512" xml:space="preserve" fill="none"><style type="text/css"></style><g><polygon points="0.001,437.167 74.823,512 354.337,254.387 257.614,157.664"/><path d="M269.9,143.663l98.428,98.417c34.239,6.143,70.52-2.472,98.869-25.709L295.63,44.804 C272.393,73.153,263.757,109.412,269.9,143.663z"/><path d="M476.317,35.674c-45.989-45.98-119.466-47.463-167.392-4.734l172.135,172.135 C523.789,155.15,522.306,81.663,476.317,35.674z"/></g></svg>';

            text = '<table id="tbl5" border="0">';
    
            $.each(result, function (i) {
				if (result[i].Progress === '100'){ checkbutton = check;} else {checkbutton = '';}
				if (result[i].duet) {duetInfo = duetIcon} else {duetInfo = '';}
				if (result[i].karaoke) {karaokeInfo = karaokeIcon} else {karaokeInfo = '';}
					
                text += '<tr class="ListTitle"><td rowspan="2" style="vertical-align:middle; text-align: middle; width: 3em" onclick="requestMenu(' + result[i].ID + ')"><svg xmlns="http://www.w3.org/2000/svg" id="song-menu-btn" viewBox="0 0 24 24" fill="none"><path d="M9 5L15 12L9 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></td>';
                text += '<td>' + result[i].Title + '</td>';
				text += '<td rowspan="2" style="vertical-align:middle; text-align: right;display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: flex-end;align-items: center;"><a href="/pages/song_details.html?request=' + result[i].Artist_Title + '">'+ checkbutton +'</a>'+ duetInfo + karaokeInfo + '</td></tr>';
                text += '<tr class="ListArtist"><td>'+ result[i].Artist +'</td></tr>';
                text += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
            });
        
            $('#reqs').html(text);
		},
		error: function () {	
		}
	});
}

function queueOverview(){
	jQuery.ajax({
		type: "POST",
		url: '../php/queue.php',
		data: {
			functionname: 'queueOverview'
		},
		success: function (response) {
            result = JSON.parse(response);
			
			const duetIcon = '<svg id="duetIconTable" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z"/><path d="M14.3675 12.0632C14.322 12.1494 14.3413 12.2569 14.4196 12.3149C15.0012 12.7454 15.7209 13 16.5 13C18.433 13 20 11.433 20 9.5C20 7.567 18.433 6 16.5 6C15.7209 6 15.0012 6.2546 14.4196 6.68513C14.3413 6.74313 14.322 6.85058 14.3675 6.93679C14.7714 7.70219 15 8.5744 15 9.5C15 10.4256 14.7714 11.2978 14.3675 12.0632Z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M4.64115 15.6993C5.87351 15.1644 7.49045 15 9.49995 15C11.5112 15 13.1293 15.1647 14.3621 15.7008C15.705 16.2847 16.5212 17.2793 16.949 18.6836C17.1495 19.3418 16.6551 20 15.9738 20H3.02801C2.34589 20 1.85045 19.3408 2.05157 18.6814C2.47994 17.2769 3.29738 16.2826 4.64115 15.6993Z"/><path d="M14.8185 14.0364C14.4045 14.0621 14.3802 14.6183 14.7606 14.7837V14.7837C15.803 15.237 16.5879 15.9043 17.1508 16.756C17.6127 17.4549 18.33 18 19.1677 18H20.9483C21.6555 18 22.1715 17.2973 21.9227 16.6108C21.9084 16.5713 21.8935 16.5321 21.8781 16.4932C21.5357 15.6286 20.9488 14.9921 20.0798 14.5864C19.2639 14.2055 18.2425 14.0483 17.0392 14.0008L17.0194 14H16.9997C16.2909 14 15.5506 13.9909 14.8185 14.0364Z"/></svg>';
			const rapIcon = '<svg id="rapIconTable" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M65.9,21.4c0.2,0.2,0.4,0.4,0.6,0.5c9.6,9.7,9.4,39.8,9.4,41.1c0,0.5-0.5,1-1,1h0c-0.6,0-1-0.5-1-1c0-0.3,0.2-30.6-8.8-39.6  c-1.4-1.4-2.9-2.2-4.6-2.4c-0.3,0-0.5,0-0.8,0c-0.3,0-0.6,0-0.9,0C38.6,21.8,37,50.4,37,50.7c0,0.5-0.5,1-1,1c0,0,0,0,0,0  c-0.6,0-1-0.5-1-1c0-0.3,1.1-20.2,13.1-28.3c-15.7,4-25.7,16.4-26.9,34.8L2.4,75.9c-1.5,1.5-0.2,3.9,1.8,3.6c2.3-0.3,5-1.6,7.9-1.6  c13.9,0,14.4,8.2,30.6,8.2c11.8,0,24.8-12.7,30.9-19.5c17.7-1.5,24.7-5.6,24.7-5.6C98.2,38.6,84.2,24.1,65.9,21.4z M67.9,67  c-6.3,0-13.4-3.3-20.2-6.5c-5.7-2.7-11.1-5.2-15.1-5.2c-5.5,0-7.4,1.1-7.4,1.1c-0.5,0.3-1.1,0.2-1.4-0.3c-0.3-0.5-0.2-1.1,0.3-1.4  c0.2-0.2,2.4-1.5,8.5-1.5c4.4,0,10,2.6,16,5.4c6.6,3.1,13.5,6.3,19.3,6.3c0.6,0,1,0.4,1,1S68.5,67,67.9,67z M63,17  c-0.1-1.8-1.5-3.2-3.3-3.2c-1.8,0-3.2,1.4-3.3,3.1c1.1-0.1,2.2-0.1,3.3-0.1C60.8,16.8,61.9,16.9,63,17z"/></svg>';
			const karaokeIcon = '<svg id="karaokeIconTable" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="karaokeIcon" viewBox="0 0 512 512" xml:space="preserve"><style type="text/css"></style><g><polygon points="0.001,437.167 74.823,512 354.337,254.387 257.614,157.664"/><path d="M269.9,143.663l98.428,98.417c34.239,6.143,70.52-2.472,98.869-25.709L295.63,44.804 C272.393,73.153,263.757,109.412,269.9,143.663z"/><path d="M476.317,35.674c-45.989-45.98-119.466-47.463-167.392-4.734l172.135,172.135 C523.789,155.15,522.306,81.663,476.317,35.674z"/></g></svg>';
			const removebtn = '<svg xmlns="http://www.w3.org/2000/svg"  id="favRemove-btn" viewBox="0 0 24 24" fill="none"><path d="M7 9.5L12 14.5M12 9.5L7 14.5M19.4922 13.9546L16.5608 17.7546C16.2082 18.2115 16.032 18.44 15.8107 18.6047C15.6146 18.7505 15.3935 18.8592 15.1583 18.9253C14.8928 19 14.6042 19 14.0271 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2C3 7.0799 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.07989 5 6.2 5H14.0271C14.6042 5 14.8928 5 15.1583 5.07467C15.3935 5.14081 15.6146 5.2495 15.8107 5.39534C16.032 5.55998 16.2082 5.78846 16.5608 6.24543L19.4922 10.0454C20.0318 10.7449 20.3016 11.0947 20.4054 11.4804C20.4969 11.8207 20.4969 12.1793 20.4054 12.5196C20.3016 12.9053 20.0318 13.2551 19.4922 13.9546Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            
			text = '<table id="tbl5" border="0">';
    
            $.each(result, function (i) {
				comment = result[i].Comment.toLowerCase();
				if (comment.includes('duet')){duet = duetIcon;}else{duet = '';}
				if (comment.includes('rap')){rap = rapIcon;}else{rap = '';}
				if (comment.includes('karaoke')){karaoke = karaokeIcon;}else{karaoke = '';}
				if (checkbox.checked && result[i].State === '3'){style += 'display: none'};
				if (result[i].State === '3'){
					style = 'filter: grayscale(1); text-decoration: line-through; text-decoration-thickness:3px;'; 
					style2 = 'fill:gray';
				}
				if (result[i].State === '2'){
					style = 'background: '+ root.style.getPropertyValue('--theme-color'); 
					style2 = 'fill:white';
				}
				if (result[i].State === '1'){
					style = 'background: '+ root.style.getPropertyValue('--theme-color') +'; opacity: 40%'; 
					style2 = 'fill:white';
				}
				if (result[i].State === '0'){
					style = 'filter: grayscale(0); text-decoration: none;';
					style2 = 'stroke:var(--theme-color);';				
				}
				text += '<tr class="ListTitle" style="'+ style +'" data-state="'+ result[i].State +'"><td rowspan="2" style="width: 3em"><img id="songCover" style="vertical-align:middle; border-radius: 5px; width:10vw; height: 10vw;" src="' + result[i].Cover + '">';
				text += '<td style="'+ style2 +'">' + result[i].Title + ' ' + duet + rap + karaoke +'</td>';
				text += '<td rowspan="2" style="vertical-align:middle; text-align: middle; width: 54px;text-align: right;" onclick="queueItemDetails(' + result[i].ID + ')"><svg xmlns="http://www.w3.org/2000/svg" id="song-menu-btn" style="'+style2+'" viewBox="0 0 24 24" fill="none"><path d="M9 5L15 12L9 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></td>';
				text += '<tr class="ListArtist" style="'+ style +'" data-state="'+ result[i].State +'"><td>' + result[i].Artist + '</td></tr>';
				text += '<tr style="height: 10px;" data-state="'+ result[i].State +'"><!– Mimic the margin –></tr>';
			});
        
            $('#queue').html(text);
		},
		error: function () {	
		}
	});
}


if (checkbox) {
	checkbox.addEventListener('change', () => {
		const rows = document.querySelectorAll('tr[data-state="3"]');
		if (checkbox.checked) {
			rows.forEach(row => {
				row.style.display = 'none';
			});
		} else {
			rows.forEach(row => {
				row.style.display = '';
			});
		}
	});
}

function PassFavourites(){
	
	var favourites = localStorage.getItem('stored_favourites');
    
    if (favourites){
        jQuery.ajax({
            type: "POST",
            url: '/php/users.php',
            data: {
                functionname: 'PassFavourites',
                param: favourites
            }
        });
    }
};

function getFavouritesArray() {
    const favourites = localStorage.getItem('stored_favourites');
    
    if (!favourites) {
        return [];
    }
    
    const favouritesArray = favourites.split(',').map(item => item.trim());
    
    return favouritesArray;
}

const changePass = document.getElementById("changePass");
if(changePass !== null){
	changePass.onclick = function(){
		id = getCookie('token');
		
		text1 = 'Wachtwoord wijzigen';
				
		text2 = '<form action="/php/users.php" method="POST">';
		text2 += '<div class="pwEditForm">';
		text2 += '<input type="text" id="action" value="changePass" name="action" style="display:none;">';
		text2 += '<input type="text" id="id-form" value="' +  id + '" name="id" autocomplete="username" style="display:none;" required>';
		text2 += '<label for="current_password"><b>Huidig wachtwoord</b></label>';
		text2 += '<input type="password" id="current-password-form" placeholder="Vul huidig wachtwoord in" autocomplete="current-password" name="current_password" required>';
		text2 += '<i class="bi bi-eye-slash" id="cp-togglePassword"></i>';
		text2 += '<label for="new_password1"><b>Nieuw wachtwoord</b></label>';
		text2 += '<input type="password" id="new-password-form1" placeholder="Vul nieuw wachtwoord in"  autocomplete="new-password" name="new_password1" required>';
		text2 += ' <i class="bi bi-eye-slash" id="n1-togglePassword"></i>';
		text2 += '<label for="new_password2"><b>Herhaal nieuw wachtwoord</b></label>';
		text2 += '<input type="password" id="new-password-form2" placeholder="Herhaal nieuw wachtwoord"  autocomplete="new-password" name="new_password2" required>';
		text2 += '<i class="bi bi-eye-slash" id="n2-togglePassword"></i>';
		text2 += '</div>';
		text2 +=' <div class="userctl">';
		text2 += '<button type="submit" class="editbtn" name="Edit">OK</button>'
		text2 += '</div></form>';
				   
		$('#menu-header').html(text1)
		$('#menu-details').html(text2);
		
		document.getElementById('song-menu').style.visibility = 'visible'; 
		document.getElementById('song-menu').style.transform = 'translate(0px)';
		document.getElementById('bgMenuOverlay').style.display = 'block';
		window.addEventListener('scroll', noscroll); 	
		
		const togglePassword1 = document.querySelector("#cp-togglePassword");
		const password1 = document.querySelector("#current-password-form");
		const togglePassword2 = document.querySelector("#n1-togglePassword");
		const password2 = document.querySelector("#new-password-form1");
		const togglePassword3 = document.querySelector("#n2-togglePassword");
		const password3 = document.querySelector("#new-password-form2");

		togglePassword1.addEventListener("click", function () {
			const type = password1.getAttribute("type") === "password" ? "text" : "password";
			password1.setAttribute("type", type);
			this.classList.toggle("bi-eye");
		});
		
		togglePassword2.addEventListener("click", function () {
			const type = password2.getAttribute("type") === "password" ? "text" : "password";
			password2.setAttribute("type", type);
			this.classList.toggle("bi-eye");
		});
		
		togglePassword3.addEventListener("click", function () {
			const type = password3.getAttribute("type") === "password" ? "text" : "password";
			password3.setAttribute("type", type);
			this.classList.toggle("bi-eye");
		});
	};
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

function queueItemDetails(id){
	jQuery.ajax({
		type: "POST",
		url: '../php/queue.php',
		data: {
			functionname: 'queueItemDetails',
			param: id
		},
		success: function (response) {
            result = JSON.parse(response);
			
			text1 = '<div id="div_menu_cover"><a href="/pages/song_details.html?value=' + result.SongID +'"><img id="menu_cover" src="' + result.Cover + '" alt="'+ result.SongID +'"></a></div>';
			text1 += '<div id="menu_artist_title"><a href="/pages/song_details.html?value=' + result.SongID +'" style="text-decoration: none;color: var(--elements);">' +  result.Title + '<br>' + result.Artist + '</a></div>';
			text1 += '<a href="/pages/song_details.html?value=' + result.SongID +'"><svg xmlns="http://www.w3.org/2000/svg\" id="song-btn" viewBox="0 0 24 24" fill="none" style="padding-right: 1em;">';
			text1 += '<path d="M9 19C9 20.6569 7.65685 22 6 22C4.34315 22 3 20.6569 3 19C3 17.3431 4.34315 16 6 16C7.65685 16 9 17.3431 9 19Z" stroke-width="1.5"/>';
			text1 += '<path d="M21 17C21 18.6569 19.6569 20 18 20C16.3431 20 15 18.6569 15 17C15 15.3431 16.3431 14 18 14C19.6569 14 21 15.3431 21 17Z" stroke-width="1.5"/>';
			text1 += '<path d="M9 19V8" stroke-width="1.5"/>';
			text1 += '<path d="M21 17V6" stroke-width="1.5"/>';
			text1 += '<path d="M15.7351 3.75466L11.7351 5.08799C10.4151 5.52801 9.75503 5.74801 9.37752 6.27179C9 6.79556 9 7.49128 9 8.88273V11.9997L21 7.99969V7.54939C21 5.01693 21 3.7507 20.1694 3.15206C19.3388 2.55341 18.1376 2.95383 15.7351 3.75466Z" stroke-width="1.5" stroke-linecap="round"/>';
			text1 += '</svg></a>';
			
			text2 = '<table id="tbl3" border="0" style="margin: 0 auto">';
			text2 += '<tr><td style="width:50px;">';
			text2 += '<svg xmlns="http://www.w3.org/2000/svg" id="profile-btn-off" viewBox="0 0 16 16" fill="none">';
			text2 += '<path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"/>';
			text2 += '<path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"/>';
			text2 += '</svg></td>';
            text2 += '<td style="padding-left: 1em;">'+ result.Submitter + '</td></tr></table>';
			
			text2 += '<div id="players">';
			text2 += '<svg id="playerIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">';
			text2 += '<rect width="24" height="24" fill="none"/>';
			text2 += '<path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z"/>';
			text2 += '<path d="M14.3675 12.0632C14.322 12.1494 14.3413 12.2569 14.4196 12.3149C15.0012 12.7454 15.7209 13 16.5 13C18.433 13 20 11.433 20 9.5C20 7.567 18.433 6 16.5 6C15.7209 6 15.0012 6.2546 14.4196 6.68513C14.3413 6.74313 14.322 6.85058 14.3675 6.93679C14.7714 7.70219 15 8.5744 15 9.5C15 10.4256 14.7714 11.2978 14.3675 12.0632Z" />';
			text2 += '<path fill-rule="evenodd" clip-rule="evenodd" d="M4.64115 15.6993C5.87351 15.1644 7.49045 15 9.49995 15C11.5112 15 13.1293 15.1647 14.3621 15.7008C15.705 16.2847 16.5212 17.2793 16.949 18.6836C17.1495 19.3418 16.6551 20 15.9738 20H3.02801C2.34589 20 1.85045 19.3408 2.05157 18.6814C2.47994 17.2769 3.29738 16.2826 4.64115 15.6993Z"/>';
			text2 += '<path d="M14.8185 14.0364C14.4045 14.0621 14.3802 14.6183 14.7606 14.7837V14.7837C15.803 15.237 16.5879 15.9043 17.1508 16.756C17.6127 17.4549 18.33 18 19.1677 18H20.9483C21.6555 18 22.1715 17.2973 21.9227 16.6108C21.9084 16.5713 21.8935 16.5321 21.8781 16.4932C21.5357 15.6286 20.9488 14.9921 20.0798 14.5864C19.2639 14.2055 18.2425 14.0483 17.0392 14.0008L17.0194 14H16.9997C16.2909 14 15.5506 13.9909 14.8185 14.0364Z"/>';
			text2 += '</svg>';
			
			let players = result.Players.split(",");
			let colors = ["blue", "red", "green", "#E8A317"];
			text2 += '<table id="tbl3" border="0" style="margin: 0.5em;width:250px;">';
			$.each(players, function (i) {
				text2 += '<tr><td style="background-color:'+colors[i]+'; font-size:1em; padding-left: 1em;height:2em;font-weight:bold">'+ players[i] + '</td></tr>';
			});
			text2 +='</div>';
				       
            $('#menu-header').html(text1);
			$('#menu-details').html(text2);
			
			document.getElementById('song-menu').style.visibility = 'visible'; 
			document.getElementById('song-menu').style.transform = 'translate(0px)';
			document.getElementById('bgMenuOverlay').style.display = 'block';
			window.addEventListener('scroll', noscroll); 	
		},
		error: function () {	
		}
	});
}