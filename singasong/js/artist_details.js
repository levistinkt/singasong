const listurlParams = new URLSearchParams(window.location.search);
const listvalue = listurlParams.get('value');
const duetIconSmall = '<svg id="duetIconSmall" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="none"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z"/><path d="M14.3675 12.0632C14.322 12.1494 14.3413 12.2569 14.4196 12.3149C15.0012 12.7454 15.7209 13 16.5 13C18.433 13 20 11.433 20 9.5C20 7.567 18.433 6 16.5 6C15.7209 6 15.0012 6.2546 14.4196 6.68513C14.3413 6.74313 14.322 6.85058 14.3675 6.93679C14.7714 7.70219 15 8.5744 15 9.5C15 10.4256 14.7714 11.2978 14.3675 12.0632Z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M4.64115 15.6993C5.87351 15.1644 7.49045 15 9.49995 15C11.5112 15 13.1293 15.1647 14.3621 15.7008C15.705 16.2847 16.5212 17.2793 16.949 18.6836C17.1495 19.3418 16.6551 20 15.9738 20H3.02801C2.34589 20 1.85045 19.3408 2.05157 18.6814C2.47994 17.2769 3.29738 16.2826 4.64115 15.6993Z"/><path d="M14.8185 14.0364C14.4045 14.0621 14.3802 14.6183 14.7606 14.7837V14.7837C15.803 15.237 16.5879 15.9043 17.1508 16.756C17.6127 17.4549 18.33 18 19.1677 18H20.9483C21.6555 18 22.1715 17.2973 21.9227 16.6108C21.9084 16.5713 21.8935 16.5321 21.8781 16.4932C21.5357 15.6286 20.9488 14.9921 20.0798 14.5864C19.2639 14.2055 18.2425 14.0483 17.0392 14.0008L17.0194 14H16.9997C16.2909 14 15.5506 13.9909 14.8185 14.0364Z"/></svg>';
const rapIconSmall = '<svg id="rapIconSmall" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M65.9,21.4c0.2,0.2,0.4,0.4,0.6,0.5c9.6,9.7,9.4,39.8,9.4,41.1c0,0.5-0.5,1-1,1h0c-0.6,0-1-0.5-1-1c0-0.3,0.2-30.6-8.8-39.6  c-1.4-1.4-2.9-2.2-4.6-2.4c-0.3,0-0.5,0-0.8,0c-0.3,0-0.6,0-0.9,0C38.6,21.8,37,50.4,37,50.7c0,0.5-0.5,1-1,1c0,0,0,0,0,0  c-0.6,0-1-0.5-1-1c0-0.3,1.1-20.2,13.1-28.3c-15.7,4-25.7,16.4-26.9,34.8L2.4,75.9c-1.5,1.5-0.2,3.9,1.8,3.6c2.3-0.3,5-1.6,7.9-1.6  c13.9,0,14.4,8.2,30.6,8.2c11.8,0,24.8-12.7,30.9-19.5c17.7-1.5,24.7-5.6,24.7-5.6C98.2,38.6,84.2,24.1,65.9,21.4z M67.9,67  c-6.3,0-13.4-3.3-20.2-6.5c-5.7-2.7-11.1-5.2-15.1-5.2c-5.5,0-7.4,1.1-7.4,1.1c-0.5,0.3-1.1,0.2-1.4-0.3c-0.3-0.5-0.2-1.1,0.3-1.4  c0.2-0.2,2.4-1.5,8.5-1.5c4.4,0,10,2.6,16,5.4c6.6,3.1,13.5,6.3,19.3,6.3c0.6,0,1,0.4,1,1S68.5,67,67.9,67z M63,17  c-0.1-1.8-1.5-3.2-3.3-3.2c-1.8,0-3.2,1.4-3.3,3.1c1.1-0.1,2.2-0.1,3.3-0.1C60.8,16.8,61.9,16.9,63,17z"/></svg>';
const karaokeIconSmall = '<svg id="karaokeIconSmall" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="karaokeIcon" viewBox="0 0 512 512" xml:space="preserve" fill="none"><style type="text/css"></style><g><polygon points="0.001,437.167 74.823,512 354.337,254.387 257.614,157.664"/><path d="M269.9,143.663l98.428,98.417c34.239,6.143,70.52-2.472,98.869-25.709L295.63,44.804 C272.393,73.153,263.757,109.412,269.9,143.663z"/><path d="M476.317,35.674c-45.989-45.98-119.466-47.463-167.392-4.734l172.135,172.135 C523.789,155.15,522.306,81.663,476.317,35.674z"/></g></svg>';
const popularIcon = '<svg xmlns="http://www.w3.org/2000/svg" id="popularIcon" viewBox="0 0 24 24" fill="none"><g><path d="M20.0005 7L14.1543 12.9375C14.0493 13.0441 13.9962 13.0976 13.9492 13.1396C13.1899 13.8193 12.0416 13.8193 11.2822 13.1396C11.2352 13.0976 11.1817 13.0442 11.0767 12.9375C10.9716 12.8308 10.9191 12.7774 10.8721 12.7354C10.1127 12.0557 8.96397 12.0557 8.20461 12.7354C8.15771 12.7773 8.10532 12.8305 8.00078 12.9367L4 17M20.0005 7L20 13M20.0005 7H14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>';
const followIcon = '<svg xmlns="http://www.w3.org/2000/svg" id="followIcon" viewBox="0 0 24 24"><g><path stroke="none" fill="none" d="M0 0h24v24H0z"/><path id="popularIconPath" d="M14 14.252v2.09A6 6 0 0 0 6 22l-2-.001a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm5.793 8.914l3.535-3.535 1.415 1.414-4.95 4.95-3.536-3.536 1.415-1.414 2.12 2.121z"/></g></svg>';

document.getElementById('search_box').value = listvalue.replace(/%20/g, " ");

jQuery.ajax({   
    method: "POST",
    url: "../php/artists.php",
    data: {
        functionname: "artistSongs",
        param: listvalue
    },
    success: function (response) {
        var solotxt = '';
        var colabtxt = '';

        var result = JSON.parse(response);
        var solo = [];
        var colab = [];
        
        const searchvalues = [' feat. ',' feat ',' vs. ',' Feat ',' Feat. ',' ft. ',' ft ',' & ', ' en ', ' En ', ' and ', ' Ft. ', ', ',' And'];

        $.each(result, function (i){
            if(searchvalues.some(el => result[i].Artist.includes(el))){
                colab.push(result[i]);
            } else if (result[i].Artist === listvalue){
                solo.push(result[i]);
            }
        });

        if (Object.keys(solo).length > 0){
			solotxt += '<table id="tbl4" border="0">';
            $.each(solo, function (i) {
                if (solo[i].duet){duet = duetIconSmall;}else{duet = '';}
				if (solo[i].rap){rap = rapIconSmall;}else{rap = '';}
				if (solo[i].karaoke){karaoke = karaokeIconSmall;}else{karaoke = ''};
                solotxt += '<tr class="ListTitle"><td class="SongCover" style="width: 3em" onclick="songDetails(' + solo[i].ID + ')"rowspan="2"><img style="vertical-align:middle; border-radius: 5px; width:10vw; height: 10vw;" src="' + solo[i].Cover + '">';
                solotxt += '<td onclick="songDetails(' + solo[i].ID + ')">' + solo[i].Title + ' ' + duet + rap + karaoke + '</td>';
                solotxt += '<td rowspan="2" onclick="songMenu(' + solo[i].ID + ')" style="vertical-align:middle; text-align: right;"><svg xmlns="http://www.w3.org/2000/svg" id="song-menu-btn" viewBox="0 0 24 24" fill="none"><path d="M9 5L15 12L9 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></td></tr>';
                solotxt += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
            });  
        } else {
            solotxt += '<table id="tbl4" border="0">'; 
            solotxt += '<tr class="ListTitle">';
            solotxt += '<td class="SongCover" rowspan="2"><div style="vertical-align:middle; border-radius: 5px; width:10vw; height: 10vw;"></div>';
            solotxt += '<td>-</td></tr></table>';
        }

        if (Object.keys(colab).length > 0){
            colabtxt += '<table id="tbl4" border="0">';
            $.each(colab, function (i) {
                if (colab[i].duet){duet = duetIconSmall;}else{duet = '';}
				if (colab[i].rap){rap = rapIconSmall;}else{rap = '';}
				if (colab[i].karaoke){karaoke = karaokeIconSmall;}else{karaoke = ''};
                colabtxt += '<tr class="ListTitle"><td class="SongCover" style="width: 3em" onclick="songDetails(' + colab[i].ID + ')" rowspan="2"><img style="vertical-align:middle; border-radius: 5px; width:10vw; height: 10vw;" src="' + colab[i].Cover + '">';
                colabtxt += '<td onclick="songDetails(' + colab[i].ID + ')">' + colab[i].Title + ' ' + duet + rap + karaoke +'</td>';
                colabtxt += '<td rowspan="2" onclick="songMenu(' + colab[i].ID + ')" style="vertical-align:middle; text-align: right;"><svg xmlns="http://www.w3.org/2000/svg" id="song-menu-btn" viewBox="0 0 24 24" fill="none"><path d="M9 5L15 12L9 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></td></tr>';
                colabtxt += '<tr class="ListArtist"><td onclick="songDetails(' + colab[i].ID + ')">' + colab[i].Artist + '</td></tr>';
                colabtxt += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
            });
        } else {
            colabtxt += '<table id="tbl4" border="0">';
            colabtxt += '<tr class="ListTitle">';
            colabtxt += '<td class="SongCover" rowspan="2"><div style="vertical-align:middle; border-radius: 5px; width:10vw; height: 10vw;"></div>';
            colabtxt += '<td>-</td></tr></table>';
        }
        SpotifyImageSearch();
        $('#songs').html('<p style="font-weight:bold; font-size:var(--font-size-plus)">Solo</p>' + solotxt);
		$('#songs').append('<p style="font-weight:bold; font-size:var(--font-size-plus)">Samenwerking</p>' + colabtxt );
		
    },
    error: function (e) {
        $("#songs").html(e);
    }
});

jQuery.ajax({
    method: "POST",
    url: "../php/artists.php",
    data: {
        functionname: "artistRequests",
        param: listvalue
    },
    success: function (response) {
        result = JSON.parse(response);
        var requesttxt = '';

        if (Object.keys(result).length > 0){
            requesttxt += '<table id="tbl4" border="0">';
            $.each(result, function (i) {                   
                    requesttxt += '<tr class="ListTitle"><td class="SongCover" style="width: 3em" rowspan="2"><div style="vertical-align:middle; border-radius: 5px; width:10vw; height: 10vw;"></div>';
                    requesttxt += '<td>' + result[i].Title + '</td>';
                    requesttxt += '<td rowspan="2" onclick="requestMenu(' + [i] + ')" style="vertical-align:middle; text-align: right;"><svg xmlns="http://www.w3.org/2000/svg" id="song-menu-btn" viewBox="0 0 24 24" fill="none"><path d="M9 5L15 12L9 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></td></tr>';
                    requesttxt += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
            });
        } else {
            requesttxt += '<table id="tbl4" border="0">';               
            requesttxt += '<tr class="ListTitle">';
            requesttxt += '<td class="SongCover" rowspan="2" ><div style="vertical-align:middle; border-radius: 5px; width:10vw; height: 10vw;"></div>';
            requesttxt += '<td>-</td></tr></table>';
        }
        
        $('#request-songs').html(requesttxt);
    },
    error: function (e) {
        $("#request-songs").html(e);
    }
});

const shareIcon = '<svg xmlns="http://www.w3.org/2000/svg" id="share-btn-dtl" viewBox="0 0 24 24" fill="none"><path d="M9 12C9 13.3807 7.88071 14.5 6.5 14.5C5.11929 14.5 4 13.3807 4 12C4 10.6193 5.11929 9.5 6.5 9.5C7.88071 9.5 9 10.6193 9 12Z" stroke-width="1.5"/><path d="M14 6.5L9 10" stroke-width="1.5" stroke-linecap="round"/><path d="M14 17.5L9 14" stroke-width="1.5" stroke-linecap="round"/><path d="M19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5Z" stroke-width="1.5"/><path d="M19 5.5C19 6.88071 17.8807 8 16.5 8C15.1193 8 14 6.88071 14 5.5C14 4.11929 15.1193 3 16.5 3C17.8807 3 19 4.11929 19 5.5Z" stroke-width="1.5"/></svg>';

async function SpotifyImageSearch() {
    const client_id = '206b9ef7be9648f4b249659ad51a728f';
    const client_secret = '7ebfed502f0d4e989d3fe3dc52e177b0';

    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(a => a.json())
    .then(a => {
        fetch('https://api.spotify.com/v1/search?q='+ listvalue + '&type=artist&limit=1', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + a.access_token
            }
        })
        .then(b => b.json())
        .then(b => {
            if (b.artists.items[0].images[0]){
                var followers = b.artists.items[0].followers.total;
				var popularity = b.artists.items[0].popularity;
				var firstImageUrl = b.artists.items[0].images[0].url;
                var artistName = b.artists.items[0].name;
				var artistURL = b.artists.items[0].external_urls.spotify;
				
				const formatter = new Intl.NumberFormat('nl-NL', {
				  notation: 'compact',
				  compactDisplay: 'long'
				});

				const formattedNumber = formatter.format(followers);
				
                $('#artistHeader').html('<img id="artist_cover" src="' + firstImageUrl + '"</img><div id="artistName">'+artistName+'</div>');
				
				artistFollowers = '<div id="followers">'+ followIcon + ' &nbsp; ' + formattedNumber + '</div>';
				share = '<div id="share" onclick="showshares(\''+ window.location.href +'\')">' + shareIcon + '</div>';
				spotify = '<a href="'+artistURL+'"><img id="spotify" src="/img/spotify.png"></a>';
				artistPopularity = '<div id="popular">'+ popularIcon + ' &nbsp; ' + popularity + '</div>';
				
				$('#artist_links').html(artistPopularity + artistFollowers + share + spotify);
				
            } else {
                $('#artistHeader').html('Geen ploatje');
            }
        });
    });
}

function updateMetaContent(property, content) {
	const meta = document.querySelector(`meta[property="${property}"]`);

	if (meta) {
		meta.setAttribute('content', content);
	}
}