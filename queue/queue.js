var field = 'search_box';
var row;

getQueue();

setInterval(function(){
    getQueue();
}, 10000);

function getQueue(){
    $('#left').html('');
	var klas;
    
	jQuery.ajax({
		method: "POST",
		url: "queue.php",
		data: {
			functionname: "getQueue"
		},
		success: function (response) {
			result = JSON.parse(response);
			
			const duetIcon = '<svg id="duetIconSmall" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z"/><path d="M14.3675 12.0632C14.322 12.1494 14.3413 12.2569 14.4196 12.3149C15.0012 12.7454 15.7209 13 16.5 13C18.433 13 20 11.433 20 9.5C20 7.567 18.433 6 16.5 6C15.7209 6 15.0012 6.2546 14.4196 6.68513C14.3413 6.74313 14.322 6.85058 14.3675 6.93679C14.7714 7.70219 15 8.5744 15 9.5C15 10.4256 14.7714 11.2978 14.3675 12.0632Z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M4.64115 15.6993C5.87351 15.1644 7.49045 15 9.49995 15C11.5112 15 13.1293 15.1647 14.3621 15.7008C15.705 16.2847 16.5212 17.2793 16.949 18.6836C17.1495 19.3418 16.6551 20 15.9738 20H3.02801C2.34589 20 1.85045 19.3408 2.05157 18.6814C2.47994 17.2769 3.29738 16.2826 4.64115 15.6993Z"/><path d="M14.8185 14.0364C14.4045 14.0621 14.3802 14.6183 14.7606 14.7837V14.7837C15.803 15.237 16.5879 15.9043 17.1508 16.756C17.6127 17.4549 18.33 18 19.1677 18H20.9483C21.6555 18 22.1715 17.2973 21.9227 16.6108C21.9084 16.5713 21.8935 16.5321 21.8781 16.4932C21.5357 15.6286 20.9488 14.9921 20.0798 14.5864C19.2639 14.2055 18.2425 14.0483 17.0392 14.0008L17.0194 14H16.9997C16.2909 14 15.5506 13.9909 14.8185 14.0364Z"/></svg>';
			const rapIcon = '<svg id="rapIconSmall" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M65.9,21.4c0.2,0.2,0.4,0.4,0.6,0.5c9.6,9.7,9.4,39.8,9.4,41.1c0,0.5-0.5,1-1,1h0c-0.6,0-1-0.5-1-1c0-0.3,0.2-30.6-8.8-39.6  c-1.4-1.4-2.9-2.2-4.6-2.4c-0.3,0-0.5,0-0.8,0c-0.3,0-0.6,0-0.9,0C38.6,21.8,37,50.4,37,50.7c0,0.5-0.5,1-1,1c0,0,0,0,0,0  c-0.6,0-1-0.5-1-1c0-0.3,1.1-20.2,13.1-28.3c-15.7,4-25.7,16.4-26.9,34.8L2.4,75.9c-1.5,1.5-0.2,3.9,1.8,3.6c2.3-0.3,5-1.6,7.9-1.6  c13.9,0,14.4,8.2,30.6,8.2c11.8,0,24.8-12.7,30.9-19.5c17.7-1.5,24.7-5.6,24.7-5.6C98.2,38.6,84.2,24.1,65.9,21.4z M67.9,67  c-6.3,0-13.4-3.3-20.2-6.5c-5.7-2.7-11.1-5.2-15.1-5.2c-5.5,0-7.4,1.1-7.4,1.1c-0.5,0.3-1.1,0.2-1.4-0.3c-0.3-0.5-0.2-1.1,0.3-1.4  c0.2-0.2,2.4-1.5,8.5-1.5c4.4,0,10,2.6,16,5.4c6.6,3.1,13.5,6.3,19.3,6.3c0.6,0,1,0.4,1,1S68.5,67,67.9,67z M63,17  c-0.1-1.8-1.5-3.2-3.3-3.2c-1.8,0-3.2,1.4-3.3,3.1c1.1-0.1,2.2-0.1,3.3-0.1C60.8,16.8,61.9,16.9,63,17z"/></svg>';
			const karaokeIcon = '<svg id="karaokeIconSmall" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="karaokeIcon" viewBox="0 0 512 512" xml:space="preserve"><style type="text/css"></style><g><polygon points="0.001,437.167 74.823,512 354.337,254.387 257.614,157.664"/><path d="M269.9,143.663l98.428,98.417c34.239,6.143,70.52-2.472,98.869-25.709L295.63,44.804 C272.393,73.153,263.757,109.412,269.9,143.663z"/><path d="M476.317,35.674c-45.989-45.98-119.466-47.463-167.392-4.734l172.135,172.135 C523.789,155.15,522.306,81.663,476.317,35.674z"/></g></svg>';
            
			text = '<table id="tblQueue" width="100%" border="0">';
    
            $.each(result, function (i) {
				comment = result[i].Comment.toLowerCase();
				if (comment.includes('duet')){duet = duetIcon;}else{duet = '';}
				if (comment.includes('rap')){rap = rapIcon;}else{rap = '';}
				if (comment.includes('karaoke')){karaoke = karaokeIcon;}else{karaoke = '';}
				if (result[i].State === '3'){
					style = 'height: 1vw;filter: grayscale(1); text-decoration: line-through; text-decoration-thickness:3px;'; 
					style2 = 'fill:gray';
				}
				if (result[i].State === '2'){
					style = 'height: 1vw;background: #13bfca'; 
					style2 = 'fill:white';
				}
				if (result[i].State === '1'){
					style = 'height: 1vw;background: #13bfca61;'; 
					style2 = 'fill:white';
				}
				if (result[i].State === '0'){
					style = 'height: 1vw;filter: grayscale(0); text-decoration: none;';
					style2 = 'fill:#13bfca';
				}
				text += '<tr id="'+ result[i].State +'" style="'+ style +'" data-state="'+ result[i].State +'"><td rowspan="2" style="width: 5vw"><img id="songCover" style="vertical-align:middle; border-radius: 5px; width:5vw;" src="' + result[i].Cover + '">';
				text += '<td style="'+ style2 +';width: 80%;padding-left: 0.5em;">' + result[i].Title + ' ' + duet + rap + karaoke + '</td>';
				
				let players = result[i].Players.split(",");
				let colors = ["blue", "red", "green", "#E8A317"];
				text += '<td rowspan="2" style="width:10vw"><table id="tbl3" border="0">';
				$.each(players, function (i) {
					text += '<tr><td style="width:8vw; color:white; background-color:'+colors[i]+';font-size:1.2em; height:1.3em;padding-left: 0.5em;">'+ players[i] + '</td></tr>';
				});
				text +='</table></td>';
				text += '<tr id="'+ result[i].State +'" style="'+ style +'" data-state="'+ result[i].State +'"><td style="width: 80%;padding-left: 0.5em;">' + result[i].Artist + '</td></tr>';
				text += '<tr style="height: 2px;" data-state="'+ result[i].State +'"><!– Mimic the margin –></tr>';
			});

			$('#left').append(text);
			
			if ($('#1').length > 0) {
				document.getElementById("1").scrollIntoView({
					behavior: 'auto',
					block: 'start'
				});
			}
			
			if ($('#2').length > 0) {
				document.getElementById("2").scrollIntoView({
					behavior: 'auto',
					block: 'start'
				});
			}
		},
		error: function (response) {

		}
	});
    
    $("#left").fadeIn(250);
}

function QueueSongSearch() {
    $('#container-left').html('');
    
    id = document.getElementById("search_box").value;
    
    jQuery.ajax({
        method: "POST",
        url: "queue.php",
        data: {
            functionname: "getSong",
            param: id
        },
        success: function (response) {
            results = JSON.parse(response);
			
			const rapIcon = '<svg id="rapIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M65.9,21.4c0.2,0.2,0.4,0.4,0.6,0.5c9.6,9.7,9.4,39.8,9.4,41.1c0,0.5-0.5,1-1,1h0c-0.6,0-1-0.5-1-1c0-0.3,0.2-30.6-8.8-39.6  c-1.4-1.4-2.9-2.2-4.6-2.4c-0.3,0-0.5,0-0.8,0c-0.3,0-0.6,0-0.9,0C38.6,21.8,37,50.4,37,50.7c0,0.5-0.5,1-1,1c0,0,0,0,0,0  c-0.6,0-1-0.5-1-1c0-0.3,1.1-20.2,13.1-28.3c-15.7,4-25.7,16.4-26.9,34.8L2.4,75.9c-1.5,1.5-0.2,3.9,1.8,3.6c2.3-0.3,5-1.6,7.9-1.6  c13.9,0,14.4,8.2,30.6,8.2c11.8,0,24.8-12.7,30.9-19.5c17.7-1.5,24.7-5.6,24.7-5.6C98.2,38.6,84.2,24.1,65.9,21.4z M67.9,67  c-6.3,0-13.4-3.3-20.2-6.5c-5.7-2.7-11.1-5.2-15.1-5.2c-5.5,0-7.4,1.1-7.4,1.1c-0.5,0.3-1.1,0.2-1.4-0.3c-0.3-0.5-0.2-1.1,0.3-1.4  c0.2-0.2,2.4-1.5,8.5-1.5c4.4,0,10,2.6,16,5.4c6.6,3.1,13.5,6.3,19.3,6.3c0.6,0,1,0.4,1,1S68.5,67,67.9,67z M63,17  c-0.1-1.8-1.5-3.2-3.3-3.2c-1.8,0-3.2,1.4-3.3,3.1c1.1-0.1,2.2-0.1,3.3-0.1C60.8,16.8,61.9,16.9,63,17z"/></svg>';
			const duetIcon = '<svg id="duetIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="none"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z"/><path d="M14.3675 12.0632C14.322 12.1494 14.3413 12.2569 14.4196 12.3149C15.0012 12.7454 15.7209 13 16.5 13C18.433 13 20 11.433 20 9.5C20 7.567 18.433 6 16.5 6C15.7209 6 15.0012 6.2546 14.4196 6.68513C14.3413 6.74313 14.322 6.85058 14.3675 6.93679C14.7714 7.70219 15 8.5744 15 9.5C15 10.4256 14.7714 11.2978 14.3675 12.0632Z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M4.64115 15.6993C5.87351 15.1644 7.49045 15 9.49995 15C11.5112 15 13.1293 15.1647 14.3621 15.7008C15.705 16.2847 16.5212 17.2793 16.949 18.6836C17.1495 19.3418 16.6551 20 15.9738 20H3.02801C2.34589 20 1.85045 19.3408 2.05157 18.6814C2.47994 17.2769 3.29738 16.2826 4.64115 15.6993Z"/><path d="M14.8185 14.0364C14.4045 14.0621 14.3802 14.6183 14.7606 14.7837V14.7837C15.803 15.237 16.5879 15.9043 17.1508 16.756C17.6127 17.4549 18.33 18 19.1677 18H20.9483C21.6555 18 22.1715 17.2973 21.9227 16.6108C21.9084 16.5713 21.8935 16.5321 21.8781 16.4932C21.5357 15.6286 20.9488 14.9921 20.0798 14.5864C19.2639 14.2055 18.2425 14.0483 17.0392 14.0008L17.0194 14H16.9997C16.2909 14 15.5506 13.9909 14.8185 14.0364Z"/></svg>';
			const karaokeIcon = '<svg id="karaokeIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="karaokeIcon" viewBox="0 0 512 512" xml:space="preserve" fill="none"><style type="text/css"></style><g><polygon points="0.001,437.167 74.823,512 354.337,254.387 257.614,157.664"/><path d="M269.9,143.663l98.428,98.417c34.239,6.143,70.52-2.472,98.869-25.709L295.63,44.804 C272.393,73.153,263.757,109.412,269.9,143.663z"/><path d="M476.317,35.674c-45.989-45.98-119.466-47.463-167.392-4.734l172.135,172.135 C523.789,155.15,522.306,81.663,476.317,35.674z"/></g></svg>';
                        
            if (results.ID === '0'){
                document.getElementById("search_box").value = '';  
                $('#message').html('Nummer '+ id +' niet kunnen vinden'); 
                document.getElementById("message").style.boxShadow = "10px 20px 30px rgba(0, 0, 0, 0.5)";
                $("#message").fadeIn(250); 
                $("#message").delay(3000).fadeOut(250);
            } else {
                text = '<div id="image"><img style="height:100%; width:100%" src="' + results.Cover + '"></div>';
                text += '<div id="Artist_Title"><div style="color: white">' + results.Artist + '</div><br><div style="color: white;text-transform: uppercase;">' + results.Title + '</div></div>';
				text += '<div id="icons">';
                if (results.duet){ text += '<div id="Duet">'+duetIcon+'</div>'};
				if (results.karaoke){ text += '<div id="Karaoke">'+karaokeIcon+'</div>'};
                if (results.rap){ text += '<div id="Rap">'+rapIcon+'</div>'};
				text+='</div>';
                
				bookSong();
				
                $('#container-left').append(text);
                document.getElementById("container-left").style.visibility = 'visible';

				document.getElementById('search_button').style.pointerEvents = 'none';
                var elms = document.querySelectorAll("[id='numpad']");
                for(var i = 0; i < elms.length; i++) {
					elms[i].style.pointerEvents = 'none';
				};				
            }
        },
        error: function () {
        }
    });
}

function bookSong(){
    jQuery.ajax({
        method: "POST",
        url: "queue.php",
        data: {
            functionname: "selectPlayers"
        },
        success: function (response) {
            results = JSON.parse(response);
                
            $('#container-right').html('');
            id = document.getElementById("search_box").value; 
    
            text = '<div id="playerHeader">Selecteer spelers : </div>';
			text +='<div id="playerDetails">';
            
            $.each(results, function (i) {
                text += "<input type=\"button\" id=\"playerButton\" onclick=\"selectPlayers('"+ results[i] +"')\" value="+ results[i] +"> ";
            });
            
			text += '</div>';
            text += '<div id="playerFooter"><input type="button" id="confirmBooking" onclick="confirmBooking(' + id + ')" value="OK"><input type="button" id="closeDiaglog" onclick="closeDiaglog()" value="Annuleer"></div>';

			$('#container-right').append(text);
			document.getElementById("container-right").style.visibility = 'visible';
        },
        error: function () {
            $('#message').html('Kon nummer '+ id +' niet toevoegen aan wachtrij');
        }
    });
}

function selectPlayers(Player) {
    
    var elms = document.querySelectorAll("[id='playerButton']");
        
    $.each(elms, function () {
        if (this.value === Player){
			if (localStorage.getItem("Player4") === null){
				if (localStorage.getItem("Player3") === null){
					if (localStorage.getItem("Player2") === null){
						if (localStorage.getItem("Player1") === null){
							this.style.backgroundColor = "Blue";
							localStorage.setItem('Player1', Player);
						} else {
							if (Player === localStorage.getItem('Player1')){
								this.style.backgroundColor = "#13bfca";
								localStorage.removeItem('Player1');
							} else {
								this.style.backgroundColor = "Red";
								localStorage.setItem('Player2', Player);
							}
						}
					} else {
						if (Player === localStorage.getItem('Player2')){
							this.style.backgroundColor = "#13bfca";
							localStorage.removeItem('Player2');
						} else {
							if (Player != localStorage.getItem('Player1')){
								this.style.backgroundColor = "Yellow";
								localStorage.setItem('Player3', Player);
							}
						}
					}
				} else {
					if (Player === localStorage.getItem('Player3')){
						this.style.backgroundColor = "#13bfca";
						localStorage.removeItem('Player3');
					} else {
						if (Player != localStorage.getItem('Player1') && Player != localStorage.getItem('Player2')) {
							this.style.backgroundColor = "Green";
							localStorage.setItem('Player4', Player);
						}
					}
				}
			} else {
				if (Player === localStorage.getItem('Player4')){
					this.style.backgroundColor = "#13bfca";
					localStorage.removeItem('Player4');
				} 
			}
        }
    });
}

function confirmBooking(id){
	document.getElementById("container-left").style.visibility = 'hidden';
	document.getElementById("container-right").style.visibility = 'hidden';
    
   	const keys = ["Player1", "Player2", "Player3", "Player4"];
	const nonEmptyValues = [];
	
	keys.forEach((key) => {
	  const value = localStorage.getItem(key);
	  
	  if (value !== null && value.trim() !== "") {
		nonEmptyValues.push(value);
	  }
	});
	
	players = nonEmptyValues.toString();
	
	console.log(id);
	console.log(players);
		
	if (players !== '') {	
		document.getElementById("search_box").value = '';
		
		jQuery.ajax({
			method: "POST",
			url: "queue.php",
			data: {
				functionname: "addQueueItem",
				param1: id,
				param2: players
			},
			success: function () {
				$('#message').html('Nummer '+ id +' toegevoegd aan de wachtrij'); 
				getQueue();
			},
			error: function () {
				$('#message').html('Kon nummer '+ id +' niet toevoegen aan wachtrij');
			}
		});
		
	} else {
		$('#message').html('Geen speler geslecteerd, probeer het opnieuw');
	}

	document.getElementById('search_button').style.pointerEvents = 'auto';
	var elms = document.querySelectorAll("[id='numpad']");
	for(var i = 0; i < elms.length; i++) {
		elms[i].style.pointerEvents = 'auto';
	};	
	
	localStorage.removeItem('Player1');
	localStorage.removeItem('Player2');
	localStorage.removeItem('Player3');
	localStorage.removeItem('Player4');

	document.getElementById("message").style.boxShadow = "10px 20px 30px rgba(0, 0, 0, 0.5)";
    $("#message").fadeIn(250); 
    $("#message").delay(3000).fadeOut(250);
}

function closeDiaglog(){
    document.getElementById("container-left").style.visibility = 'hidden';
	document.getElementById("container-right").style.visibility = 'hidden';
    
    document.getElementById("search_box").value = '';
	document.getElementById('search_button').style.pointerEvents = 'auto';
	
	var elms = document.querySelectorAll("[id='numpad']");
	for(var i = 0; i < elms.length; i++) {
		elms[i].style.pointerEvents = 'auto';
	};	
	
	localStorage.removeItem('Player1');
    localStorage.removeItem('Player2');
    localStorage.removeItem('Player3');
    localStorage.removeItem('Player4');
}

function addNumber(element){
	document.getElementById(field).value = document.getElementById(field).value + element.value;
}

function removeNumber(){
	document.getElementById(field).value = document.getElementById(field).value .slice(0,-1);
}