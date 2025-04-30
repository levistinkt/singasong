usertoken = getCookie('token');
requestResult = getCookie("requestResult");
addRequest = getCookie('addRequest');

if (addRequest) {
	
	artist = getCookie('artist');
	title = getCookie('title');
	cover = getCookie('cover');
	
	document.getElementById("artist-form").value = artist;
	document.getElementById("title-form").value = title;
	document.getElementById("comment-form").value = cover;
	
	eraseCookie("artist");
	eraseCookie("title");
	eraseCookie("cover");
	eraseCookie("addRequest");
}

if (requestResult) {
	if (requestResult === 'OK'){
		showmessage('Actie succesvol uitgevoerd', 'green', 2000);
	} else {
		showmessage(decodeURIComponent(userResult)  + ', probeer het opnieuw', 'orange', 3000);
	}	
	eraseCookie("requestResult");
}

jQuery.ajax({
	type: "POST",
	url: '../php/users.php',
	data: {
		functionname: 'getUserDetails',
		param: usertoken
	},
	success: function (response) {
		result = JSON.parse(response);			
		if( result[0].role !== 'admin'){
			document.getElementById("editRequestBlock").style.display = 'none';
		} else {
			getActiveRequests();
		}
	},
	error: function () {
	}
});

function getActiveRequests(){
	jQuery.ajax({
		method: "POST",
		url: "../php/songs.php",
		data: {
			functionname: "ActiveRequestList"
		},
		success: function (response) {
			result = JSON.parse(response);
			text = '<table id="tbl1" border="0" style="padding: 0em 1em 0em 1em; width:100%">';
			editbtn = '<svg xmlns="http://www.w3.org/2000/svg" id="requestEdit-btn" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"/></svg>';
			removebtn = '<svg xmlns="http://www.w3.org/2000/svg"  id="requestRemove-btn" viewBox="0 0 24 24" fill="none"><path d="M7 9.5L12 14.5M12 9.5L7 14.5M19.4922 13.9546L16.5608 17.7546C16.2082 18.2115 16.032 18.44 15.8107 18.6047C15.6146 18.7505 15.3935 18.8592 15.1583 18.9253C14.8928 19 14.6042 19 14.0271 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2C3 7.0799 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.07989 5 6.2 5H14.0271C14.6042 5 14.8928 5 15.1583 5.07467C15.3935 5.14081 15.6146 5.2495 15.8107 5.39534C16.032 5.55998 16.2082 5.78846 16.5608 6.24543L19.4922 10.0454C20.0318 10.7449 20.3016 11.0947 20.4054 11.4804C20.4969 11.8207 20.4969 12.1793 20.4054 12.5196C20.3016 12.9053 20.0318 13.2551 19.4922 13.9546Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

			$.each(result, function (i) {
				text += '<tr class="ListTitle"><td rowspan="2" style="vertical-align:middle; width: 5%;">&#x2022;</td>';
				text += '<td>' + result[i].Title + '</td>';
				text += '<td rowspan="2" style="vertical-align:middle; width:40px;text-align: left;"><a onclick="editRequest(' + result[i].ID + ')">'+ editbtn +'</a></td><td rowspan="2" style="vertical-align:middle;width:40px;text-align: right;"><a onclick="deleteRequest(' + result[i].ID + ')">'+ removebtn +'</a></td></tr>';
				text += '<tr class="ListArtist"><td>'+ result[i].Artist +'</td></tr>';
				text += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
			});
			$('#editRequests').html(text);
		},
		error: function (e) {
			$("#editRequests").html(e);
		}
	});
}

jQuery.ajax({
	method: "POST",
	url: "../php/songs.php",
	data: {
		functionname: "requestList"
	},
	success: function (response) {
		result = JSON.parse(response);
		text = '<table id="tbl5" border="0">';
		check = '<svg id="request-menu-btn" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 -0.5 21 21" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="request-menu-btn" transform="translate(-179.000000, -400.000000)"><g id="icons" transform="translate(56.000000, 160.000000)"><path d="M141.9,243 C141.9,242.448 141.4296,242 140.85,242 L126.15,242 C125.5704,242 125.1,242.448 125.1,243 L125.1,257 C125.1,257.552 125.5704,258 126.15,258 L140.85,258 C141.4296,258 141.9,257.552 141.9,257 L141.9,243 Z M144,242 L144,258 C144,259.105 143.06025,260 141.9,260 L125.1,260 C123.93975,260 123,259.105 123,258 L123,242 C123,240.895 123.93975,240 125.1,240 L141.9,240 C143.06025,240 144,240.895 144,242 L144,242 Z M137.72205,247.015 C138.1326,247.405 138.1326,248.039 137.72205,248.429 L133.63965,252.317 C133.0233,252.903 132.0258,252.903 131.40945,252.317 L129.5541,250.55 C129.1446,250.16 129.1446,249.527 129.5541,249.136 C129.96465,248.746 130.6293,248.746 131.0388,249.136 L131.7801,249.842 C132.19065,250.233 132.8574,250.233 133.269,249.842 L136.23735,247.015 C136.64685,246.624 137.31255,246.624 137.72205,247.015 L137.72205,247.015 Z" id="done-[#1477]"></path></g></g></g></svg>'
		duetIcon = '<svg id="duetIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="none"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z" stroke="white"/><path d="M14.3675 12.0632C14.322 12.1494 14.3413 12.2569 14.4196 12.3149C15.0012 12.7454 15.7209 13 16.5 13C18.433 13 20 11.433 20 9.5C20 7.567 18.433 6 16.5 6C15.7209 6 15.0012 6.2546 14.4196 6.68513C14.3413 6.74313 14.322 6.85058 14.3675 6.93679C14.7714 7.70219 15 8.5744 15 9.5C15 10.4256 14.7714 11.2978 14.3675 12.0632Z" stroke="white" /><path fill-rule="evenodd" clip-rule="evenodd" d="M4.64115 15.6993C5.87351 15.1644 7.49045 15 9.49995 15C11.5112 15 13.1293 15.1647 14.3621 15.7008C15.705 16.2847 16.5212 17.2793 16.949 18.6836C17.1495 19.3418 16.6551 20 15.9738 20H3.02801C2.34589 20 1.85045 19.3408 2.05157 18.6814C2.47994 17.2769 3.29738 16.2826 4.64115 15.6993Z" stroke="white"/><path d="M14.8185 14.0364C14.4045 14.0621 14.3802 14.6183 14.7606 14.7837V14.7837C15.803 15.237 16.5879 15.9043 17.1508 16.756C17.6127 17.4549 18.33 18 19.1677 18H20.9483C21.6555 18 22.1715 17.2973 21.9227 16.6108C21.9084 16.5713 21.8935 16.5321 21.8781 16.4932C21.5357 15.6286 20.9488 14.9921 20.0798 14.5864C19.2639 14.2055 18.2425 14.0483 17.0392 14.0008L17.0194 14H16.9997C16.2909 14 15.5506 13.9909 14.8185 14.0364Z" stroke="white"/></svg>';
		karaokeIcon = '<svg id="karaokeIcon2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="karaokeIcon" viewBox="0 0 512 512" xml:space="preserve" fill="none"><style type="text/css"></style><g><polygon points="0.001,437.167 74.823,512 354.337,254.387 257.614,157.664"/><path d="M269.9,143.663l98.428,98.417c34.239,6.143,70.52-2.472,98.869-25.709L295.63,44.804 C272.393,73.153,263.757,109.412,269.9,143.663z"/><path d="M476.317,35.674c-45.989-45.98-119.466-47.463-167.392-4.734l172.135,172.135 C523.789,155.15,522.306,81.663,476.317,35.674z"/></g></svg>';

		$.each(result, function (i) {
		
			if (result[i].Progress === '100'){ checkbutton = check; } else { checkbutton = ' '; }
			if (result[i].duet && result[i].Progress !== '100') {duetInfo = duetIcon} else {duetInfo = '';}
			if (result[i].karaoke && result[i].Progress !== '100') {karaokeInfo = karaokeIcon} else {karaokeInfo = '';}
		
			text += '<tr class="ListTitle '+ result[i].Progress + '"><td rowspan="2" style="vertical-align:middle; text-align: middle; width: 15%;" onclick="requestMenu(' + result[i].ID + ')"><svg xmlns="http://www.w3.org/2000/svg" id="song-menu-btn" viewBox="0 0 24 24" fill="none"><path d="M9 5L15 12L9 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></td>';
			text += '<td>' + result[i].Title + '</td>';
			text += '<td rowspan="2" style="width: 50px;text-align-last: center; display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: flex-end;align-items: center;"><a href="/pages/song_details.html?request=' + result[i].Artist_Title + '">'+ checkbutton +'</a>'+ duetInfo + karaokeInfo + '</td></tr>';
			text += '<tr class="ListArtist '+ result[i].Progress + '"><td>'+ result[i].Artist +' </td></tr>';
			text += '<tr class="'+ result[i].Progress +'" style="height: 10px;"><!– Mimic the margin –></tr>';
		});
	
		$('#requestList').html(text);
		$('#tbl5 tbody tr.100').hide();
	},
	error: function (e) {
		$("#latest-requests").html(e);
	}
});

document.getElementById("req-history-box").addEventListener('change', e => {
	if(e.target.checked === true) {
		$('#tbl5 tbody tr.100').show(); 
		document.getElementById("requestSearch").style.display = "block";
	}
	if(e.target.checked === false) {
		$('#tbl5 tbody tr.100').hide();
		document.getElementById("requestSearch").style.display = "none";
	}
	
});

ReqSearchForm = document.getElementById("requestSearch-form");
if(ReqSearchForm){
    $('#requestSearch-form').on('keyup', function() {
        var inputValue = $(this).val().toLowerCase();
        $('#tbl5 tbody tr').hide();
        $('#tbl5 tbody tr').each(function(index, element) {
            var row = $(element);

            if (row.hasClass('ListTitle')) {
                var nextRow1 = row.next();
                var nextRow2 = nextRow1.next();

                var matchFound = row.add(nextRow1).add(nextRow2).find('td').filter(function() {
                    return $(this).text().toLowerCase().indexOf(inputValue) > -1;
                }).length > 0;
                if (matchFound) {
                    row.show();
                    nextRow1.show();
                    nextRow2.show();
                }
            }
        });
    });
}

function editRequest(id){
	
	jQuery.ajax({
        method: "POST",
        url: "../php/songs.php",
        data: {
            functionname: "requestDetails",
            param: id
        },
        success: function (response) {
            var result = JSON.parse(response);
			
			text1 = 'Verzoek bewerken';
			
			text2 = '<form action="/php/request.php" method="POST">';
			text2 += '<div class="requestEditForm">';
			text2 += '<input type="text" id="action" value="edit" name="action" style="display:none;">';
			text2 += '<input type="text" id="id-form" value="' +  id + '" name="id" style="display:none;" required>';
			text2 += '<label for="artist"><b>Artiest</b></label>';
			text2 += '<input type="text" id="artist-form" value="' +  result.Artist + '" name="artist" required>';
			text2 += '<label for="title"><b>Titel</b></label>';
			text2 += '<input type="text" id="title-form" value="' +  result.Title + '" name="title" required>';
			text2 += '<label for="comment"><b>Commentaar</b></label>';
			text2 += '<input type="text" id="comment-form" value="' +  result.Comment + '" name="comment">';
			text2 += '<label for="progress"><b>Voortgang</b></label>';
			text2 += '<div class="range">';
			text2 += '<input type="range" min="0" max="100" value="' +  result.Progress + '" id="range" name="range"/>';
			text2 += '<div class="value" name="progress">' +  result.Progress + '</div></div>';
			text2 += '<label for="song"><b>Link nummer</b></label>';
			text2 += '<div class="dropdown">';
			text2 += '<div id="songDropdown" class="dropdown-songs"></div>';
			text2 += '<input type="text" placeholder="Zoeken.." value="' +  result.SongID + '" id="song-form" name="song" readonly>';
			text2 += '<i class="bi bi-link-45deg" onclick="ToggleSongDropdown()"></i>';
			text2 += '</div>';
			text2 += '<label for="requester"><b>Aanvrager</b></label><br>';
			text2 += '<div class="dropdown">';
			text2 += '<div id="myDropdown" class="dropdown-content"></div>';
			text2 += '<input type="text" placeholder="Zoeken.." value="' +  result.Requester + '" id="requester-form" onkeyup="filterFunction()" name="requester">';
			text2 += '<i class="bi bi-chevron-expand" onclick="ToggleDropdown()"></i>';
			text2 += '</div>';
			text2 += '</div>';
			text2 +=' <div class="editctl">';
            text2 += '<button type="submit" class="editbtn" name="Edit">OK</button>'
            text2 += '</div></form>';
				       
            $('#menu-header').html(text1)
            $('#menu-details').html(text2);
			
            document.getElementById('song-menu').style.visibility = 'visible'; 
			document.getElementById('song-menu').style.transform = 'translate(0px)';
            document.getElementById('bgMenuOverlay').style.display = 'block';
            window.addEventListener('scroll', noscroll); 
			
			getSongList(result.Artist);
			getUsers();
				
			const sliderEl = document.querySelector("#range")
			const sliderValue = document.querySelector(".value")

			sliderEl.addEventListener("input", (event) => {
				const tempSliderValue = event.target.value; 

				sliderValue.textContent = tempSliderValue;

				const progress = (tempSliderValue / sliderEl.max) * 100;

				sliderEl.style.background = `linear-gradient(to right, white ${progress}%, #ccc ${progress}%)`;
			})
        },
        error: function () {
            $('song-menu').html('Error met verwerking');
        }
    });	
}

function getSongList(value){
	
	jQuery.ajax({
        method: "POST",
        url: "../php/songs.php",
        data: {
            functionname: "SongSearch",
			param1: 'artist',
			param2: value
        },
        success: function (response) {
			result = JSON.parse(response);
			songtxt = '';
			$.each(result, function (i) {
				if(result[i].ID == null ){
					songID = 'Zoeken..';
				} else {
					songID = result[i].ID;
				}
				songtxt += '<a href="#song" onclick="setRequestSong(\''+ songID +'\')" data="'+result[i].ID+'">'+ result[i].Artist +' - '+ result[i].Title +' </a>';
            });
			$('#songDropdown').html(songtxt);
		},
        error: function () {
			$('#songDropdown').html('<a href="#song">Geen nummer</a>');
        }
    });	
}


function getUsers(){
	jQuery.ajax({
        method: "POST",
        url: "../php/users.php",
        data: {
            functionname: "userList"
        },
        success: function (response) {
			result = JSON.parse(response);
			usertxt = '';
			$.each(result, function (i) {                   
				usertxt += '<a href="#user" onclick="setRequestInputValue(\''+ result[i].firstname +'\')" data="'+result[i].ID+'">'+ result[i].firstname +'</a>';
            });
			$('#myDropdown').html(usertxt);
		},
        error: function () {
            usertxt += '<a href="#user">Geen gebruiker</a>';
			$('#myDropdown').html(usertxt);
        }
    });	
}

function deleteRequest(id){
	
	jQuery.ajax({
        method: "POST",
        url: "../php/songs.php",
        data: {
            functionname: "requestDetails",
            param: id
        },
        success: function (response) {
            var result = JSON.parse(response);
			
			text1 = 'Verzoek verwijderen';
			
			text2 = '<form action="/php/request.php" method="POST">';
			text2 += '<div class="requestEditForm">';
			text2 += '<input type="text" id="action" value="delete" name="action" style="display:none;">';
			text2 += '<input type="text" id="id-form" value="' +  id + '" name="id" style="display:none;" readonly>';
			text2 += '<label for="artist"><b>Artiest</b></label>';
			text2 += '<input type="text" id="artist-form" value="' +  result.Artist + '" name="artist" readonly>';
			text2 += '<label for="title"><b>Titel</b></label>';
			text2 += '<input type="text" id="title-form" value="' +  result.Title + '" name="title" readonly>';
			text2 += 'Dit verzoek verwijderen ?';
			text2 += '</div>';
			text2 +=' <div class="editctl">';
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

function setRequestInputValue(value) {
	document.getElementById("requester-form").value = value;
	document.getElementById("myDropdown").classList.remove("show"); 
}

function setRequestSong(value) {
	document.getElementById("song-form").value = value;
	document.getElementById("songDropdown").classList.remove("show"); 
}

function ToggleDropdown() {
	document.getElementById("myDropdown").classList.toggle("show");  
}

function ToggleSongDropdown() {
	document.getElementById("songDropdown").classList.toggle("show");  
}

/* Filter function for search */
function filterFunction() {
  const input = document.getElementById("requester-form");
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