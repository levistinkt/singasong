<head>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <script>
        	localStorage.removeItem('Player1');
    		localStorage.removeItem('Player2');
    		localStorage.removeItem('Player3');
    		localStorage.removeItem('Player4');
        </script>
    </header>
	<div id="left"></div>
    <div id="right">
        <div id="right-title">Zoek op nummer</div>
        <div id="right-display"><input type="text" id="search_box"></div>
        <div id="right-numpad">
			<input type="button" id="numpad" name="1" value="1" onClick=addNumber(this); />
			<input type="button" id="numpad" name="2" value="2" onClick=addNumber(this); />
			<input type="button" id="numpad" name="3" value="3" onClick=addNumber(this); />
			<input type="button" id="numpad" name="4" value="4" onClick=addNumber(this); />
			<input type="button" id="numpad" name="5" value="5" onClick=addNumber(this); />
			<input type="button" id="numpad" name="6" value="6" onClick=addNumber(this); />
			<input type="button" id="numpad" name="7" value="7" onClick=addNumber(this); />
			<input type="button" id="numpad" name="8" value="8" onClick=addNumber(this); />
			<input type="button" id="numpad" name="9" value="9" onClick=addNumber(this); />
			<input type="button" id="numpadExtra" name="download" value=&#8681; />
			<input type="button" id="numpad" name="0" value="0" onClick=addNumber(this); />
			<input type="button" id="numpad" name="backspace" value=&#60; onClick=removeNumber(); />
        </div>
		<div id="right-search"><input type="button" id="search_button" value="ZOEK" onClick=QueueSongSearch();></div>
    </div>
    <div id="container-left"></div>
	<div id="container-right"></div>
    <div id="message"></div>
    <script type="text/javascript" src="https://code.jquery.com/jquery-latest.js"></script>    
    <script type="text/javascript" src="queue.js"></script>
</body>