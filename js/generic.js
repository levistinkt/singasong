// ####
// ## LoggedIn section
// ####
var token = getCookie('token');

if(token){
	isLoggedIn(token);
} else {
	ToggleProfile(false);
}

function isLoggedIn(token){
	jQuery.ajax({
        type: "POST",
        url: '../php/users.php',
        data: {
			functionname: 'checkToken',
			param: token
		},
        success: function (response) {
			var result = JSON.parse(response);
						
			switch (result.login) {
				case 'true':
					$('#shazam-btn').css({"display" : "block"});
					ToggleProfile(true);
				break;
				case 'false':
					ToggleProfile(false);
					eraseCookie('token');
				break;
				case 'error':
					window.location = "/index.html";
				break;
			}	
        },
        error: function () {
            
        }
    });
}

function ToggleProfile(toggle){
	if(toggle){
		footer = document.getElementById("footer");
		if (footer.children[0]){
			footer.children[2].style.display = "";
			footer.children[4].style.display = "none";
			footer.children[5].style.display = "";
		}
	} 
}

// ####
// ## Topper actions
// ####
const SpeechRecog = document.getElementById("SpeechRecog");
if (SpeechRecog !== null){
	SpeechRecog.addEventListener("click", runSpeechRecog);
}

// const search_box = document.getElementById("search_box");
// if(search_box !== null){	
	// search_box.addEventListener("keyup", function(event) {
		// if (event.key === "Enter") {
			// window.location.href = `/pages/result_list.html?value=${search_box.value}`;
		// }
	// });
// }

const input = document.getElementById("search_box");

if(input !== null){

	const artistIcon = '<svg xmlns="http://www.w3.org/2000/svg" id="artistIcon" viewBox="0 0 24 24" fill="none"><path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
	const titleIcon = '<svg xmlns="http://www.w3.org/2000/svg" id="titleIcon" viewBox="0 0 24 24" fill="none"><path d="M10.0909 11.9629L19.3636 8.63087V14.1707C18.8126 13.8538 18.1574 13.67 17.4545 13.67C15.4964 13.67 13.9091 15.096 13.9091 16.855C13.9091 18.614 15.4964 20.04 17.4545 20.04C19.4126 20.04 21 18.614 21 16.855C21 16.855 21 16.8551 21 16.855L21 7.49236C21 6.37238 21 5.4331 20.9123 4.68472C20.8999 4.57895 20.8852 4.4738 20.869 4.37569C20.7845 3.86441 20.6352 3.38745 20.347 2.98917C20.2028 2.79002 20.024 2.61055 19.8012 2.45628C19.7594 2.42736 19.716 2.39932 19.6711 2.3722L19.6621 2.36679C18.8906 1.90553 18.0233 1.93852 17.1298 2.14305C16.2657 2.34086 15.1944 2.74368 13.8808 3.23763L11.5963 4.09656C10.9806 4.32806 10.4589 4.52419 10.0494 4.72734C9.61376 4.94348 9.23849 5.1984 8.95707 5.57828C8.67564 5.95817 8.55876 6.36756 8.50501 6.81203C8.4545 7.22978 8.45452 7.7378 8.45455 8.33743V16.1307C7.90347 15.8138 7.24835 15.63 6.54545 15.63C4.58735 15.63 3 17.056 3 18.815C3 20.574 4.58735 22 6.54545 22C8.50355 22 10.0909 20.574 10.0909 18.815C10.0909 18.815 10.0909 18.8151 10.0909 18.815L10.0909 11.9629Z"/></svg>';
	const dropdown = document.getElementById("search_dropdown");


	const fetchSuggestions = async (query) => {
		try {
			const response = await fetch(`../php/search.php?q=${encodeURIComponent(query)}`);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching suggestions:', error);
			return [];
		}
	};

	const filterResults = async (query) => {
		const results = await fetchSuggestions(query);
		return results;
	};

	dropdown.style.width = input.offsetWidth + 'px';

	const truncateWithEllipsis = (text, maxWidth) => {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		if (context.measureText(text).width <= maxWidth) {
			return text;
		}

		let truncatedText = text;
		while (context.measureText(truncatedText + '...').width > maxWidth) {
			truncatedText = truncatedText.slice(0, -1);
		}

		return truncatedText + '...';
	};

	const updateDropdown = (items) => {
		dropdown.innerHTML = '';
		if (items.length === 0) {
			dropdown.style.display = 'none';
			return;
		}

		const query = input.value.toLowerCase();
		const maxWidth = input.offsetWidth - 16;

		const artistMatches = Array.from(new Set(items
			.filter(item => item.artist && item.artist.toLowerCase().includes(query))
			.map(item => item.artist)))
			.slice(0, 5);

		const titleMatches = Array.from(new Set(items
			.filter(item => item.title && item.title.toLowerCase().includes(query))
			.map(item => item.title)))
			.slice(0, 5);

		if (artistMatches.length > 0) {
			
			artistMatches.forEach(artist => {
				const option = document.createElement('div');
				const truncatedArtist = truncateWithEllipsis(artist, maxWidth);
				option.innerHTML = artistIcon + ' ' + truncatedArtist.replace(new RegExp(`(${query})`, 'gi'), '<strong>$1</strong>');
				option.style.padding = '8px';

			option.addEventListener('click', () => {
				input.value = artist;
				dropdown.style.display = 'none';
				fetchResult(artist);
			});

			dropdown.appendChild(option);
			});
		}

		if (titleMatches.length > 0) {
			const titleHeader = document.createElement('div');
			titleHeader.style.marginTop = '8px';
			dropdown.appendChild(titleHeader);

			titleMatches.forEach(title => {
				const option = document.createElement('div');
				const truncatedTitle = truncateWithEllipsis(title, maxWidth);
				option.innerHTML = titleIcon + ' ' +truncatedTitle.replace(new RegExp(`(${query})`, 'gi'), '<strong>$1</strong>');
				option.style.padding = '8px';

				option.addEventListener('click', () => {
					input.value = title;
					dropdown.style.display = 'none';
					fetchResult(title);
				});

			dropdown.appendChild(option);
			});
		}

		dropdown.style.display = 'block';
	};

	const fetchResult = (query) => {
		window.location.href = `/pages/result_list.html?value=${search_box.value}`;
	};

	input.addEventListener('input', async (e) => {
		const query = e.target.value;
		if (query.trim() === '') {
			dropdown.style.display = 'none';
			return;
		}
		const filtered = await filterResults(query);
		updateDropdown(filtered);
	});

	input.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			const query = input.value.trim();
			if (query) {
				dropdown.style.display = 'none';
				fetchResult(query);
			}
		}
	});

	input.addEventListener('focus', () => {
		dropdown.style.width = input.offsetWidth + 'px';
	});

	document.addEventListener('click', (e) => {
		if (!dropdown.contains(e.target) && e.target !== input) {
			dropdown.style.display = 'none';
		}
	});
}

const shazam = document.getElementById("shazam-btn");
if (shazam !== null){
	shazam.addEventListener("click", startRecording);
}

// ####
// ## Speech Section
// ####
function runSpeechRecog (){
    
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "nl-NL";

    recognition.onerror = function(event) {
        switch (event.error) {
            case 'network':
				showmessage('Netwerk error', 'red', 2000);
                //alert("Netwerk error");
            break;
            case 'not-allowed':
				showmessage('Niet toegestaan', 'red', 2000);
                // alert("Niet toegestaan");
            break;
            case 'service-not-allowed':
				showmessage('Geen toestemming de mic te gebruiken', 'red', 2000);
                // alert("Geen toestemming de mic te gebruiken");
            break;
        }
    };
  
    recognition.onstart = function() {
        document.getElementById("search_box").value = "";
        document.getElementById("SpeechRecog").style.stroke = 'red';
    };

    recognition.onend = function() {
        document.getElementById("SpeechRecog").style.stroke = getComputedStyle(document.documentElement).getPropertyValue('--title');
    };

    recognition.onresult = function(event) {
        var transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                transcript += event.results[i][0].transcript;
            } else{
                transcript += event.results[0][0].transcript;
            }
        }

        if (transcript !== ''){
            document.getElementById("search_box").value = transcript;
			window.location.href = `/pages/result_list.html?value=${transcript}`;
			
            recognition.stop();
        } else {    
            // alert("Geen audio opname");
			showmessage('Geen audio opname', 'orange', 2000);
            recognition.stop();
        }    
    };
    recognition.start();
}
// ####
// ## Shazam section
// ####

let audioContext;
let scriptProcessor;
let audioStream;
let audioChunks = [];
let stopRecordingTimeout;

async function startRecording() {
	document.getElementById("shazam-btn").style.fill = 'red';

	audioChunks = []; 
	audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 44100 });

	audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

	const source = audioContext.createMediaStreamSource(audioStream);

	scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
	scriptProcessor.onaudioprocess = processAudio;

	source.connect(scriptProcessor);
	scriptProcessor.connect(audioContext.destination);

	stopRecordingTimeout = setTimeout(stopAndDetectSong, 5000);
}

function processAudio(event) {

	const inputBuffer = event.inputBuffer.getChannelData(0); 
	const pcmData = new Int16Array(inputBuffer.length);

	for (let i = 0; i < inputBuffer.length; i++) {
		pcmData[i] = Math.max(-32768, Math.min(32767, inputBuffer[i] * 32768));
	}

	audioChunks.push(...pcmData);
}

async function stopAndDetectSong() {
	clearTimeout(stopRecordingTimeout);

	audioStream.getTracks().forEach(track => track.stop());
	scriptProcessor.disconnect();
	audioContext.close();

	const base64Audio = convertToBase64(new Int16Array(audioChunks));

	detectSong(base64Audio);
}

function convertToBase64(pcmData) {
	const byteArray = new Uint8Array(pcmData.buffer);
	let binaryString = "";
	for (let i = 0; i < byteArray.byteLength; i++) {
		binaryString += String.fromCharCode(byteArray[i]);
	}
	return btoa(binaryString);
}

async function detectSong(base64Audio) {
	document.getElementById("shazam-btn").style.fill = getComputedStyle(document.documentElement).getPropertyValue('--title');
	fetch('https://shazam.p.rapidapi.com/songs/detect', {
		method: 'POST',
		headers: {
			'x-rapidapi-key': '9e60ad6c1dmshe192d9ffc0d6e2dp118119jsn6304856097c8',
			'x-rapidapi-host': 'shazam.p.rapidapi.com',
			'Content-Type': 'text/plain'
		},
		body: base64Audio
	})
	.then(a => a.json())
	.then(a => {
		if (a.track){
			var title = a.track.title;
			var artist = a.track.subtitle;
			var cover = a.track.images.background;
			
			navigator.vibrate(200);
			top40Menu(artist,title,cover);
		} else {
			navigator.vibrate(200);
			//alert('geen resultaat gevonden');
			showmessage('Geen resultaat gevonden', 'orange', 2000);
		}
	});		
}
	
// ####
// ## Background overlay
// ####
const bgmenuoverlay = document.getElementById("bgMenuOverlay");
if (bgmenuoverlay !== null){
    bgmenuoverlay.onclick = function(e){
        let song_menu = document.getElementById("song-menu");
        
        if (song_menu !== null){
            if(song_menu.style.display !== "none"){
				song_menu.style.transform = 'translate(0px,600px)';
				song_menu.style.visibility = 'hidden'; 
                bgmenuoverlay.style.display = "none";
                window.removeEventListener("scroll", noscroll);
					var elements = document.getElementsByTagName("input");

				for (var i = 0; i < elements.length; i++) {
					if (elements[i].type == "radio") {
						elements[i].checked = false;
					}
				}
            }
        }
    }
}

const bgmediaoverlay = document.getElementById("bgMediaOverlay");
if (bgmediaoverlay !== null){
    bgmediaoverlay.onclick = function(e){
        let media = document.getElementById("media");
        if(media.innerHTML !== ""){
            media.innerHTML = "";
            bgmediaoverlay.style.display = "none";
        }
    }
}

// ####
// ## Collapsable element Section
// ####
function foldOpen(e){
    if (e.target.type === 'button'){
        var content = e.target.nextElementSibling;
    
        switch (content.style.display) {
        case "block":
            content.style.display = "none";
            break;
        case "none":
           content.style.display = "block";
            break;
        default:
            content.style.display = "block";
        }
    }
}

// ####
// ## Menu position section
// ####
const rowOrder = localStorage.getItem("row-order");
if(rowOrder !== null){
	if (rowOrder === "row") {
		document.body.classList.add("row");
	}
	if (rowOrder === "reverse") {
		document.body.classList.add("reverse");
	}
}

const balkOrder = localStorage.getItem("balk-order");
if(balkOrder !== null){
	if (balkOrder === "footer_topper") {
		document.body.classList.add("footer_topper");
	}
	if (balkOrder === "topper_footer") {
		document.body.classList.add("topper_footer");
	}
} else {
	document.body.classList.add("topper_footer");
}

// ####
// ## Theme Color Section
// ####
const root = document.querySelector(":root");
var theme = localStorage.getItem("theme-color");

if (theme === null){
    theme = 'cyan';
}
updateRootTheme(theme);
function updateRootTheme(value){
	root.style.setProperty("--theme-color", `var(--${value})`);
}


// ####
// ## Dark mode Section
// ####
const darkMode = localStorage.getItem("dark-mode");
if (darkMode === "enabled") {
	document.body.classList.add("dark-mode");
} else {
	document.body.classList.remove("dark-mode");
}

// ####
// ## Font type Section
// ####

var fonttype = localStorage.getItem("font-type");
if (fonttype === null){
    fonttype = 'arial';
}

updateRootType(fonttype);
function updateRootType(value){
	root.style.setProperty("--font", `var(--${value})`);
}

// ####
// ## Font size Section
// ####
const fontsize = localStorage.getItem("font-size");
switch (fontsize) {
    case "xs":
        document.body.classList.add("xs"); 
        break;
    case "s":
        document.body.classList.add("s"); 
        break;
    case "m":
        document.body.classList.add("m"); 
        break;
    case "l":
        document.body.classList.add("l"); 
        break;
    case "xl":
        document.body.classList.add("xl"); 
        break;
    default:
        document.body.classList.add("m"); 
}

// // ####
// // ## Topic reorder Section
// // ####
// const reorderbtn = document.getElementById("reorder-btn");
// if (reorderbtn !== null){      
    // reorderbtn.onclick = function(e){
        // const Handles = document.querySelectorAll('.handle');
        // const listItem = document.querySelectorAll('.collapsible');
        // const jsitems = document.querySelectorAll('.js-item');


        // document.getElementById("bgMenuOverlay").style.display = "none";
        // document.getElementById("side-menu").style.width = "0";

        // listItem.forEach((lst, index) => {
            // lst.style.pointerEvents = 'none';
            // lst.nextElementSibling.style.display = "none";
        // });

        // Handles.forEach(el => {
            // el.style.removeProperty('display');
            // el.style.pointerEvents = 'auto';
        // });            

        // jsitems.forEach(el => {
           // if (el.style.display === 'none'){
                // el.style.display = ''
                // el.style.opacity = '0.5'
            // }
        // });  

        // $('main').append('<br><button type="button" id="savereorder-btn" onclick="savereorder()">Opslaan</button>');
    // }
// }

// ####
// ## Cookies
// ####
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "Expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;domain=.singasong.fun";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// ####
// ## ShowMessage
// ####
function showmessage(message, color, timer){
    if (timer === null){timer = 3000;}
	if (color === null){color = 'orange';}
	        
	$("#media").fadeIn(100);
	$('#media').html('<div id=\"socials\" style=\"background: '+color+';color: white; border:2px solid white; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);position:fixed;width:80%;left:50%;bottom:30%;transform: translate(-50%, -50%);z-index: 10;padding: 10px; border-radius: 10px;text-align: center;\">' + message+ '</div>');
    $("#media").delay(timer).fadeOut(100);
}

function eraseCookie(cname) {   
    document.cookie = cname+'=;Expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=.singasong.fun';
}
// // ####
// // ## Order of elements
// // ####

// function savereorder(){
    
    // let Handles = document.querySelectorAll('.handle');
    // let listItem = document.querySelectorAll('.collapsible');
    // let jsitems = document.querySelectorAll('.js-item');

    // Handles.forEach(el => {
        // el.style.display = 'none';
    // });

    // listItem.forEach((lst, index) => {
        // lst.style.pointerEvents = 'auto';
    // });

    // jsitems.forEach(el => {
       // if (el.style.opacity === '0.5'){
            // el.style.display = 'none'
        // }
    // });  

    // saveStateToLocalStorage();

    // location.reload();
// }


// /***********************
 // *      Variables       *
 // ***********************/

// let listContainer
// let draggableItem
// let childElements = []  
// let pointerStartX
// let pointerStartY
// let itemsGap = 0
// let items = []
// let prevRect = {}

// /***********************
 // *    Helper Functions   *
 // ***********************/

// function getAllItems() {
  // if (!items?.length) {
    // items = Array.from(listContainer.querySelectorAll('.js-item'))
  // }
  // return items
// }

// function getIdleItems() {
  // return getAllItems().filter((item) => item.classList.contains('is-idle'))
// }

// function isItemAbove(item) {
  // return item.hasAttribute('data-is-above')
// }

// function isItemToggled(item) {
  // return item.hasAttribute('data-is-toggled')
// }

// function getChildElements(item) {
  // return Array.from(item.querySelectorAll('.js-child')) 
// }

// /***********************
 // *        Setup        *
 // ***********************/

// function setup() {
  // listContainer = document.querySelector('.js-list')

  // if (!listContainer) return

  // // NEW: Restore order, visibility, and child visibility from local storage
  // restoreStateFromLocalStorage()

  // listContainer.addEventListener('mousedown', dragStart)
  // listContainer.addEventListener('touchstart', dragStart)

  // document.addEventListener('mouseup', dragEnd)
  // document.addEventListener('touchend', dragEnd)

  // document.querySelectorAll('.js-visibility-checkbox').forEach(checkbox => {
    // checkbox.addEventListener('change', toggleVisibility)
  // })

  // document.querySelectorAll('.js-child-toggle').forEach(button => {
    // button.addEventListener('click', toggleChildVisibility)
  // })
// }

// /***********************
 // *     Drag Start      *
 // ***********************/

// function dragStart(e) {
  // if (e.target.classList.contains('js-drag-handle')) {
    // draggableItem = e.target.closest('.js-item')
  // }

  // if (!draggableItem) return

  // pointerStartX = e.clientX || e.touches?.[0]?.clientX
  // pointerStartY = e.clientY || e.touches?.[0]?.clientY

  // setItemsGap()
  // disablePageScroll()
  // initDraggableItem()
  // initItemsState()
  // prevRect = draggableItem.getBoundingClientRect()

  // childElements = getChildElements(draggableItem)

  // document.addEventListener('mousemove', drag)
  // document.addEventListener('touchmove', drag, { passive: false })
// }

// function setItemsGap() {
  // if (getIdleItems().length <= 1) {
    // itemsGap = 0
    // return
  // }

  // const item1 = getIdleItems()[0]
  // const item2 = getIdleItems()[1]

  // const item1Rect = item1.getBoundingClientRect()
  // const item2Rect = item2.getBoundingClientRect()

  // itemsGap = Math.abs(item1Rect.bottom - item2Rect.top)
// }

// function disablePageScroll() {
  // document.body.style.overflow = 'hidden'
  // document.body.style.touchAction = 'none'
  // document.body.style.userSelect = 'none'
// }

// function initItemsState() {
  // getIdleItems().forEach((item, i) => {
    // if (getAllItems().indexOf(draggableItem) > i) {
      // item.dataset.isAbove = ''
    // }
  // })
// }

// function initDraggableItem() {
  // draggableItem.classList.remove('is-idle')
  // draggableItem.classList.add('is-draggable')
// }

// /***********************
 // *        Drag         *
 // ***********************/

// function drag(e) {
  // if (!draggableItem) return

  // e.preventDefault()

  // const clientX = e.clientX || e.touches[0].clientX
  // const clientY = e.clientY || e.touches[0].clientY

  // const pointerOffsetX = clientX - pointerStartX
  // const pointerOffsetY = clientY - pointerStartY

  // draggableItem.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY}px)`

  // childElements.forEach(child => {
    // child.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY}px)`
  // })

  // updateIdleItemsStateAndPosition()
// }

// function updateIdleItemsStateAndPosition() {
  // const draggableItemRect = draggableItem.getBoundingClientRect()
  // const draggableItemY = draggableItemRect.top + draggableItemRect.height / 2

  // // Update state
  // getIdleItems().forEach((item) => {
    // const itemRect = item.getBoundingClientRect()
    // const itemY = itemRect.top + itemRect.height / 2
    // if (isItemAbove(item)) {
      // if (draggableItemY <= itemY) {
        // item.dataset.isToggled = ''
      // } else {
        // delete item.dataset.isToggled
      // }
    // } else {
      // if (draggableItemY >= itemY) {
        // item.dataset.isToggled = ''
      // } else {
        // delete item.dataset.isToggled
      // }
    // }
  // })

  // // Update position
  // getIdleItems().forEach((item) => {
    // if (isItemToggled(item)) {
      // const direction = isItemAbove(item) ? 1 : -1
      // item.style.transform = `translateY(${
        // direction * (draggableItemRect.height + itemsGap)
      // }px)`
    // } else {
      // item.style.transform = ''
    // }
  // })
// }

// /***********************
 // *      Drag End       *
 // ***********************/

// function dragEnd(e) {
    // if (!draggableItem) return

    // applyNewItemsOrder(e)
    // cleanup()
// }

// function applyNewItemsOrder(e) {
    // const reorderedItems = []

    // getAllItems().forEach((item, index) => {
        // if (item === draggableItem) {
        // return
        // }
        // if (!isItemToggled(item)) {
        // reorderedItems[index] = item
        // return
        // }
        // const newIndex = isItemAbove(item) ? index + 1 : index - 1
        // reorderedItems[newIndex] = item
    // })

    // for (let index = 0; index < getAllItems().length; index++) {
        // const item = reorderedItems[index]
        // if (typeof item === 'undefined') {
            // reorderedItems[index] = draggableItem
        // }
    // }

    // reorderedItems.forEach((item) => {
        // listContainer.appendChild(item)
    // })


    // draggableItem.style.transform = ''

    // requestAnimationFrame(() => {
        // const rect = draggableItem.getBoundingClientRect()
        // const yDiff = prevRect.y - rect.y
        // const currentPositionX = e.clientX || e.changedTouches?.[0]?.clientX
        // const currentPositionY = e.clientY || e.changedTouches?.[0]?.clientY

        // const pointerOffsetX = currentPositionX - pointerStartX
        // const pointerOffsetY = currentPositionY - pointerStartY

        // draggableItem.style.transform = `translate(${pointerOffsetX}px, ${
            // pointerOffsetY + yDiff
        // }px)`

        // childElements.forEach(child => {
            // child.style.transform = `translate(${pointerOffsetX}px, ${
                // pointerOffsetY + yDiff
            // }px)`
        // })

        // requestAnimationFrame(() => {
            // unsetDraggableItem()
        // })
    // })
// }

// function cleanup() {
    // itemsGap = 0
    // items = []
    // unsetItemState()
    // enablePageScroll()

    // document.removeEventListener('mousemove', drag)
    // document.removeEventListener('touchmove', drag)
// }

// function unsetDraggableItem() {
    // draggableItem.style = null
    // draggableItem.classList.remove('is-draggable')
    // draggableItem.classList.add('is-idle')

    // childElements.forEach(child => {
        // child.style = null
    // })
    // childElements = []

    // draggableItem = null
// }

// function unsetItemState() {
    // getIdleItems().forEach((item) => {
        // delete item.dataset.isAbove
        // delete item.dataset.isToggled
        // item.style.transform = ''
    // })
// }

// function enablePageScroll() {
    // document.body.style.overflow = ''
    // document.body.style.touchAction = ''
    // document.body.style.userSelect = ''
// }

// /***********************
 // *   Toggle Visibility *
 // ***********************/

// // Handle checkbox visibility toggle
// function toggleVisibility(e) {
    // const item = e.target.closest('.js-item')
    // if (e.target.checked) {
        // item.style.opacity = '1'
    // } else {
        // item.style.opacity = '0.5'
    // }
// }

// /***********************
 // * Toggle Child Visibility
 // ***********************/

// // Handle child visibility toggle
// function toggleChildVisibility(e) {
  // const item = e.target.closest('.js-item')
  // const children = item.querySelectorAll('.js-child')

  // children.forEach(child => {
    // if (child.style.display === 'none') {
      // child.style.display = 'block'
    // } else {
      // child.style.display = 'none'
    // }
  // })
// }

// /***********************
 // * Save and Restore State
 // ***********************/

// // ave the order, visibility, and child visibility state to localStorage
// function saveStateToLocalStorage() {
    // const state = getAllItems().map(item => {
        // const checkbox = item.querySelector('.js-visibility-checkbox')
        // const children = Array.from(item.querySelectorAll('.js-child')).map(child => ({
            // visible: child.style.display !== 'none'
        // }))
        // return {
            // id: item.dataset.id,
            // visible: checkbox.checked,
            // children
        // }
    // })
  
    // var storagename = getstoragename();
  
    // localStorage.setItem(storagename + '_listState', JSON.stringify(state))
// }

// // Restore the order, visibility, and child visibility state from localStorage
// function restoreStateFromLocalStorage() {
  
    // var storagename = getstoragename();
        
    // const savedState = JSON.parse(localStorage.getItem(storagename + '_listState'))
    // if (savedState) {
        // const itemsById = {}
        // getAllItems().forEach(item => {
            // itemsById[item.dataset.id] = item
        // })

        // savedState.forEach(state => {
            // const item = itemsById[state.id]
            // if (item) {
                // listContainer.appendChild(item)
                // const checkbox = item.querySelector('.js-visibility-checkbox')
                // checkbox.checked = state.visible
                // item.style.display = state.visible ? '' : 'none'

            // // Restore child visibility
                // const children = item.querySelectorAll('.js-child')
                // children.forEach((child, index) => {
                // child.style.display = state.children[index].visible ? 'block' : 'none'
                // })
            // }
        // })
    // }
// }

function getstoragename(){
    if (location.pathname.includes('about')) {
        return 'about';
    } else if (location.pathname.includes('artist_details')) {
        return 'artist_details';
    } else if (location.pathname.includes('login')) {
        return 'login';
	}	else if (location.pathname.includes('logout')) {
        return 'logout';
    }  else if (location.pathname.includes('index')) {
        return 'index';
    } else if (location.pathname.includes('settings')) {
        return 'settings';
    } else if (location.pathname.includes('song_details')) {
        return 'song_details';
    } else if (location.pathname.includes('result_list')) {
       return 'result_list';
    } else if (location.pathname.includes('song_search')) {
        return 'song_search';
    } else if (location.pathname.includes('request')) {
        return 'request';
    } else if (location.pathname.includes('profile')) {
        return 'profile';
    } else if (location.pathname.includes('users')) {
        return 'users';
    }
}

// /***********************
 // *      Start Here     *
 // ***********************/

// setup()

