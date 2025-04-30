const dns = "http://singasong.fun"
//selectedPlayers = [];
//selectedElements = [];
	
function songMenu(id) {

    jQuery.ajax({
        method: "POST",
        url: "../php/songs.php",
        data: {
            functionname: "SongDetails",
            param1: 'song',
			param2: id
        },
        success: function (response) {
            var result = JSON.parse(response);
			
			text1 = '<div id="div_menu_cover"><a href="/pages/song_details.html?value=' + id +'"><img id="menu_cover" src="' + result.Cover + '" alt="'+ id +'"></a></div>';
			text1 += '<div id="menu_artist_title"><a href="/pages/song_details.html?value=' + id +'" style="text-decoration: none;color: var(--elements);">' +  result.Title + '<br>' + result.Artist + '</a></div>';
			text1 += '<a href="/pages/song_details.html?value=' + id +'"><svg xmlns="http://www.w3.org/2000/svg\" id="song-btn" viewBox="0 0 24 24" fill="none" style="padding-right: 1em;">';
			text1 += '<path d="M9 19C9 20.6569 7.65685 22 6 22C4.34315 22 3 20.6569 3 19C3 17.3431 4.34315 16 6 16C7.65685 16 9 17.3431 9 19Z" stroke-width="1.5"/>';
			text1 += '<path d="M21 17C21 18.6569 19.6569 20 18 20C16.3431 20 15 18.6569 15 17C15 15.3431 16.3431 14 18 14C19.6569 14 21 15.3431 21 17Z" stroke-width="1.5"/>';
			text1 += '<path d="M9 19V8" stroke-width="1.5"/>';
			text1 += '<path d="M21 17V6" stroke-width="1.5"/>';
			text1 += '<path d="M15.7351 3.75466L11.7351 5.08799C10.4151 5.52801 9.75503 5.74801 9.37752 6.27179C9 6.79556 9 7.49128 9 8.88273V11.9997L21 7.99969V7.54939C21 5.01693 21 3.7507 20.1694 3.15206C19.3388 2.55341 18.1376 2.95383 15.7351 3.75466Z" stroke-width="1.5" stroke-linecap="round"/>';
			text1 += '</svg></a>';
                       
            // Check artist
            text2 = '<table id="tbl3" border="0" style="margin: 0 auto">';
            text2 += '<tr><td style="width:50px" onclick="splitArtist(\''+ result.Artist +'\')">';
			text2 += '<svg xmlns="http://www.w3.org/2000/svg" id="artist-btn" viewBox="0 0 24 24" fill="none">';
			text2 += '<g clip-path="url(#clip0_429_11111)">';
			text2 += '<circle cx="12" cy="7" r="3" stroke-width="1.5"/>';
			text2 += '<circle cx="18" cy="18" r="2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';
			text2 += '<path d="M12.3414 20H6C4.89543 20 4 19.1046 4 18C4 15.7909 5.79086 14 8 14H13.5278" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';
			text2 += '<path d="M20 18V11L22 13" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';
			text2 += '</g><defs><clipPath id="clip0_429_11111"><rect width="24" height="24" fill="white"/></clipPath></defs></svg></a></td>';
            text2 += '<td onclick="splitArtist(\''+ result.Artist +'\')">Bekijk artiest</td></tr>';
            text2 += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
		
			// Favourite
			text2 += '<tr><td onclick="addFav(\''+ result.Artist_Title +'\')">';
			text2 += '<svg id="heart-btn" class="btn-off" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000">';
			text2 += '<g id="SVGRepo_bgCarrier" stroke-width="0"></g>';
			text2 += '<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>';
			text2 += '<g id="SVGRepo_iconCarrier">';
			text2 += '<path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path>';
			text2+=' </g></svg></td>';
			text2 += '<td id="fav_txt" onclick="addFav(\''+ result.Artist_Title +'\')">Voeg toe aan favourieten</td></tr>';
			text2 += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';		
            
            // Show shares            
            text2 += '<tr><td onclick="showshares()">';
            text2 += '<svg xmlns="http://www.w3.org/2000/svg" id="share-btn" viewBox="0 0 24 24" fill="none">';
            text2 += '<path d="M9 12C9 13.3807 7.88071 14.5 6.5 14.5C5.11929 14.5 4 13.3807 4 12C4 10.6193 5.11929 9.5 6.5 9.5C7.88071 9.5 9 10.6193 9 12Z" stroke-width="1.5"/>';
            text2 += '<path d="M14 6.5L9 10" stroke-width="1.5" stroke-linecap="round"/>';
            text2 += '<path d="M14 17.5L9 14" stroke-width="1.5" stroke-linecap="round"/>';
            text2 += '<path d="M19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5Z" stroke-width="1.5"/>';
            text2 += '<path d="M19 5.5C19 6.88071 17.8807 8 16.5 8C15.1193 8 14 6.88071 14 5.5C14 4.11929 15.1193 3 16.5 3C17.8807 3 19 4.11929 19 5.5Z" stroke-width="1.5"/>';
            text2 += '</svg></td>';
            text2 += '<td><div id="share-value" onclick="showshares()">Delen</div></td></tr>';
            text2 += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
            
            // More of this
            text2 += '<tr><td><a href="/pages/result_list.html?genre=' + result.Genre + '">';
            text2 += '<svg xmlns="http://www.w3.org/2000/svg" id="more-btn" viewBox="0 0 24 24" fill="none">';
            text2 += '<path d="M21 6L3 6" stroke-width="1.5" stroke-linecap="round"/>';
            text2 += '<path d="M21 10L3 10" stroke-width="1.5" stroke-linecap="round"/>';
            text2 += '<path d="M11 14L3 14" stroke-width="1.5" stroke-linecap="round"/>';
            text2 += '<path d="M11 18H3" stroke-width="1.5" stroke-linecap="round"/>';
            text2 += '<path d="M18.875 14.1183C20.5288 15.0732 21.3558 15.5506 21.4772 16.2394C21.5076 16.4118 21.5076 16.5881 21.4772 16.7604C21.3558 17.4492 20.5288 17.9266 18.875 18.8815C17.2212 19.8363 16.3942 20.3137 15.737 20.0745C15.5725 20.0147 15.4199 19.9265 15.2858 19.814C14.75 19.3644 14.75 18.4096 14.75 16.4999C14.75 14.5902 14.75 13.6354 15.2858 13.1858C15.4199 13.0733 15.5725 12.9852 15.737 12.9253C16.3942 12.6861 17.2212 13.1635 18.875 14.1183Z" stroke-width="1.5"/>';
            text2 += '</svg></a></td>';
            text2 += '<td><a href="/pages/song_list.html?genre=' + result.Genre + '" style="text-decoration: none;color: var(--elements);">Meer van dit</a></td></tr></table>';
            
            text2 += '<div id="streamlinks">';
            text2 += '<img id="youtube" src="/img/youtube.png" alt="'+ result.Youtube +'" onclick="showvideo()">';
			if (result.Spotify) {
				text2 += '<img id="spotify" src="/img/spotify.png" alt="'+ result.Spotify +'" onclick="listensong()">';
			};
            text2 += '</div>';
            
            $('#menu-header').html(text1);
            $('#menu-details').html(text2);
    
			document.getElementById('song-menu').style.visibility = 'visible'; 
			document.getElementById('menu-header').style.justifyContent = 'space-between'; 
			document.getElementById('song-menu').style.transform = 'translate(0px)';
            document.getElementById('bgMenuOverlay').style.display = 'block';
            window.addEventListener('scroll', noscroll); 

        },
        error: function () {
            $('song-menu').html('Error met verwerking');
        }
    });	
}

function requestMenu(id) {

    jQuery.ajax({
        method: "POST",
        url: "../php/songs.php",
        data: {
            functionname: "requestDetails",
            param: id
        },
        success: function (response) {
            var result = JSON.parse(response);
			
			output = '';
			if(result.karaoke) {output += 'Karaoke '};
			if(result.duet) {output += 'duet'};
            
            text1 = '<div id="menu_artist_title"><span style="text-transform:uppercase">' +  result.Title + '</span><br>';
            text1 += result.Artist + '</div>';
            
            //check Progress
            text2 = '<table id="tbl3" border="0" style="margin: 0 auto">';
            text2 += '<tr><td style="width:50px"><svg xmlns="http://www.w3.org/2000/svg" id="progress-btn" viewBox="0 0 24 24" fill="none">';
            text2 += '<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 7.23858 2.23858 5 5 5H19C21.7614 5 24 7.23858 24 10V14C24 16.7614 21.7614 19 19 19H5C2.23858 19 0 16.7614 0 14V10ZM5 7C3.34315 7 2 8.34315 2 10V14C2 15.6569 3.34315 17 5 17H19C20.6569 17 22 15.6569 22 14V10C22 8.34315 20.6569 7 19 7H5ZM10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11V13C14 14.1046 13.1046 15 12 15C10.8954 15 10 14.1046 10 13V11ZM6 9C4.89543 9 4 9.89543 4 11V13C4 14.1046 4.89543 15 6 15C7.10457 15 8 14.1046 8 13V11C8 9.89543 7.10457 9 6 9Z"/>';
            text2 += '</svg></td>';
            text2 += '<td><progress style="border-radius: 5px 5px 5px 5px; width:100%;" value="'+ result.Progress +'" max="100"></progress></td></tr>';
            text2 += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
            
            //check artist
            text2 += '<tr><td onclick="splitArtist(\''+ result.Artist +'\')">';
			text2 += '<svg xmlns="http://www.w3.org/2000/svg" id="artist-btn" viewBox="0 0 24 24" fill="none">';
			text2 += '<g clip-path="url(#clip0_429_11111)">';
			text2 += '<circle cx="12" cy="7" r="3" stroke-width="1.5"/>';
			text2 += '<circle cx="18" cy="18" r="2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';
			text2 += '<path d="M12.3414 20H6C4.89543 20 4 19.1046 4 18C4 15.7909 5.79086 14 8 14H13.5278" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';
			text2 += '<path d="M20 18V11L22 13" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';
			text2 += '</g><defs><clipPath id="clip0_429_11111"><rect width="24" height="24" fill="white"/></clipPath></defs></svg></a></td>';
            text2 += '<td onclick="splitArtist(\''+ result.Artist +'\')"><a style="text-decoration: none;color: var(--elements)">Bekijk artiest</a></td></tr>';
            text2 += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
                                   
            // Requester
			text2 += '<tr><td>';
			text2 += '<svg xmlns="http://www.w3.org/2000/svg" id="profile-btn-off" viewBox="0 0 16 16" fill="none">';
			text2 += '<path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"/>';
			text2 += '<path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"/>';
			text2 += '</svg></td>';
            text2 += '<td>'+ result.Requester + '</td></tr>';
			text2 += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
			
			// Type request
			text2 += '<tr><td>';
			text2 += '<svg id="karaokeIconSmall" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="karaokeIcon" viewBox="0 0 512 512" xml:space="preserve" fill="none"><style type="text/css"></style><g><polygon points="0.001,437.167 74.823,512 354.337,254.387 257.614,157.664"/>';
			text2 += '<path d="M269.9,143.663l98.428,98.417c34.239,6.143,70.52-2.472,98.869-25.709L295.63,44.804 C272.393,73.153,263.757,109.412,269.9,143.663z"/>';
			text2 += '<path d="M476.317,35.674c-45.989-45.98-119.466-47.463-167.392-4.734l172.135,172.135 C523.789,155.15,522.306,81.663,476.317,35.674z"/></g>';
			text2 += '</svg></td>';
            text2 += '<td>'+ output + '</td></tr></table>';
            text2 += '<br>';
			
            $('#menu-header').html(text1)
            $('#menu-details').html(text2);
    
            document.getElementById('menu-header').style.justifyContent = 'space-around'; 
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

function songDetails(id){
    window.location.href = '/pages/song_details.html?value=' + id;
}

// function artistDetails(artist){
    // window.location.href = '/pages/artist_details.html?value=' + artist;
// }

function showvideo(){
    let link = document.getElementById('youtube').getAttribute('alt');
    $('#media').html('<iframe style="position: fixed; top: 0; left: 0; width: 100%; height: 50%; z-index: 10;" src="https://www.youtube.com/embed/' + link + '?si=nrhwhHNgMkbqUuOR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>');
    document.getElementById('bgMediaOverlay').style.display = 'block';
}

function listensong(){
    let link = document.getElementById('spotify').getAttribute('alt');
    $('#media').html('<iframe style="position: fixed; top: 0; left: 0; width: 100%; height: 50%; z-index: 10;" frameBorder="0" src="https://open.spotify.com/embed/track/' + link + '?utm_source=generator" allow="autoplay; encrypted-media;"></iframe>');
    document.getElementById('bgMediaOverlay').style.display = 'block';
}

function noscroll() {
    window.scrollTo(0, 0);
}

function showshares(url){ 
	if (navigator.share) {
		if (!url){
			if (document.getElementById('menu_cover')){
				var id = document.getElementById('menu_cover').getAttribute('alt');
			}
			if (document.getElementById('songCover')){
				var id = document.getElementById('songCover').getAttribute('alt');
			}

			pageUrl = dns + '/pages/song_details.html?value='+ id;
		} else {
			pageUrl = url;
		}
		
		navigator.share({
			// title: document.title,
			// text: 'Check dit nummer dan !',
			url: pageUrl
		})
	  .then(() => console.log('Successful share'))
	  .catch(error => console.log('Error sharing:', error));
	}
}

function addFav(artist_title){
	$token = getCookie('token');
	if ($token){
		jQuery.ajax({
			method: "POST",
			url: "/php/songs.php",
			data: {
				functionname: "addFavourite",
				param: artist_title
			},
			success: function (response) {
				if (document.getElementById("heart-btn")){
					document.getElementById("heart-btn").className.baseVal = "btn-on";
					document.getElementById("fav_txt").innerHTML = "Toegevoegd aan favourieten";
				} else{
					document.getElementById("heart-btn-dtl").className.baseVal = "btn-dtl-on";
				}									
			},
			error: function () {
			}
		});	
				
    } else {
		favourites = JSON.parse(localStorage.getItem('stored_favourites')) || [];

		if (!favourites.includes(artist_title)){
			favourites.push(artist_title);
			localStorage.setItem('stored_favourites', JSON.stringify(favourites));
		}			
		
		if (document.getElementById("heart-btn")){
			document.getElementById("heart-btn").className.baseVal = "btn-on";
			document.getElementById("fav_txt").innerHTML = "Toegevoegd aan favourieten";
		} else{
			document.getElementById("heart-btn-dtl").className.baseVal = "btn-dtl-on";
		}	    
	}    
}

function splitArtist(input){
    const searchvalues = [' feat. ',' feat ',' vs. ',' Feat ',' Feat. ',' ft. ',' ft ',' & ', ' en ', ' En ', ' and ', ' Ft. ', ', ',' And '];
    
    if(searchvalues.some(el => input.includes(el))){
        artists = [];
        colabvalue = searchvalues.find(v => input.includes(v));
        splits = input.split(colabvalue);
        $.each(splits, function (a){
            if(searchvalues.some(el => splits[a].includes(el))){
                colabvalue2 = searchvalues.find(v => splits[a].includes(v));
                splits2 = splits[a].split(colabvalue2);
                $.each(splits2, function (b){
                    if(searchvalues.some(el => splits2[b].includes(el))){
                        colabvalue3 = searchvalues.find(v => splits2[b].includes(v));
                        splits3 = splits2[b].split(colabvalue3);
                        $.each(splits3, function (c){
                            artists.push(splits3[c]);
                        });
                    } else {
                        artists.push(splits2[b]);
                    }
                });
            } else {
                artists.push(splits[a]);
            }
        });
        text = '<table id="tbl4" border="0">';
        $.each(artists, function (d){
           text +=  '<tr><td style="vertical-align:middle; text-align: right;"><a href="/pages/artist_details.html?value='+ artists[d] + '"><svg xmlns="http://www.w3.org/2000/svg" id="song-menu-btn" viewBox="0 0 24 24" fill="none"><path d="M9 5L15 12L9 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a><td>';
           text +=  '<td><a href="/pages/artist_details.html?value='+ artists[d] + '" style="text-decoration: none;font-weight: bold; color: var(--font-color)">' + artists[d] + '</a></td></tr>'; 
           text += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
        });
        
        $('#media').html('<div id=\"socials\" style=\"background: var(--main-background);border:2px solid var(--font-color); box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);position:fixed;width:80%;left:50%;bottom:30%;transform: translate(-50%, -50%);z-index: 10;padding: 10px 0em 0em 0em; border-radius: 10px;\">' + text + '</div>');
        document.getElementById('bgMediaOverlay').style.display = 'block';
        
    } else {
        window.location.href = '/pages/artist_details.html?value=' + input;
    }
}

function CreateRequest(artist,title,cover){
	usertoken = getCookie('token');	
	setCookie('artist',artist,1);
	setCookie('title',title,1);
	setCookie('cover',cover,1)
	setCookie('addRequest','ok',1);
	
	if (usertoken){
		window.location.href = '/pages/request.html';
	} else {
		window.location.href = '/pages/login.html';
	}
}

function AddQueueItem(Artist_Title){
	
	selectedPlayers = [];
	selectedElements = [];
	
	usertoken = getCookie('token');

	jQuery.ajax({
		type: "POST",
		url: '../php/users.php',
		data: {
			functionname: 'getUserDetails',
            param: usertoken
		},
		success: function (response) {
			result = JSON.parse(response);
			const artist = document.getElementById("songArtist").textContent;
			const title = document.getElementById("songTitle").textContent;
	
			text2 = '<div class="QueueAddForm">';
			text2 += '<label for="artist"><b>Artiest</b></label>';
			text2 += '<input type="text" id="artist-form" value="' +  artist + '" name="artist" readonly>';
			text2 += '<label for="title"><b>Titel</b></label>';
			text2 += '<input type="text" id="title-form" value="' +  title + '" name="title" readonly>';
			text2 += '<label for="player"><b>Spelers</b></label><br>';
			text2 += '<div class="dropdown">';
			text2 += '<div id="myDropdown" class="dropdown-content"></div>';
			text2 += '<div id="players-form" name="players" onclick="ToggleDropdown()">Selecteer..</div>';
			text2 += '</div>';
			text2 +=' <div class="QueueControl">';
            text2 += '<button type="submit" class="confirm-btn" onclick="addQueueItem(\''+ Artist_Title +'\')">OK</button>';
            text2 += '</div>';
				       
            $('#menu-header').html('Wachtrij-item aanmaken')
            $('#menu-details').html(text2);
			
            document.getElementById('song-menu').style.visibility = 'visible'; 
			document.getElementById('song-menu').style.transform = 'translate(0px)';
            document.getElementById('bgMenuOverlay').style.display = 'block';
            window.addEventListener('scroll', noscroll); 
			
			getQueuePlayers();
				
		},
		error: function () {
		}
	});
}

function getQueuePlayers(){
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
		},
        error: function () {
            usertxt += 'Geen spelers';
			$('#myDropdown').html(usertxt);
        }
    });	
}

function setInputValue(value, element) {
	const index = selectedPlayers.indexOf(value);

	if (index === -1) {
		if (selectedPlayers.length < 4) {
			//console.log(`Selecting: ${value}`);
			selectedPlayers.push(value);
			selectedElements.push(element);
			element.style.backgroundColor = colors[selectedPlayers.length - 1];
			updatePlayersForm();
		} else {
			showmessage('Je kunt maximaal 4 spelers selecteren','orange', 5000);
			// alert("You can select up to 4 players.");
			return;
		}
	} else if (index === selectedPlayers.length - 1) {
		// console.log(`Deselecting: ${value}`);
		selectedPlayers.pop();
		const removedElement = selectedElements.pop();
		removedElement.style.backgroundColor = "";
		updatePlayersForm();
	} else {
		showmessage('Je kunt alleen de meest recent geselecteerde speler deselecteren','orange', 5000);
		// alert("You can only deselect the most recently selected player.");
		return;
	}

	// console.log("Selected Players:", selectedPlayers);
}

function updatePlayersForm() {
	const playersForm = document.getElementById("players-form");
	playersForm.value = "";
	playersForm.innerHTML = "";

	if (selectedPlayers.length === 0) {
		playersForm.style.display = "block";
		playersForm.textContent = "Selecteer..";
	} else {
		playersForm.style.display = "flex";
		
		selectedPlayers.forEach((player, index) => {
			const playerDiv = document.createElement("div");
			playerDiv.textContent = player;
			playerDiv.style.backgroundColor = colors[index];
			playerDiv.style.padding = "5px 10px";
			playerDiv.style.margin = "2px";
			playerDiv.style.borderRadius = "5px";
			playerDiv.style.color = "white";
			playerDiv.style.display = "inline-block";
			playersForm.appendChild(playerDiv);
		});
	}
}

function ToggleDropdown() {
	document.getElementById("myDropdown").classList.toggle("show");  
}

function filterFunction() {
	const input = document.getElementById("players-form");
	const filter = input.value.toUpperCase();
	const div = document.getElementById("myDropdown");
	const a = div.getElementsByTagName("a");
	for (let i = 0; i < a.length; i++) {
		const txtValue = a[i].textContent || a[i].innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			a[i].style.display = "";
		} else {
			a[i].style.display = "none";
		}
	}
}
	
function addQueueItem(Artist_Title){
	
	var tmp = [];
	selectedPlayers.forEach((player, index) => {
		tmp[index] = player;
	});
	
	if (tmp.length === 0) {
		showmessage('Geen spelers geselecteerd, probeer opniew..','orange', 3000);
	} else {
		const artist = document.getElementById("songArtist").textContent;
		const title = document.getElementById("songTitle").textContent;
		
		players = tmp.toString();
		
		console.log('Artiest : ' + artist);
		console.log('Title : ' + title);
		console.log('players : ' + players);
		console.log('Artist_title : ' + Artist_Title);
		
		jQuery.ajax({
			method: "POST",
			url: "../php/queue.php",
			data: {
				functionname: "addQueueItem",
				param1: artist,
				param2: title,
				param3: players,
				param4: Artist_Title
			},
			success: function (response) {
				location.reload();
			},
			error: function () {
				showmessage('Probleem met het toevoegen van nummer aan wachtrij','red', 3000);
			}
		});		
	}
}