tokenUpdateResult = getCookie('tokenUpdateResult');

if (tokenUpdateResult) {
	if (tokenUpdateResult === 'OK'){
		showmessage('Actie succesvol uitgevoerd', 'green', 2000);
	} else {
		showmessage(decodeURIComponent(userResult)  + ', probeer het opnieuw', 'orange', 3000);
	}	
	eraseCookie("tokenUpdateResult");
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then(function (reg) {
      console.log("Successfully registered service worker", reg);
    })
    .catch(function (err) {
      console.warn("Error whilst registering service worker", err);
    });
}

function latestSongs(){
    jQuery.ajax({
        method: "POST",
        url: "../php/songs.php",
        data: {
            functionname: "latestSongs"
        },
        success: function (response) {
			result = JSON.parse(response);
			
            text = '<ul>';
            y = 0;
			
			const duetIcon = '<svg id="duetIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="none"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z" stroke="white"/><path d="M14.3675 12.0632C14.322 12.1494 14.3413 12.2569 14.4196 12.3149C15.0012 12.7454 15.7209 13 16.5 13C18.433 13 20 11.433 20 9.5C20 7.567 18.433 6 16.5 6C15.7209 6 15.0012 6.2546 14.4196 6.68513C14.3413 6.74313 14.322 6.85058 14.3675 6.93679C14.7714 7.70219 15 8.5744 15 9.5C15 10.4256 14.7714 11.2978 14.3675 12.0632Z" stroke="white" /><path fill-rule="evenodd" clip-rule="evenodd" d="M4.64115 15.6993C5.87351 15.1644 7.49045 15 9.49995 15C11.5112 15 13.1293 15.1647 14.3621 15.7008C15.705 16.2847 16.5212 17.2793 16.949 18.6836C17.1495 19.3418 16.6551 20 15.9738 20H3.02801C2.34589 20 1.85045 19.3408 2.05157 18.6814C2.47994 17.2769 3.29738 16.2826 4.64115 15.6993Z" stroke="white"/><path d="M14.8185 14.0364C14.4045 14.0621 14.3802 14.6183 14.7606 14.7837V14.7837C15.803 15.237 16.5879 15.9043 17.1508 16.756C17.6127 17.4549 18.33 18 19.1677 18H20.9483C21.6555 18 22.1715 17.2973 21.9227 16.6108C21.9084 16.5713 21.8935 16.5321 21.8781 16.4932C21.5357 15.6286 20.9488 14.9921 20.0798 14.5864C19.2639 14.2055 18.2425 14.0483 17.0392 14.0008L17.0194 14H16.9997C16.2909 14 15.5506 13.9909 14.8185 14.0364Z" stroke="white"/></svg>';
			const rapIcon = '<svg id="rapIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M65.9,21.4c0.2,0.2,0.4,0.4,0.6,0.5c9.6,9.7,9.4,39.8,9.4,41.1c0,0.5-0.5,1-1,1h0c-0.6,0-1-0.5-1-1c0-0.3,0.2-30.6-8.8-39.6  c-1.4-1.4-2.9-2.2-4.6-2.4c-0.3,0-0.5,0-0.8,0c-0.3,0-0.6,0-0.9,0C38.6,21.8,37,50.4,37,50.7c0,0.5-0.5,1-1,1c0,0,0,0,0,0  c-0.6,0-1-0.5-1-1c0-0.3,1.1-20.2,13.1-28.3c-15.7,4-25.7,16.4-26.9,34.8L2.4,75.9c-1.5,1.5-0.2,3.9,1.8,3.6c2.3-0.3,5-1.6,7.9-1.6  c13.9,0,14.4,8.2,30.6,8.2c11.8,0,24.8-12.7,30.9-19.5c17.7-1.5,24.7-5.6,24.7-5.6C98.2,38.6,84.2,24.1,65.9,21.4z M67.9,67  c-6.3,0-13.4-3.3-20.2-6.5c-5.7-2.7-11.1-5.2-15.1-5.2c-5.5,0-7.4,1.1-7.4,1.1c-0.5,0.3-1.1,0.2-1.4-0.3c-0.3-0.5-0.2-1.1,0.3-1.4  c0.2-0.2,2.4-1.5,8.5-1.5c4.4,0,10,2.6,16,5.4c6.6,3.1,13.5,6.3,19.3,6.3c0.6,0,1,0.4,1,1S68.5,67,67.9,67z M63,17  c-0.1-1.8-1.5-3.2-3.3-3.2c-1.8,0-3.2,1.4-3.3,3.1c1.1-0.1,2.2-0.1,3.3-0.1C60.8,16.8,61.9,16.9,63,17z"/></svg>';
			const karaokeIcon = '<svg id="karaokeIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="karaokeIcon" viewBox="0 0 512 512" xml:space="preserve" fill="none"><style type="text/css"></style><g><polygon points="0.001,437.167 74.823,512 354.337,254.387 257.614,157.664"/><path d="M269.9,143.663l98.428,98.417c34.239,6.143,70.52-2.472,98.869-25.709L295.63,44.804 C272.393,73.153,263.757,109.412,269.9,143.663z"/><path d="M476.317,35.674c-45.989-45.98-119.466-47.463-167.392-4.734l172.135,172.135 C523.789,155.15,522.306,81.663,476.317,35.674z"/></g></svg>';
                
            $.each(result, function (i) {
				if (result[i].duet) {duetInfo = '<div id="duetDiv">'+duetIcon+'</div>';} else {duetInfo = '<div id="duetDiv"></div>';}
				if (result[i].rap) {rapInfo = '<div id="rapDiv">'+rapIcon+'</div>';} else {rapInfo = '<div id="rapDiv"></div>';}
				if (result[i].karaoke) {karaokeInfo = '<div id="karaokeDiv">'+karaokeIcon+'</div>';} else {karaokeInfo = '<div id="karaokeDiv"></div>';}

                text += '<li data-flip-title="song'+y+'">';
				text += '<a href="/pages/song_details.html?value=' + i +'" style="text-decoration: none;"><img src="'+ result[i].Cover +'"></a>';
				text += '<div id="ArtistTitle"><a href="/pages/song_details.html?value=' + i +'">' + result[i].Artist + '<br>' + result[i].Title + '</a></div>'+ duetInfo + rapInfo + karaokeInfo + '</div>';
				text += '</li>';

                y = y + 1;
            });
            
            text += '</ul>';
			
			$('.flipster').html(text);
						
			$('.flipster').flipster({
				style: 'coverflow',
				spacing: -0.5,
				loop: true,
				autoplay: 3000,
				start: 'center',
				pauseOnHover: true,
				touch: true,
				keyboard: true,
				nav: false,
				buttons: false
			});
			
        },
        error: function (e) {
            $("#recent-songs").html(e);
        }
    });
}


function latestRequests(){
    jQuery.ajax({
        method: "POST",
        url: "../php/songs.php",
        data: {
            functionname: "latestRequests"
        },
        success: function (response) {
            result = JSON.parse(response);
			
			const container = document.getElementById('requests-container');
			const bubbles = [];

			const containerRect = container.getBoundingClientRect();
			const centerX = containerRect.width / 2;
			const centerY = containerRect.height / 2;

			$.each(result, function (i) {
			  const requestDiv = document.createElement('div');
			  requestDiv.classList.add('request');

			  const circleDiv = document.createElement('div');
			  circleDiv.classList.add('circle');
			  circleDiv.style.setProperty('--progress-angle', `${(result[i].Progress / 100) * 360}deg`);
			  circleDiv.innerHTML = '<div class="info" onclick="requestMenu('+result[i].ID+')"><div class="title">'+ result[i].Title +'</div><div class="artist">'+ result[i].Artist +'</div></div>';
			  requestDiv.appendChild(circleDiv);
			  container.appendChild(requestDiv);

			  bubbles.push({
				element: requestDiv,
				x: Math.random() * (containerRect.width - 120),
				y: Math.random() * (containerRect.height - 120),
				dx: (Math.random() - 0.5) * 1.5,
				dy: (Math.random() - 0.5) * 1.5,
				radius: 48,
			  });
			});
			
			function animate() {
			  bubbles.forEach((b, idx) => {
				b.x += b.dx;
				b.y += b.dy;

				if (b.x <= 0) {
				  b.x = 0;
				  b.dx *= -1;
				}
				if (b.x + 120 >= containerRect.width) {
				  b.x = containerRect.width - 120;
				  b.dx *= -1;
				}
				if (b.y <= 0) {
				  b.y = 0;
				  b.dy *= -1;
				}
				if (b.y + 120 >= containerRect.height) {
				  b.y = containerRect.height - 120;
				  b.dy *= -1;
				}

				bubbles.forEach((other, jdx) => {
				  if (idx !== jdx) {
					const dx = other.x - b.x;
					const dy = other.y - b.y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < b.radius * 2) {
					  const angle = Math.atan2(dy, dx);
					  const targetX = b.x + Math.cos(angle) * b.radius * 2;
					  const targetY = b.y + Math.sin(angle) * b.radius * 2;
					  const ax = (targetX - other.x) * 0.02;
					  const ay = (targetY - other.y) * 0.02;
					  b.dx -= ax;
					  b.dy -= ay;
					  other.dx += ax;
					  other.dy += ay;
					}
				  }
				});
				
				b.dx += (Math.random() - 0.5) * 0.02;
				b.dy += (Math.random() - 0.5) * 0.02;
				
				b.dx = Math.max(Math.min(b.dx, 2), -2);
				b.dy = Math.max(Math.min(b.dy, 2), -2);
				
				b.element.style.transform = `translate(${b.x}px, ${b.y}px)`;
			  });

			  requestAnimationFrame(animate);
			}
			
			animate();
        },
         error: function (e) {
			$("#latest-requests").html(e);
        }
    });
}

function gotoRequests(){
	usertoken = getCookie('token');	
	
	if (usertoken){
		window.location.href = '/pages/request.html';
	} else {
		window.location.href = '/pages/login.html';
	}
}

latestSongs();
latestRequests();