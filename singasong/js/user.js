usertoken = getCookie('token');
userResult = getCookie("userResult");
tokenUpdateResult = getCookie('tokenUpdateResult');

if (tokenUpdateResult) {
	if (tokenUpdateResult === 'OK'){
		showmessage('Actie succesvol uitgevoerd', 'green', 2000);
	} else {
		showmessage(decodeURIComponent(tokenUpdateResult)  + ', probeer het opnieuw', 'orange', 3000);
	}	
	eraseCookie("tokenUpdateResult");
}

if (userResult) {
	if (userResult === 'OK'){
		showmessage('Actie succesvol uitgevoerd', 'green', 2000);
	} else {
		showmessage(decodeURIComponent(userResult)  + ', probeer het opnieuw', 'orange', 3000);
	}	
	eraseCookie("userResult");
}

jQuery.ajax({
	method: "POST",
	url: "../php/users.php",
	data: {
		functionname: "userList"
	},
	success: function (response) {
		result = JSON.parse(response);
		editbtn = '<svg xmlns="http://www.w3.org/2000/svg" id="requestEdit-btn" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"/></svg>';
		removebtn = '<svg xmlns="http://www.w3.org/2000/svg"  id="requestRemove-btn" viewBox="0 0 24 24" fill="none"><path d="M7 9.5L12 14.5M12 9.5L7 14.5M19.4922 13.9546L16.5608 17.7546C16.2082 18.2115 16.032 18.44 15.8107 18.6047C15.6146 18.7505 15.3935 18.8592 15.1583 18.9253C14.8928 19 14.6042 19 14.0271 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2C3 7.0799 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.07989 5 6.2 5H14.0271C14.6042 5 14.8928 5 15.1583 5.07467C15.3935 5.14081 15.6146 5.2495 15.8107 5.39534C16.032 5.55998 16.2082 5.78846 16.5608 6.24543L19.4922 10.0454C20.0318 10.7449 20.3016 11.0947 20.4054 11.4804C20.4969 11.8207 20.4969 12.1793 20.4054 12.5196C20.3016 12.9053 20.0318 13.2551 19.4922 13.9546Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
		text = '<table id="tbl1" border="0" style="padding: 0em 0.5em 0em 1em; width:100%">';

		$.each(result, function (i) {
			if(result[i].active === '1') { activeBox = '<input type="checkbox" name="checkbox" checked/>'} else { activeBox = '<input type="checkbox" name="checkbox"/>' };
			
			text += '<tr class="ListTitle"><td rowspan="2" style="vertical-align:middle; width: 5%;"></td>';
			text += '<td id="user_firstname" data-value="' + result[i].ID + '">' + result[i].firstname + '</td>';
			text += '<td rowspan="2">' + activeBox + '</td>';
			text += '<td rowspan="2"><a onclick="editUser(' + result[i].ID + ')">'+ editbtn +'</a></td>';
			text += '<td rowspan="2"><a onclick="deleteUser(' + result[i].ID + ')">'+ removebtn +'</a></td></tr>';
			text += '<tr class="ListArtist"><td id="user_lastname">'+ result[i].lastname +'</td></tr>';
			text += '<tr class="extraLine" style="height: 10px;"><!– Mimic the margin –></tr>';
		});
		$('#editUser').html(text);
		
		document.querySelectorAll("#editUser input[type='checkbox']").forEach((checkbox) => {
			checkbox.addEventListener("change", () => {
				id = checkbox.closest("tr").querySelector("#user_firstname").getAttribute('data-value');
				toggleActiveUser(id,checkbox.checked);
			});
		});
	},
	error: function (e) {
		$("#editUser").html(e);
	}
});

function toggleActiveUser(id,stat){
	if(stat){active=1}else{active=0};
	jQuery.ajax({
		method: "POST",
		url: "../php/users.php",
		data: {
			functionname: "toggleActiveUser",
			param1: id,
			param2: active
		},
		success: function (response) {
		},
		error: function (e) {
			showmessage('Error in verwerking van data', 'red', 3000);
		}
	});
}

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password-form");

togglePassword.addEventListener("click", function () {
	const type = password.getAttribute("type") === "password" ? "text" : "password";
	password.setAttribute("type", type);
	this.classList.toggle("bi-eye");
});

document.getElementById("active-user-box").addEventListener('change', e => {
	if(e.target.checked === true) {
		document.querySelectorAll("#editUser input[type='checkbox']").forEach((checkbox) => {
			const userRow = checkbox.closest("tr");
			const lastNameRow = userRow.nextElementSibling;
			const lastRow = lastNameRow.nextElementSibling;
			
			if (!checkbox.checked) {
				userRow.style.display = "none";
				lastNameRow.style.display = "none";
				lastRow.style.display = "none";
			}
		});
	}
	if(e.target.checked === false) {
		document.querySelectorAll("#editUser input[type='checkbox']").forEach((checkbox) => {
			const userRow = checkbox.closest("tr");
			const lastNameRow = userRow.nextElementSibling;
			const lastRow = lastNameRow.nextElementSibling;
			
			if (!checkbox.checked) {
				userRow.style.display = "";
				lastNameRow.style.display = "";
				lastRow.style.display = "";
			}
		});
	}
});

function editUser(id){
	jQuery.ajax({
        method: "POST",
        url: "../php/users.php",
        data: {
            functionname: "userDetails",
            param: id
        },
        success: function (response) {
            var result = JSON.parse(response);
			
			text1 = 'Gebruiker bewerken';
			
			text2 = '<form action="/php/users.php" method="POST">';
			text2 += '<div class="userEditForm">';
			text2 += '<input type="text" id="action" value="edit" name="action" style="display:none;">';
			text2 += '<input type="text" id="id-form" value="' +  id + '" name="id" style="display:none;" required>';
			text2 += '<label for="firstname"><b>Voornaam</b></label>';
			text2 += '<input type="text" id="firstname-form" value="' +  result.firstname + '" name="firstname" required>';
			text2 += '<label for="lastname"><b>Achternaam</b></label>';
			text2 += '<input type="text" id="lastname-form" value="' +  result.lastname + '" name="lastname" required>';
			text2 += '<label for="username"><b>Gebruikersnaam</b></label>';
			text2 += '<input type="text" id="username-form" value="' +  result.username + '" name="username" required>';
			text2 += '<label for="role"><b>Rol</b></label>';
			text2 += '<select name="role" id="role-form" placeholder="Kies rol" required>';
			text2 += '<option value="user">User</option>';
			text2 += '<option value="admin">Admin</option>';
			text2 += '</select>';
			text2 += '<div class="resetArea">';
			text2 += '<div class="resetPW">';
			text2 += '<label for="role"><b>Reset wachtwoord</b></label>';
			text2 += '<input type="checkbox" id="resetPW" name="checkbox1">';
			text2 += '</div>';
			text2 += '<div class="resetToken">';
			text2 += '<label for="role"><b>Reset token</b></label>';
			text2 += '<input type="checkbox" id="resetToken" name="checkbox2">';
			text2 += '</div>';
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
        },
        error: function () {
            $('song-menu').html('Error met verwerking');
        }
    });	
}

function deleteUser(id){
	
	jQuery.ajax({
        method: "POST",
        url: "../php/users.php",
        data: {
            functionname: "userDetails",
            param: id
        },
        success: function (response) {
            var result = JSON.parse(response);
			
			text1 = 'Gebruiker verwijderen';
			
			text2 = '<form action="/php/users.php" method="POST">';
			text2 += '<div class="userEditForm">';
			text2 += '<input type="text" id="action" value="delete" name="action" style="display:none;">';
			text2 += '<input type="text" id="id-form" value="' +  id + '" name="id" style="display:none;">';
			text2 += '<input type="text" id="username-form" value="' +  result.username + '" name="username" style="display:none;">';
			text2 += '<label for="firstname"><b>Voornaam</b></label>';
			text2 += '<input type="text" id="firstname-form" value="' +  result.firstname + '" name="firstname" readonly>';
			text2 += '<label for="lastname"><b>Achternaam</b></label>';
			text2 += '<input type="text" id="lastname-form" value="' +  result.lastname + '" name="lastname" readonly>';
			text2 += 'Deze gebruiker verwijderen ?';
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
		},
        error: function () {
            $('song-menu').html('Error met verwerking');
        }
    });	
}