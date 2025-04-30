usertoken = getCookie('token');
var selectedPlayers = [];
var selectedElements = [];
var players = [];
const colors = ["blue", "red", "green", "#E8A317"];

if(getCookie('updateQueueResult_ERR')){
	showmessage('Probleem met het wijzigen van wachtrij-item','red', 4000);
	eraseCookie("updateQueueResult_ERR");
} if(getCookie('updateQueueResult_NOK')){
	showmessage('Wachtrij-item niet aangepast, probeer opnieuw','orange', 4000);
	eraseCookie("updateQueueResult_NOK");
} if(getCookie('updateQueueResult_OK')){
	showmessage('Wachtrij-item aangepast','green', 3000);
	eraseCookie("updateQueueResult_OK");
} if(getCookie('deleteQueueResult_ERR')){
	showmessage('Probleem met het verwijderen van wachtrij-item','red', 4000);
	eraseCookie("deleteQueueResult_ERR");
} if(getCookie('deleteQueueResult_NOK')){
	showmessage('Wachtrij-item niet verwijderd, probeer opnieuw','orange', 4000);
	eraseCookie("deleteQueueResult_NOK");
} if(getCookie('deleteQueueResult_OK')){
	showmessage('Wachtrij-item verwijderd','green', 3000);
	eraseCookie("deleteQueueResult_OK");
}

jQuery.ajax({
	type: "POST",
	url: '../php/queue.php',
	data: {
		functionname: 'queueOverview'
	},
	success: function (response) {
		result = JSON.parse(response);
		
		text = '<table id="tbl1" border="0" style="padding: 0em 0.5em 0em 1em;width:100%;user-select: auto;overflow: auto;">';
		
		$.each(result, function (i) {
			switch (result[i].State) {
				case '3':
					style = 'filter: grayscale(1); text-decoration: line-through; text-decoration-thickness:3px;'; 
					style4 = '';
					if (checkbox.checked){style += 'display: none'};
				break;
				case '2':
					style = 'background: '+ root.style.getPropertyValue('--theme-color'); 
					style4 = 'stroke:white; fill:var(--theme-color);';
				break;
				case '1':
					style = 'background: '+ root.style.getPropertyValue('--theme-color') +'; opacity: 40%'; 
					style4 = 'stroke:white; fill:var(--theme-color); ';
				break;
				case '0':
					style = 'filter: grayscale(0); text-decoration: none;';
					style4 = 'stroke:var(--theme-color);';
				break;
			}
			
			reorderqueuebtn = '<svg xmlns="http://www.w3.org/2000/svg" id="requestReorder-btn" viewBox="0 0 24 24" style="'+style4+'"><path d="M4 6H20M4 12H20M4 18H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
		
			text += '<tbody data-id="'+ result[i].ID +'"data-state="'+ result[i].State +'">';
			text += '<tr style="'+ style +'" draggable="true"><td rowspan="2" id="selectSong" style="width: 2em"><input type="radio" onclick="queueMenu(' + result[i].ID + ')" id="queueSongSelect" name="queueSongSelect" value="queueSongSelect"></td><td style="font-weight:bold;text-transform: uppercase;">' + result[i].Title + '</td><td rowspan="2">'+ reorderqueuebtn +'</td></tr>';
			text += '<tr style="'+ style +'" draggable="true"><td>' + result[i].Artist + '</td></tr>';
			text += '<tr style="height: 10px;" draggable="true"><!– Mimic the margin –></tr>';
			text += '</tbody>';
		});
		
		$('#editQueue').html(text);
		
		const table = document.querySelector("#tbl1");
		
		let draggingElement = null;
		let touchStartY = 0;
		
		table.addEventListener("touchstart", handleTouchStart);
		table.addEventListener("touchmove", handleTouchMove);
		table.addEventListener("touchend", handleTouchEnd);
		
		function handleTouchStart(event) {
			//console.log("Touchstart triggered");
			draggingElement = event.target.closest("tbody");
			if (!draggingElement) return;

			draggingElement.classList.add("dragging");
			touchStartY = event.touches[0].clientY;
		}
		
		function handleTouchMove(event) {
			if (!draggingElement) return;

			const touchY = event.touches[0].clientY;
			const target = document.elementFromPoint(event.touches[0].clientX, touchY)?.closest("tbody");

			if (!target || draggingElement === target) return;

			const targetRect = target.getBoundingClientRect();
			const isAbove = touchY < targetRect.top + targetRect.height / 2;

			if (isAbove) {
				table.insertBefore(draggingElement, target);
			} else {
				table.insertBefore(draggingElement, target.nextSibling);
			}
		}

		function handleTouchEnd() {
			if (draggingElement) {
				//console.log("Touchend triggered");
				draggingElement.classList.remove("dragging");
				draggingElement = null;
			}
			updateDatabaseOrder();
		}

		function updateDatabaseOrder() {		
			const table = document.getElementById("tbl1");
			const rows = table.querySelectorAll("tbody");

			const order = Array.from(rows).map((tbody, index) => {
				return {
					rowPosition: index +1, 
					dataId: tbody.getAttribute("data-id")
				};
			});
					
			jQuery.ajax({
				type: "POST",
				url: '../php/queue.php',
				data: {
					functionname: 'updateQueueOrder',
					param: JSON.stringify({ order })
				},
				success: function (response) {
					result = JSON.parse(response);
					
					if (!result.success) {
						showmessage('Volgorde van wachtrij-item niet gewijzigd','orange', 3000);
					}
				},
				error: function () {
					console.error("Error updating order:", error);
				}
			});
		}
	},
	error: function () {
	}
});

function getActivePlayers(){
	var initialPlayers = players.split(",");
	var dropdownLinks = document.querySelectorAll("#myDropdown a");
		
	initialPlayers.forEach((player) => {
		dropdownLinks.forEach((link) => {
			if (link.textContent.trim() === player) {
				setInputValue(player, link);
			}
		});
	});	
}


const checkbox = document.getElementById('active-queue-box');
if (checkbox) {
	checkbox.addEventListener('change', () => {
		var rows = document.querySelectorAll('tbody[data-state="3"]');
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

function queueMenu(id){
	
	text1 = 'Wachtrij menu';
	text2 =' <div class="queuectl">';
    text2 += '<button type="submit" class="Queuebtn" name="Edit" onclick="editQueueItem(' + id + ')">Bewerk</button>'
	text2 += '<button type="submit" class="Queuebtn" name="Delete" onclick="removeQueueItemCheck(' + id + ')">Verwijder</button>'
    text2 += '</div>';
	
	$('#menu-header').html(text1)
	$('#menu-details').html(text2);
	
	document.getElementById('song-menu').style.visibility = 'visible'; 
	document.getElementById('song-menu').style.transform = 'translate(0px)';
	document.getElementById('bgMenuOverlay').style.display = 'block';
	window.addEventListener('scroll', noscroll); 
}

function editQueueItem(id){
	selectedPlayers = [];
	selectedElements = [];
	
	jQuery.ajax({
		type: "POST",
		url: '../php/queue.php',
		data: {
			functionname: 'queueItemDetails',
			param: id
		},
		success: function (response) {
            result = JSON.parse(response);
			
			text1 = 'Wachtrij-item bewerken';
					
			text2 = '<div class="queueEditForm">';
			text2 += '<input type="text" id="action" value="edit" name="action" style="display:none;">';
			text2 += '<input type="text" id="id-form" value="' +  id + '" name="id" style="display:none;" required>';
			text2 += '<label for="artist-form"><b>Artiest</b></label>';
			text2 += '<input type="text" id="artist-form" value="' +  result.Artist + '" name="artist" readonly>';
			text2 += '<label for="title-form"><b>Titel</b></label>';
			text2 += '<input type="text" id="title-form" value="' +  result.Title + '" name="title" readonly>';
			text2 += '<label for="submitter-form"><b>Plaatser</b></label>';
			text2 += '<input type="text" id="submitter-form" value="' +  result.Submitter + '" name="submitter" readonly>';
			text2 += '<label for="state-form"><b>Status</b></label>';
			text2 += '<select name="state" id="state-form" value="' +  result.State + '" required>';
			text2 += '<option value="0">0 - Nieuw</option>';
			text2 += '<option value="1">1 - Eerstvolgende</option>';
			text2 += '<option value="2">2 - Actief</option>';
			text2 += '<option value="3">3 - Gedaan</option>';
			text2 += '</select>';
			text2 += '<b>Spelers</b><br>';
			text2 += '<div class="dropdown">';
			text2 += '<div id="myDropdown" class="dropdown-content">123</div>';
			text2 += '<div id="players-form" name="players" onclick="ToggleDropdown()"></div>';
			text2 += '</div>';
			text2 +=' <div class="QueueControl">';
            text2 += '<button type="submit" class="confirm-btn" onclick="updateQueueItem()">OK</button>';
            text2 += '</div>';
				       
            $('#menu-header').html(text1)
            $('#menu-details').html(text2);

			document.getElementById('song-menu').style.visibility = 'visible'; 
			document.getElementById('song-menu').style.transform = 'translate(0px)';
            document.getElementById('bgMenuOverlay').style.display = 'block';
            window.addEventListener('scroll', noscroll); 
									       
			var stateForm = document.getElementById('state-form');
			var temp = result.State;
			
			for(var i, j = 0; i = stateForm.options[j]; j++) {
			  if(i.value == temp) {
				stateForm.selectedIndex = j;
				break;
			  }
			}
			
			getQueuePlayersEdit(result.Players);
		},
		error: function () {	
		}
	});
}

function getQueuePlayersEdit(players){
	jQuery.ajax({
        method: "POST",
        url: "../php/queue.php",
        data: {
            functionname: "queuePlayers"
        },
        success: function (response) {
			result = JSON.parse(response);
			usertxt = '';
			$.each(result, function (i) {                   
				usertxt += '<a onclick="setInputValue(\''+ result[i].firstname +'\', this)" data="'+result[i].ID+'">'+ result[i].firstname +'</a>';
            });
			
			$('#myDropdown').html(usertxt);
			
			var initialPlayers = players.split(",");
			var dropdownLinks = document.querySelectorAll("#myDropdown a");
							
			initialPlayers.forEach((player) => {
				dropdownLinks.forEach((link) => {
					if (link.textContent.trim() === player) {
						setInputValue(player, link);
					}
				});
			});	
		},
        error: function () {
            usertxt += 'Geen spelers';
			$('#myDropdown').html(usertxt);
        }
    });	
}


function updateQueueItem(){
	id = document.getElementById("id-form").value;
	tmp = document.getElementById("players-form").textContent.split(/(?=[A-Z])/);
	state = document.getElementById("state-form").value;
	players = tmp.toString();
	
	jQuery.ajax({
        method: "POST",
        url: "../php/queue.php",
        data: {
            functionname: "updateQueueItem",
			param1: id,
			param2: players,
			param3: state
        },
        success: function (response) {
			location.reload();
		},
        error: function () {
			showmessage('Probleem met het wijzigen van wachtrij-item','red', 3000);
        }
    });	
}

function removeQueueItemCheck(id){
	
	text1 = '<br>Wachtrij-item verwijderen ?<br>';
	text2 =' <div class="queuectl">';
    text2 += '<button type="submit" class="Queuebtn" name="Edit" onclick="removeQueueItem(' + id + ')">Ja</button>'
	text2 += '<button type="submit" class="Queuebtn" name="Delete" onclick="closeMedia()">Nee</button>'
    text2 += '</div>';
	
	$('#media').html(text1 + text2);
	document.getElementById('media').style.display = 'block';
}

function removeQueueItem(id){
	
	closeMedia();
	
	jQuery.ajax({
		method: "POST",
		url: "../php/queue.php",
		data: {
			functionname: "removeQueueItem",
			param: id
		},
		success: function (response) {
			location.reload();
		},
		error: function () {
			showmessage('Probleem met het verwijderen van wachtrij-item','red', 3000);
		}
	});	
}

function closeMedia(){
	$('#media').html('');
	
	var elements = document.getElementsByTagName("input");

	for (var i = 0; i < elements.length; i++) {
		if (elements[i].type == "radio") {
			elements[i].checked = false;
		}
	}
}
