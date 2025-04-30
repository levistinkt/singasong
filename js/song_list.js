const urlParam = new URLSearchParams(window.location.search);

if(getCookie('queueResult_ERR')){
	showmessage('Probleem met het toevoegen van nummer aan wachtrij','red', 4000);
	eraseCookie("queueResult_ERR");
}
if(getCookie('queueResult_NOK')){
	showmessage('Nummer niet toegevoegd aan wachtrij, probeer opnieuw','orange', 4000);
	eraseCookie("queueResult_NOK");
}
if(getCookie('queueResult_OK')){
	showmessage('Nummer toegevoegd aan wachtrij','green', 3000);
	eraseCookie("queueResult_OK");
}

if (urlParam.get('value') !== null) {
    value = urlParam.get('value');
    document.getElementById("search_box").value = value;
    area = 'all';
} else if (urlParam.get('genre')  !== null) {
    value = urlParam.get('genre');
    document.getElementById('search_box').value = value;
    area = 'genre';
    storesearch(area,value);
} else if (urlParam.get('lang') !== null) {
    value = urlParam.get('lang');
    document.getElementById('search_box').value = value;
    area = 'lang';
    if (value !=='Dutch') storesearch(area,value);
} else if (urlParam.get('edition') !== null) {
    value = urlParam.get('edition');
    document.getElementById('search_box').value = value;
    area = 'edition';
    storesearch(area,value);
} else if (urlParam.get('year') !== null) {
    value = urlParam.get('year');
    document.getElementById('search_box').value = value;
    area = 'year';
    storesearch(area,value);
} else if (urlParam.get('date') !== null) {
    value = urlParam.get('date');
    document.getElementById('search_box').value = value;
    area = 'date';
} else if (urlParam.get('comment') !== null) {
    value = urlParam.get('comment');
    document.getElementById('search_box').value = value;
    area = 'comment';
} else if (urlParam.get('favourite') !== null) {
    value = localStorage.getItem('stored_favourites');    
    document.getElementById('search_box').value = 'Favorieten';
    area = 'favourite';
} else if (urlParam.get('recents') !== null) {
    value = localStorage.getItem('stored_recents');
    document.getElementById('search_box').value = 'Recents';
    area = 'recents';
} else if (urlParam.get('decade') !== null) {
    value = urlParam.get('decade');
    
if (value.length === 1){
	presentvalue = value + '0s';
} else {
    value = value.substr(0, 1);
  	presentvalue = value + '0s';	
}
    		
if (value === "0" || value === "1" || value === "2"){
    value = "20" + value;
} else { value = "19" + value; }
	document.getElementById('search_box').value = presentvalue;
	area = 'decade';
    storesearch(area,presentvalue);
}

var selectedPlayers = [];
var selectedElements = [];
const colors = ["blue", "red", "green", "#E8A317"];
var queue = false;

jQuery.ajax({
    method: "POST",
    url: "../php/songs.php",
    data: {
        functionname: "SongSearch",
        param1: area,
        param2: value
    },
    success: function (response) {
        //console.log(response);
		
		result = JSON.parse(response);
		
		text = '<table id="tbl1" border="0" style="margin: 0 auto">';
        const duetIconSmall = '<svg id="duetIconSmall" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="none"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z"/><path d="M14.3675 12.0632C14.322 12.1494 14.3413 12.2569 14.4196 12.3149C15.0012 12.7454 15.7209 13 16.5 13C18.433 13 20 11.433 20 9.5C20 7.567 18.433 6 16.5 6C15.7209 6 15.0012 6.2546 14.4196 6.68513C14.3413 6.74313 14.322 6.85058 14.3675 6.93679C14.7714 7.70219 15 8.5744 15 9.5C15 10.4256 14.7714 11.2978 14.3675 12.0632Z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M4.64115 15.6993C5.87351 15.1644 7.49045 15 9.49995 15C11.5112 15 13.1293 15.1647 14.3621 15.7008C15.705 16.2847 16.5212 17.2793 16.949 18.6836C17.1495 19.3418 16.6551 20 15.9738 20H3.02801C2.34589 20 1.85045 19.3408 2.05157 18.6814C2.47994 17.2769 3.29738 16.2826 4.64115 15.6993Z"/><path d="M14.8185 14.0364C14.4045 14.0621 14.3802 14.6183 14.7606 14.7837V14.7837C15.803 15.237 16.5879 15.9043 17.1508 16.756C17.6127 17.4549 18.33 18 19.1677 18H20.9483C21.6555 18 22.1715 17.2973 21.9227 16.6108C21.9084 16.5713 21.8935 16.5321 21.8781 16.4932C21.5357 15.6286 20.9488 14.9921 20.0798 14.5864C19.2639 14.2055 18.2425 14.0483 17.0392 14.0008L17.0194 14H16.9997C16.2909 14 15.5506 13.9909 14.8185 14.0364Z"/></svg>';
		const rapIconSmall = '<svg id="rapIconSmall" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M65.9,21.4c0.2,0.2,0.4,0.4,0.6,0.5c9.6,9.7,9.4,39.8,9.4,41.1c0,0.5-0.5,1-1,1h0c-0.6,0-1-0.5-1-1c0-0.3,0.2-30.6-8.8-39.6  c-1.4-1.4-2.9-2.2-4.6-2.4c-0.3,0-0.5,0-0.8,0c-0.3,0-0.6,0-0.9,0C38.6,21.8,37,50.4,37,50.7c0,0.5-0.5,1-1,1c0,0,0,0,0,0  c-0.6,0-1-0.5-1-1c0-0.3,1.1-20.2,13.1-28.3c-15.7,4-25.7,16.4-26.9,34.8L2.4,75.9c-1.5,1.5-0.2,3.9,1.8,3.6c2.3-0.3,5-1.6,7.9-1.6  c13.9,0,14.4,8.2,30.6,8.2c11.8,0,24.8-12.7,30.9-19.5c17.7-1.5,24.7-5.6,24.7-5.6C98.2,38.6,84.2,24.1,65.9,21.4z M67.9,67  c-6.3,0-13.4-3.3-20.2-6.5c-5.7-2.7-11.1-5.2-15.1-5.2c-5.5,0-7.4,1.1-7.4,1.1c-0.5,0.3-1.1,0.2-1.4-0.3c-0.3-0.5-0.2-1.1,0.3-1.4  c0.2-0.2,2.4-1.5,8.5-1.5c4.4,0,10,2.6,16,5.4c6.6,3.1,13.5,6.3,19.3,6.3c0.6,0,1,0.4,1,1S68.5,67,67.9,67z M63,17  c-0.1-1.8-1.5-3.2-3.3-3.2c-1.8,0-3.2,1.4-3.3,3.1c1.1-0.1,2.2-0.1,3.3-0.1C60.8,16.8,61.9,16.9,63,17z"/></svg>';
		const karaokeIconSmall = '<svg id="karaokeIconSmall" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="karaokeIcon" viewBox="0 0 512 512" xml:space="preserve" fill="none"><style type="text/css"></style><g><polygon points="0.001,437.167 74.823,512 354.337,254.387 257.614,157.664"/><path d="M269.9,143.663l98.428,98.417c34.239,6.143,70.52-2.472,98.869-25.709L295.63,44.804 C272.393,73.153,263.757,109.412,269.9,143.663z"/><path d="M476.317,35.674c-45.989-45.98-119.466-47.463-167.392-4.734l172.135,172.135 C523.789,155.15,522.306,81.663,476.317,35.674z"/></g></svg>';

        if(area === 'favourite'){					
			
			$.each(result, function (i) {
				if (result[i].duet){duet = duetIconSmall;}else{duet = '';}
				if (result[i].rap){rap = rapIconSmall;}else{rap = '';}
				if (result[i].karaoke){karaoke = karaokeIconSmall;}else{karaoke = '';}
				
				text += '<tr class="ListTitle"><td onclick="songDetails(' + i + ')" rowspan="2" style="width: 3em;"><img id="songCover"style="vertical-align:middle; border-radius: 5px; width:10vw" src="' + result[i].Cover + '" alt="'+ result[i].Artist_Title +'">';
				text += '<td onclick="songDetails(' + i + ')"><div id="songTitle">' + result[i].Title + '</div> ' + duet + rap + karaoke +'</td>';
				text += '<td rowspan="2" onclick="favMenu(\'' + result[i].Artist_Title + '\')" style="vertical-align:middle; text-align: right;"><svg xmlns="http://www.w3.org/2000/svg" id="song-menu-btn" viewBox="0 0 24 24" fill="none"><path d="M9 5L15 12L9 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></td></tr>';
				text += '<tr class="ListArtist"><td onclick="songDetails(' + i + ')"><div id="songArtist">' + result[i].Artist + '</div></td></tr>';	
				text += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
			});			
		} else {
			$.each(result, function (i) {
				if (result[i].duet){duet = duetIconSmall;}else{duet = '';}
				if (result[i].rap){rap = rapIconSmall;}else{rap = '';}
				if (result[i].karaoke){karaoke = karaokeIconSmall;}else{karaoke = '';}
				
				text += '<tr class="ListTitle"><td onclick="songDetails(' + i + ')" rowspan="2" style="width: 3em;"><img style="vertical-align:middle; border-radius: 5px; width:10vw" src="' + result[i].Cover + '">';
				text += '<td onclick="songDetails(' + i + ')">' + result[i].Title + ' ' + duet + rap + karaoke +'</td>';
				text += '<td rowspan="2" onclick="songMenu(\'' + result[i].ID + '\')"	 style="vertical-align:middle; text-align: right;"><svg xmlns="http://www.w3.org/2000/svg" id="song-menu-btn" viewBox="0 0 24 24" fill="none"><path d="M9 5L15 12L9 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></td></tr>';
				text += '<tr class="ListArtist"><td onclick="songDetails(' + i + ')">' + result[i].Artist + '</td></tr>';
				text += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
			});
		}
        $('#result').html(text);
    },
    error: function (e) {
        $('#result').html(e);
    }
});

function favMenu(id){
	jQuery.ajax({
		method: "POST",
		url: "../php/date.php",
		data: {
			functionname: "getGameDate"
		},
		success: function (response) {
			gamedate = new Date(response);
			today = new Date();
			gamedate2 = new Date(gamedate);
			gamedate2.setDate(gamedate.getDate() + 1);
			
			if(today.toDateString() === gamedate.toDateString() || today.toDateString() === gamedate2.toDateString()){
				
				text2 = '<table id="tbl3" border="0" style="margin: 0 auto">';
				text2 += '<tr onclick="removeFav(\'' + id + '\')"><td><svg xmlns="http://www.w3.org/2000/svg"  id="favRemove-btn" viewBox="0 0 24 24" fill="none"><path d="M7 9.5L12 14.5M12 9.5L7 14.5M19.4922 13.9546L16.5608 17.7546C16.2082 18.2115 16.032 18.44 15.8107 18.6047C15.6146 18.7505 15.3935 18.8592 15.1583 18.9253C14.8928 19 14.6042 19 14.0271 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2C3 7.0799 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.07989 5 6.2 5H14.0271C14.6042 5 14.8928 5 15.1583 5.07467C15.3935 5.14081 15.6146 5.2495 15.8107 5.39534C16.032 5.55998 16.2082 5.78846 16.5608 6.24543L19.4922 10.0454C20.0318 10.7449 20.3016 11.0947 20.4054 11.4804C20.4969 11.8207 20.4969 12.1793 20.4054 12.5196C20.3016 12.9053 20.0318 13.2551 19.4922 13.9546Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></td>';
				text2 += '<td>Uit favorieten verwijderen</td></tr>';
				text2 += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
				text2 += '<tr onclick="AddQueueItem(\''+ id +'\')"><td><svg xmlns="http://www.w3.org/2000/svg" id="queueAdd-btn" viewBox="0 0 48 48"><title>queue</title><g data-name="Layer 2"><g data-name="invisible box"><rect width="48" height="48" fill="none"/></g><g id="icons_Q2" data-name="icons Q2"><path d="M16,36a2,2,0,0,1-2-2V6a2,2,0,0,1,2-2h0a2,2,0,0,1,2,2V34a2,2,0,0,1-2,2Z" stroke-width="2px"/><path d="M24,36a2,2,0,0,1-2-2V6a2,2,0,0,1,2-2h0a2,2,0,0,1,2,2V34a2,2,0,0,1-2,2Z" stroke-width="2px"/><path d="M32,36a2,2,0,0,1-2-2V6a2,2,0,0,1,2-2h0a2,2,0,0,1,2,2V34a2,2,0,0,1-2,2Z" stroke-width="2px"/><path d="M39.7,26A2.1,2.1,0,0,0,38,28.1V40H10V28.1A2.1,2.1,0,0,0,8.3,26,2,2,0,0,0,6,28V42a2,2,0,0,0,2,2H40a2,2,0,0,0,2-2V28A2,2,0,0,0,39.7,26Z" stroke-width="2px"/><path d="M9.8,15.7,2.5,11.1c-.3-.2-.5-.1-.5.3v9.2c0,.4.2.5.5.3l7.3-4.6Q10.3,16,9.8,15.7Z" stroke-width="2px"/><path d="M45.8,15.7l-7.3-4.6c-.3-.2-.5-.1-.5.3v9.2c0,.4.2.5.5.3l7.3-4.6Q46.3,16,45.8,15.7Z" stroke-width="2px"/></g></g></svg></td>';
				text2 += '<td>Aan wachtrij toevoegen</td></tr>';
				text2 += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
            				
			} else {
				text2 = '<table id="tbl3" border="0" style="margin: 0 auto">';
				text2 += '<tr onclick="removeFav(\'' + id + '\')"><td><svg xmlns="http://www.w3.org/2000/svg"  id="favRemove-btn" viewBox="0 0 24 24" fill="none"><path d="M7 9.5L12 14.5M12 9.5L7 14.5M19.4922 13.9546L16.5608 17.7546C16.2082 18.2115 16.032 18.44 15.8107 18.6047C15.6146 18.7505 15.3935 18.8592 15.1583 18.9253C14.8928 19 14.6042 19 14.0271 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2C3 7.0799 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.07989 5 6.2 5H14.0271C14.6042 5 14.8928 5 15.1583 5.07467C15.3935 5.14081 15.6146 5.2495 15.8107 5.39534C16.032 5.55998 16.2082 5.78846 16.5608 6.24543L19.4922 10.0454C20.0318 10.7449 20.3016 11.0947 20.4054 11.4804C20.4969 11.8207 20.4969 12.1793 20.4054 12.5196C20.3016 12.9053 20.0318 13.2551 19.4922 13.9546Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></td>';
				text2 += '<td>Uit favorieten verwijderen</td></tr>';
				text2 += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
			}
			
			text1 = 'Favourieten menu';
			
			$('#menu-header').html(text1)
			$('#menu-details').html(text2);
			
			document.getElementById('song-menu').style.visibility = 'visible'; 
			document.getElementById('song-menu').style.transform = 'translate(0px)';
			document.getElementById('bgMenuOverlay').style.display = 'block';
			window.addEventListener('scroll', noscroll); 
		}
	});
}

function storesearch(area,value){
    if (area !== 'favourite'){
            var stored_searches = JSON.parse(localStorage.getItem('stored_searches')) || [];
        var data = area + '|' + value;

        if (!stored_searches.includes(data)){
            if (stored_searches.length >= 10){
                stored_searches.shift();
            }
            stored_searches.push(area + '|' + value);
            localStorage.setItem('stored_searches', JSON.stringify(stored_searches));
        };	
    }
}

function removeFav(id){
	token = getCookie('token');
	
	if (token){
		jQuery.ajax({
			method: "POST",
			url: "/php/songs.php",
			data: {
				functionname: "removeFavourite",
				param: id
			},
			success: function (response) {
				location.reload();
			},
			error: function () {
			}
		});	
				
	} else {
		favourites = JSON.parse(localStorage.getItem('stored_favourites')) || [];
		
		filteredfavourites = favourites.filter(function(e) { return e !== artist_title })
		localStorage.setItem('stored_favourites', JSON.stringify(filteredfavourites));
		location.reload();
	}    
}