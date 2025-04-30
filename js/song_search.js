document.addEventListener('DOMContentLoaded', function() {
	new Rolldate({
		format: 'YYYY-MM',
		beginYear: 2015,
		endYear: new Date().getFullYear(),
		confirm: function(date) {
			window.location.href = '/pages/song_list.html?date='+date;
        }
	});
});

var stored_searches = JSON.parse(localStorage.getItem('stored_searches')) || [];
text = '';
if (typeof stored_searches !== 'undefined' && stored_searches.length > 0) {
    $.each(stored_searches, function (key, value) {
	    text += '<a href="/pages/song_list.html?'+value.split("|")[0]+'='+value.split("|")[1]+'"><button type="button" class="search-link">'+value.split("|")[1]+'</button></a>';
	});
}

text += '<br>';
$('#last-searches').append(text);

// jQuery.ajax({
    // method: "POST",
    // url: "../php/artists.php",
    // data: {
        // functionname: "top_artists"
    // },
    // success: function (response) {
        // result = JSON.parse(response);
		
		// $('.flipster').hide();
        	
		// text = '<ul>';
		// y = 0;
		
		// $.each(result, function (i) {				
			// text += '<li data-flip-title="artist'+y+'">';
			// text += '<a id="ArtistCoverId'+ i +'" href="/pages/artist_details.html?value=' + result[i].Artist + '"/>';
			// text += '<div id="ArtistName"><a href="/pages/artist_details.html?value=' + result[i].Artist + '"/>' + result[i].Artist + '</a></div>';
			// text += '</li>';

			// y = y + 1;
			
			// updateImage(result[i].Artist, i);
		// });
            
		// text += '</ul>';
			
		// $('.flipster').html(text);
		
		// $(function () {
			// setTimeout(function () {
				// $('.flipster').flipster({
					// style: 'coverflow',
					// spacing: -0.5,
					// loop: true,
					// start: 'center',
					// autoplay: 3000,
					// pauseOnHover: true,
					// touch: true,
					// nav: false,
					// buttons: false
				// });
			// }, 1000);
		// });
    // },
    // error: function (e) {
        // $("#top-artists").html(e);
    // }
// });

jQuery.ajax({
    method: "POST",
    url: "../php/artists.php",
    data: {
        functionname: "top_artists"
    },
    success: function (response) {
        result = JSON.parse(response);
        
		item = ['a','b','c','d','e','f'];
		y = 0;
                
        $.each(result, function (i) {
			$('.artists-carousel').append('<div class="item '+item[y]+'"><div id="artistCoverDiv'+ i +'"/><div id="ArtistName"><a href="/pages/artist_details.html?value=' + result[i].Artist +'">' + result[i].Artist + '</a></div>');
			y = y + 1;
        });
        
		$.each(result, function (i) {
			updateImage(result[i].Artist, i);
        });
    },
    error: function (e) {
        $("#top-artists").html(e);
    }
});

setupCarousel(".artists-carousel",3000);

jQuery.ajax({
    method: "POST",
    url: "../php/songs.php",
    data: {
        functionname: "top_genres"
    },
    success: function (response) {
        result = JSON.parse(response);
        text = '';

        $.each(result, function (i) {
            text += '<a href="/pages/song_list.html?genre=' + result[i].Genre + '"><button type="button" class="search-link">'+ result[i].Genre +'</button></a>';
        });
        text += '<br>';
        $('#top-genres').html(text);
    },
    error: function (e) {
        $("#top-genres").html(e);
    }
});


jQuery.ajax({
	method: "POST",
	url: "../php/songs.php",
	data: {
		functionname: "song_decades"
	},
	success: function (response) {
		result = JSON.parse(response);
		
		// const container = document.getElementById('decades-container');
		// const bubbles = [];

		// const containerRect = container.getBoundingClientRect();
		// const centerX = containerRect.width / 2;
		// const centerY = containerRect.height / 2;

		// $.each(result, function (i) {
			// const decadeDiv = document.createElement('div');
			// decadeDiv.classList.add('decades');

			// const circleDiv = document.createElement('div');
			// circleDiv.classList.add('circle');
			// circleDiv.innerHTML = '<div class="info" onclick="location.href=\'/pages/song_list.html?decade=' + result[i].Decade + '\'"><div class="decade">' + result[i].Decade + '0s</div></div>';

			// decadeDiv.appendChild(circleDiv);
			// container.appendChild(decadeDiv);

			// bubbles.push({
				// element: decadeDiv,
				// x: Math.random() * (containerRect.width - 80),
				// y: Math.random() * (containerRect.height - 100),
				// dx: (Math.random() - 0.5) * 1.5,
				// dy: (Math.random() - 0.5) * 1.5,
				// radius: 40,
			// });
		// });
		
		// function animate() {
		  // bubbles.forEach((b, idx) => {
			// b.x += b.dx;
			// b.y += b.dy;

			// if (b.x <= 0) {
			  // b.x = 0;
			  // b.dx *= -1;
			// }
			// if (b.x + 80 >= containerRect.width) {
			  // b.x = containerRect.width - 80;
			  // b.dx *= -1;
			// }
			// if (b.y <= 0) {
			  // b.y = 0;
			  // b.dy *= -1;
			// }
			// if (b.y + 80 >= containerRect.height) {
			  // b.y = containerRect.height - 80;
			  // b.dy *= -1;
			// }

			// bubbles.forEach((other, jdx) => {
			  // if (idx !== jdx) {
				// const dx = other.x - b.x;
				// const dy = other.y - b.y;
				// const dist = Math.sqrt(dx * dx + dy * dy);
				// if (dist < b.radius * 2) {
				  // // Push away softly
				  // const angle = Math.atan2(dy, dx);
				  // const targetX = b.x + Math.cos(angle) * b.radius * 2;
				  // const targetY = b.y + Math.sin(angle) * b.radius * 2;
				  // const ax = (targetX - other.x) * 0.02;
				  // const ay = (targetY - other.y) * 0.02;
				  // b.dx -= ax;
				  // b.dy -= ay;
				  // other.dx += ax;
				  // other.dy += ay;
				// }
			  // }
			// });
			
			// b.dx += (Math.random() - 0.5) * 0.02;
			// b.dy += (Math.random() - 0.5) * 0.02;
			
			// b.dx = Math.max(Math.min(b.dx, 2), -2);
			// b.dy = Math.max(Math.min(b.dy, 2), -2);
			
			// b.element.style.transform = `translate(${b.x}px, ${b.y}px)`;
		  // });

		  // requestAnimationFrame(animate);
		// }
		
		// animate();
	},
	 error: function (e) {
		$("#decades-container").html(e);
	}
});

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
                // document.getElementById('ArtistCoverId'+id).innerHTML = '<img src="' + artistCover + '">';
				document.getElementById('artistCoverDiv'+id).innerHTML = '<a href="/pages/artist_details.html?value=' + artistName + '"><img style="border-radius: 10px; width:150px; height: 150px;border: solid 2px var(--theme-color);" src="' + artistCover + '"></a>';
            }
        });
    });
}