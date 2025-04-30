const urlParam = new URLSearchParams(window.location.search);
const value = urlParam.get('value');
document.getElementById("search_box").value = value;

jQuery.ajax({
    method: "POST",
    url: "../php/artists.php",
    data: {
        functionname: "artistList",
        param: value
    },
    success: function (response){
        result = JSON.parse(response);
        var artistCover = '';
        
        if (Object.keys(result).length > 0){
            artisttxt = '<table id="tbl4" border="0">';
            const searchvalues = [' feat. ',' feat ',' vs. ',' Feat ',' Feat. ',' ft. ',' ft ',' & ', ' en ', ' En ', ' and ', ' Ft. ', ', ',' And'];
            const artists = [];
            
            $.each(result, function (i) {
                if(searchvalues.some(el => result[i].Artist.includes(el))){
                    colabvalue = searchvalues.find(v => result[i].Artist.includes(v));
                    splits = result[i].Artist.split(colabvalue);
                    $.each(splits, function (y){
                        if(searchvalues.some(el => splits[y].includes(el))){
                            colabvalue2 = searchvalues.find(v => splits[y].includes(v));
                            splits2 = splits[y].split(colabvalue2);
                            $.each(splits2, function (z){
                                if(searchvalues.some(el => splits2[z].includes(el))){
                                    colabvalue3 = searchvalues.find(v => splits2[z].includes(v));
                                    splits3 = splits2[z].split(colabvalue3);
                                    $.each(splits3, function (a){
                                        if (!artists.includes(splits3[a])){
                                            if(splits3[a].toLowerCase().includes(value.toLowerCase())){
                                                (async () => {
                                                    artistCover = await GetSpottyImage(splits3[a]);
                                                })()
                                                console.log(artistCover);
                                                artisttxt += '<tr class="ListTitle"><td class="SongCover" rowspan="2" style="width: 3em"><div id="artistCoverDiv'+i+'"></div>';
                                                artisttxt += '<td><a href="/pages/artist_details.html?value=' + splits3[a] + '" style="text-decoration: none;color: var(--font-color);">' + splits3[a] + '</a></td>';
//                                                artisttxt += '<td rowspan="2" style="vertical-align:middle; text-align: right;><svg xmlns="http://www.w3.org/2000/svg" id="song-menu-btn" onclick="artistMenu(\'' + splits3[a] + '\')" viewBox="0 0 24 24" fill="none"><path d="M9 5L15 12L9 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></td></tr>';
                                                artisttxt += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
                                                artists.push(splits3[a]);
                                                updateImage(splits3[a], i);
                                            }
                                        }    
                                    });
                                } else if (!artists.includes(splits2[z])){
                                    if(splits2[z].toLowerCase().includes(value.toLowerCase())){
                                        (async () => {
                                            artistCover = await GetSpottyImage(splits2[z]);
                                        })()
                                        console.log(artistCover);
                                        artisttxt += '<tr class="ListTitle"><td class="SongCover" rowspan="2" style="width: 3em"><div id="artistCoverDiv'+i+'"></div>';
                                        artisttxt += '<td><a href="/pages/artist_details.html?value=' + splits2[z] + '" style="text-decoration: none;color: var(--font-color);">' + splits2[z] + '</a></td>';
//                                        artisttxt += '<td rowspan="2" style="vertical-align:middle; text-align: right;"><svg xmlns="http://www.w3.org/2000/svg" id="song-menu-btn" onclick="artistMenu(\'' + splits2[z] + '\')" viewBox="0 0 24 24" fill="none"><path d="M9 5L15 12L9 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></td></tr>';
                                        artisttxt += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
                                        artists.push(splits2[z]);
                                        updateImage(splits2[z], i);
                                    }
                                }
                            });
                        } else {
                            if (!artists.includes(splits[y])){
                                if(splits[y].toLowerCase().includes(value.toLowerCase())){
                                    artisttxt += '<tr class="ListTitle"><td class="SongCover" rowspan="2" style="width: 3em"><div id="artistCoverDiv'+i+'"></div>';
                                    artisttxt += '<td><a href="/pages/artist_details.html?value=' + splits[y] + '" style="text-decoration: none;color: var(--font-color);">' + splits[y] + '</td></a>';
//                                    artisttxt += '<td rowspan="2" style="vertical-align:middle; text-align: right;"<svg xmlns="http://www.w3.org/2000/svg" id="song-menu-btn" onclick="artistMenu(\'' + splits[y] + '\')" viewBox="0 0 24 24" fill="none"><path d="M9 5L15 12L9 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></td></tr>';
                                    artisttxt += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
                                    artists.push(splits[y]);
                                    updateImage(splits[y], i);
                                }
                            }
                        }
                    });
                } else {
                    if (!artists.includes(result[i].Artist)){
                        artisttxt += '<tr class="ListTitle"><td class="SongCover" rowspan="2" style="width: 3em"><div id="artistCoverDiv'+i+'"></div>';
                        artisttxt += '<td><a href="/pages/artist_details.html?value=' + result[i].Artist + '" style="text-decoration: none;color: var(--font-color);">' + result[i].Artist + '</a></td>';
//                        artisttxt += '<td rowspan="2" style="vertical-align:middle; text-align: right;"><svg xmlns="http://www.w3.org/2000/svg" id="song-menu-btn" onclick="artistMenu(\'' + result[i].Artist + '\')" viewBox="0 0 24 24" fill="none"><path d="M9 5L15 12L9 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></td></tr>';
                        artisttxt += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
                        artists.push(result[i].Artist);
                        updateImage(result[i].Artist, i);
                    }
                }
            });
            $('#result-artists').html(artisttxt);
        }
    },
    error: function (e) {
        $('#result-artists').html(e);
    }
});

jQuery.ajax({
    method: "POST",
    url: "../php/songs.php",
    data: {
        functionname: "SongSearch",
        param1: 'all',
        param2: value
    },
    success: function (response) {
        result = JSON.parse(response);

        text = '<table id="tbl1" border="0" style="margin: 0 auto">';
        
        const duetIconSmall = '<svg id="duetIconSmall" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="none"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z"/><path d="M14.3675 12.0632C14.322 12.1494 14.3413 12.2569 14.4196 12.3149C15.0012 12.7454 15.7209 13 16.5 13C18.433 13 20 11.433 20 9.5C20 7.567 18.433 6 16.5 6C15.7209 6 15.0012 6.2546 14.4196 6.68513C14.3413 6.74313 14.322 6.85058 14.3675 6.93679C14.7714 7.70219 15 8.5744 15 9.5C15 10.4256 14.7714 11.2978 14.3675 12.0632Z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M4.64115 15.6993C5.87351 15.1644 7.49045 15 9.49995 15C11.5112 15 13.1293 15.1647 14.3621 15.7008C15.705 16.2847 16.5212 17.2793 16.949 18.6836C17.1495 19.3418 16.6551 20 15.9738 20H3.02801C2.34589 20 1.85045 19.3408 2.05157 18.6814C2.47994 17.2769 3.29738 16.2826 4.64115 15.6993Z"/><path d="M14.8185 14.0364C14.4045 14.0621 14.3802 14.6183 14.7606 14.7837V14.7837C15.803 15.237 16.5879 15.9043 17.1508 16.756C17.6127 17.4549 18.33 18 19.1677 18H20.9483C21.6555 18 22.1715 17.2973 21.9227 16.6108C21.9084 16.5713 21.8935 16.5321 21.8781 16.4932C21.5357 15.6286 20.9488 14.9921 20.0798 14.5864C19.2639 14.2055 18.2425 14.0483 17.0392 14.0008L17.0194 14H16.9997C16.2909 14 15.5506 13.9909 14.8185 14.0364Z"/></svg>';
		const rapIconSmall = '<svg id="rapIconSmall" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M65.9,21.4c0.2,0.2,0.4,0.4,0.6,0.5c9.6,9.7,9.4,39.8,9.4,41.1c0,0.5-0.5,1-1,1h0c-0.6,0-1-0.5-1-1c0-0.3,0.2-30.6-8.8-39.6  c-1.4-1.4-2.9-2.2-4.6-2.4c-0.3,0-0.5,0-0.8,0c-0.3,0-0.6,0-0.9,0C38.6,21.8,37,50.4,37,50.7c0,0.5-0.5,1-1,1c0,0,0,0,0,0  c-0.6,0-1-0.5-1-1c0-0.3,1.1-20.2,13.1-28.3c-15.7,4-25.7,16.4-26.9,34.8L2.4,75.9c-1.5,1.5-0.2,3.9,1.8,3.6c2.3-0.3,5-1.6,7.9-1.6  c13.9,0,14.4,8.2,30.6,8.2c11.8,0,24.8-12.7,30.9-19.5c17.7-1.5,24.7-5.6,24.7-5.6C98.2,38.6,84.2,24.1,65.9,21.4z M67.9,67  c-6.3,0-13.4-3.3-20.2-6.5c-5.7-2.7-11.1-5.2-15.1-5.2c-5.5,0-7.4,1.1-7.4,1.1c-0.5,0.3-1.1,0.2-1.4-0.3c-0.3-0.5-0.2-1.1,0.3-1.4  c0.2-0.2,2.4-1.5,8.5-1.5c4.4,0,10,2.6,16,5.4c6.6,3.1,13.5,6.3,19.3,6.3c0.6,0,1,0.4,1,1S68.5,67,67.9,67z M63,17  c-0.1-1.8-1.5-3.2-3.3-3.2c-1.8,0-3.2,1.4-3.3,3.1c1.1-0.1,2.2-0.1,3.3-0.1C60.8,16.8,61.9,16.9,63,17z"/></svg>';
		const karaokeIconSmall = '<svg id="karaokeIconSmall" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="karaokeIcon" viewBox="0 0 512 512" xml:space="preserve" fill="none"><style type="text/css"></style><g><polygon points="0.001,437.167 74.823,512 354.337,254.387 257.614,157.664"/><path d="M269.9,143.663l98.428,98.417c34.239,6.143,70.52-2.472,98.869-25.709L295.63,44.804 C272.393,73.153,263.757,109.412,269.9,143.663z"/><path d="M476.317,35.674c-45.989-45.98-119.466-47.463-167.392-4.734l172.135,172.135 C523.789,155.15,522.306,81.663,476.317,35.674z"/></g></svg>';

        $.each(result, function (i) {
            if (result[i].duet){duet = duetIconSmall;}else{duet = '';}
			if (result[i].rap){rap = rapIconSmall;}else{rap = '';}
			if (result[i].karaoke){karaoke = karaokeIconSmall;}else{karaoke = '';}
            text += '<tr class="ListTitle"><td class="SongCover" onclick="songDetails(' + i + ')" rowspan="2" style="width: 3em"><img style="vertical-align:middle; border-radius: 5px; width:10vw; height: 10vw;" src="' + result[i].Cover + '">';
            text += '<td onclick="songDetails(' + i + ')">' + result[i].Title + ' ' + duet + rap + karaoke +'</td>';
            text += '<td rowspan="2" onclick="songMenu(' + i + ')" style="vertical-align:middle; text-align: right;"><svg xmlns="http://www.w3.org/2000/svg" id="song-menu-btn" viewBox="0 0 24 24" fill="none"><path d="M9 5L15 12L9 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></td></tr>';
            text += '<tr class="ListArtist"><td onclick="songDetails(' + i + ')">' + result[i].Artist + '</td></tr>';
            text += '<tr style="height: 10px;"><!– Mimic the margin –></tr>';
        });

        $('#result-songs').html(text);
    },
    error: function (e) {
        $('#result-songs').html(e);
    }
});

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

//######
//### GetSpottyImage
//######
async function updateImage(artistName, id) {
    const client_id = '206b9ef7be9648f4b249659ad51a728f';
    const client_secret = '7ebfed502f0d4e989d3fe3dc52e177b0';

    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(r => r.json())
    .then(r => {
        fetch('https://api.spotify.com/v1/search?q='+ artistName + '&type=artist&limit=1', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + r.access_token
            }
        })
        .then(r => r.json())
        .then(r => {
            if (r.artists.items[0].images[0]){
                var artistCover = r.artists.items[0].images[0].url;
                document.getElementById('artistCoverDiv'+id).innerHTML = '<a href="/pages/artist_details.html?value=' + artistName + '" style="text-decoration: none;"><img style="vertical-align:middle; border-radius: 5px; width:10vw; height: 10vw;" src="' + artistCover + '"></a>';
            }
        });
    });
}
