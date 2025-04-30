<?php

if(isset($_POST["functionname"])){
    switch ($_POST["functionname"]) {
        case 'LoadSongList':
            LoadSongList();
        break;
        case 'SongSearch':
            $param1 = $_POST["param1"];
            $param2 = $_POST["param2"];
            SongSearch($param1, $param2);
        break;
		case 'getRelatedSongs':
            $param1 = $_POST["param1"];
            $param2 = $_POST["param2"];
			$param3 = $_POST["param3"];
            getRelatedSongs($param1, $param2, $param3);
        break;
        case 'SongDetails':
			$param1 = $_POST["param1"];
            $param2 = $_POST["param2"];
            SongDetails($param1, $param2);
        break;
        case 'GetAllSongs':
            GetAllSongs();
        break;
        case 'latestSongs':
            latestSongs();
        break;
        case 'latestRequests':
            latestRequests();
        break;
        case 'requestDetails':
            $param = $_POST["param"];
            requestDetails($param);
        break;
		case 'addFavourite':
            $param = $_POST["param"];
            addFavourite($param);
        break;
		case 'removeFavourite':
            $param = $_POST["param"];
            removeFavourite($param);
        break;
		case 'requestList':
            requestList();
        break;
		case 'ActiveRequestList':
			ActiveRequestList();
		break;
        case 'top_genres':
            top_genres();
        break;
        case 'song_languages':
            song_languages();
        break;
        case 'song_decades':
            song_decades();
        break;
        case 'song_edition':
            song_edition();
        break;
    }
}

function LoadSongList() {
    
    $FileList = array();
    $Files = glob("../songs/*/*.{jpg,jpeg,jfif,gif,png,tiff,txt}", GLOB_BRACE);
    sort($Files);
    $s = 0;

    for ($i = 0; $i < count($Files); $i++) {
        if (preg_match('(txt)', $Files[$i]) === 1) {
            $lines = array_slice(file($Files[$i]), 0, 20);
            for ($y = 0; $y < count($lines); $y++) {
                if (strpos($lines[$y],'#ARTIST') !== false) {$FileList[$s]['Artist'] = preg_replace("/\r|\n/", "", substr($lines[$y], 8, strlen($lines[$y])));}
                if (strpos($lines[$y],'#TITLE') !== false) {$FileList[$s]['Title'] = preg_replace("/\r|\n/", "", substr($lines[$y], 7, strlen($lines[$y])));}
                if (strpos($lines[$y],'#YEAR') !== false) {$FileList[$s]['Year'] = preg_replace("/\r|\n/", "", substr($lines[$y], 6, strlen($lines[$y])));}
                if (strpos($lines[$y],'#LANGUAGE') !== false) {$FileList[$s]['Language'] = preg_replace("/\r|\n/", "", substr($lines[$y], 10, strlen($lines[$y])));}
                if (strpos($lines[$y],'#EDITION') !== false) {$FileList[$s]['Edition'] = preg_replace("/\r|\n/", "", substr($lines[$y], 9, strlen($lines[$y])));}
                if (strpos($lines[$y],'#COMMENT') !== false) {$FileList[$s]['Comment'] = preg_replace("/\r|\n/", "", substr($lines[$y], 9, strlen($lines[$y])));}
                if (strpos($lines[$y],'#GENRE') !== false) {$FileList[$s]['Genre'] = preg_replace("/\r|\n/", "", substr($lines[$y], 7, strlen($lines[$y])));}
                if (strpos($lines[$y],'#YOUTUBE') !== false) {$FileList[$s]['Youtube'] = preg_replace("/\r|\n/", "", substr($lines[$y], 9, strlen($lines[$y])));}
                if (strpos($lines[$y],'#SPOTIFY') !== false) {$FileList[$s]['Spotify'] = preg_replace("/\r|\n/", "", substr($lines[$y], 9, strlen($lines[$y])));}
                if (strpos($lines[$y],'#DATE') !== false) {$FileList[$s]['Date'] = preg_replace("/\r|\n/", "", substr($lines[$y], 6, strlen($lines[$y])));}       
            } $s++;
        } else {
            $FileList[$s]['Cover'] = preg_replace("/\r|\n/", "", $Files[$i]);
        }
    }
    
    $db = new PDO('sqlite:../db/DB.sqlite');

    try{
        $query1 = "DELETE FROM songs";
        $db->exec($query1);
        
        $query2 = "UPDATE sqlite_sequence SET seq = 0 WHERE name = 'songs'";
        $db->exec($query2);
        
        for ($j = 0; $j < count($FileList); $j++) { 
            if (isset($FileList[$j]['Cover'])){$Cover = $FileList[$j]['Cover'];}else{$Cover = "";};
            if (isset($FileList[$j]['Artist'])){$Artist = $FileList[$j]['Artist'];}else{$Artist = "";};
            if (isset($FileList[$j]['Title'])){$Title = $FileList[$j]['Title'];}else{$Title = "";};
            if (isset($FileList[$j]['Language'])){$Language = $FileList[$j]['Language'];}else{$Language = "";};
            if (isset($FileList[$j]['Year'])){$Year = $FileList[$j]['Year'];}else{$Year = "";};
            if (isset($FileList[$j]['Genre'])){$Genre = $FileList[$j]['Genre'];}else{$Genre = "";};
            if (isset($FileList[$j]['Edition'])){$Edition = $FileList[$j]['Edition'];}else{$Edition = "";};
            if (isset($FileList[$j]['Comment'])){$Comment = $FileList[$j]['Comment'];}else{$Comment = "";};
            if (isset($FileList[$j]['Youtube'])){$Youtube = $FileList[$j]['Youtube'];}else{$Youtube = "";};
            if (isset($FileList[$j]['Spotify'])){$Spotify = $FileList[$j]['Spotify'];}else{$Spotify = "";};
            if (isset($FileList[$j]['Date'])){$Date = $FileList[$j]['Date'];}else{$Date = "";};			
            $artist_title = base64_encode(encodeURIComponent(strtoupper($Artist).'_'.strtoupper($Title).'_'.strtoupper($Comment)));
						
            $query3 = "REPLACE INTO songs (Cover, Artist, Title, Artist_Title, Language, Year, Genre, Edition, Comment, Youtube, Spotify, Date) VALUES ("
            .$db->quote($Cover).", "
            .$db->quote($Artist).", "
            .$db->quote($Title).", "
            .$db->quote($artist_title).", "
            .$db->quote($Language).", "
            .$db->quote($Year).", "
            .$db->quote($Genre).", "
            .$db->quote($Edition).", "
            .$db->quote($Comment).", "
            .$db->quote($Youtube).", "
            .$db->quote($Spotify).", "
            .$db->quote($Date).");";

            $db->exec($query3); 	
        }
    } catch (Exception $e) {
        echo json_encode($e->getMessage());
    }
    echo json_encode($j);
}

function GetAllSongs() {
      
    $output = [];
    
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
   
        $query = "SELECT * FROM songs ";
                
        $stmt = $db->query($query);
            
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output[$row['id']]['ID'] = $row['id'];
            $output[$row['id']]['Cover'] = $row['Cover'];
            $output[$row['id']]['Artist'] = $row['Artist'];
            $output[$row['id']]['Title'] = $row['Title'];
            $output[$row['id']]['Language'] = $row['Language'];
            $output[$row['id']]['Genre'] = $row['Genre'];
            $output[$row['id']]['Edition'] = $row['Edition'];
            $output[$row['id']]['Youtube'] = $row['Youtube'];
            $output[$row['id']]['Spotify'] = $row['Spotify'];
            $output[$row['id']]['Comment'] = $row['Comment'];

            if(isset($row['Comment'])){
                if (stristr(trim(strtolower($row['Comment'])), "Duet")) {$output[$row['id']]['duet'] = true;} else {$output[$row['id']]['duet'] = false;}
                if (stristr(trim(strtolower($row['Comment'])), "Rap")) {$output[$row['id']]['rap'] = true;} else {$output[$row['id']]['rap'] = false;}
				if (stristr(trim(strtolower($row['Comment'])), "karoake")) {$output[$row['id']]['karaoke'] = true;} else {$output[$row['id']]['karaoke'] = false;}
            }
        }
    } catch(PDOException $e){
        echo json_encode($e->getMessage());
    } 
    echo json_encode($output);
}

function SongSearch($param1, $param2) {
      
    $output = [];
	
	try{
        $db = new PDO('sqlite:../db/DB.sqlite');
   
        switch ($param1){
            case 'artist':
				$query[0] = "WITH song_versions AS ("
				."SELECT *, LOWER(COALESCE(comment, '')) AS comment_lower "
				."FROM songs "
				."WHERE Artist LIKE '%$param2%'"
				."),"
				."flagged AS ("
				."SELECT *,"
				."CASE "
				."WHEN comment_lower LIKE '%karaoke%' OR comment_lower LIKE '%duet%' "
				."THEN 1 ELSE 0 "
				."END AS is_flagged "
				."FROM song_versions"
				."),"
				."clean_exists AS ("
				."SELECT title, artist "
				."FROM flagged "
				."GROUP BY title, artist "
				."HAVING SUM(CASE WHEN is_flagged = 0 THEN 1 ELSE 0 END) > 0"
				.") "
				."SELECT DISTINCT f.id, f.cover, f.title, f.artist, f.artist_title, f.language, f.year, f.genre, f. edition, f.youtube, f.Spotify, f.comment "
				."FROM flagged f "
				."LEFT JOIN clean_exists ce ON f.title = ce.title AND f.artist = ce.artist "
				."WHERE ce.title IS NULL OR f.is_flagged = 0";
            break;
			case 'genre':
                $query[0] = "WITH song_versions AS ("
				."SELECT *, LOWER(COALESCE(comment, '')) AS comment_lower "
				."FROM songs "
				."WHERE Genre LIKE '%$param2%'"
				."),"
				."flagged AS ("
				."SELECT *,"
				."CASE "
				."WHEN comment_lower LIKE '%karaoke%' OR comment_lower LIKE '%duet%' "
				."THEN 1 ELSE 0 "
				."END AS is_flagged "
				."FROM song_versions"
				."),"
				."clean_exists AS ("
				."SELECT title, artist "
				."FROM flagged "
				."GROUP BY title, artist "
				."HAVING SUM(CASE WHEN is_flagged = 0 THEN 1 ELSE 0 END) > 0"
				.") "
				."SELECT DISTINCT f.id, f.cover, f.title, f.artist, f.artist_title, f.language, f.year, f.genre, f. edition, f.youtube, f.Spotify, f.comment "
				."FROM flagged f "
				."LEFT JOIN clean_exists ce ON f.title = ce.title AND f.artist = ce.artist "
				."WHERE ce.title IS NULL OR f.is_flagged = 0";
            break;
            case 'lang':
				$query[0] = "WITH song_versions AS ("
				."SELECT *, LOWER(COALESCE(comment, '')) AS comment_lower "
				."FROM songs "
				."WHERE Language LIKE '%$param2%'"
				."),"
				."flagged AS ("
				."SELECT *,"
				."CASE "
				."WHEN comment_lower LIKE '%karaoke%' OR comment_lower LIKE '%duet%' "
				."THEN 1 ELSE 0 "
				."END AS is_flagged "
				."FROM song_versions"
				."),"
				."clean_exists AS ("
				."SELECT title, artist "
				."FROM flagged "
				."GROUP BY title, artist "
				."HAVING SUM(CASE WHEN is_flagged = 0 THEN 1 ELSE 0 END) > 0"
				.") "
				."SELECT DISTINCT f.id, f.cover, f.title, f.artist, f.artist_title, f.language, f.year, f.genre, f. edition, f.youtube, f.Spotify, f.comment "
				."FROM flagged f "
				."LEFT JOIN clean_exists ce ON f.title = ce.title AND f.artist = ce.artist "
				."WHERE ce.title IS NULL OR f.is_flagged = 0";
			break;
            case 'decade':
                $query[0] = "WITH song_versions AS ("
				."SELECT *, LOWER(COALESCE(comment, '')) AS comment_lower "
				."FROM songs "
				."WHERE Year LIKE '%$param2%'"
				."),"
				."flagged AS ("
				."SELECT *,"
				."CASE "
				."WHEN comment_lower LIKE '%karaoke%' OR comment_lower LIKE '%duet%' "
				."THEN 1 ELSE 0 "
				."END AS is_flagged "
				."FROM song_versions"
				."),"
				."clean_exists AS ("
				."SELECT title, artist "
				."FROM flagged "
				."GROUP BY title, artist "
				."HAVING SUM(CASE WHEN is_flagged = 0 THEN 1 ELSE 0 END) > 0"
				.") "
				."SELECT DISTINCT f.id, f.cover, f.title, f.artist, f.artist_title, f.language, f.year, f.genre, f. edition, f.youtube, f.Spotify, f.comment "
				."FROM flagged f "
				."LEFT JOIN clean_exists ce ON f.title = ce.title AND f.artist = ce.artist "
				."WHERE ce.title IS NULL OR f.is_flagged = 0";
            break;
            case 'edition':
                $query[0] = "WITH song_versions AS ("
				."SELECT *, LOWER(COALESCE(comment, '')) AS comment_lower "
				."FROM songs "
				."WHERE Edition LIKE '%$param2%'"
				."),"
				."flagged AS ("
				."SELECT *,"
				."CASE "
				."WHEN comment_lower LIKE '%karaoke%' OR comment_lower LIKE '%duet%' "
				."THEN 1 ELSE 0 "
				."END AS is_flagged "
				."FROM song_versions"
				."),"
				."clean_exists AS ("
				."SELECT title, artist "
				."FROM flagged "
				."GROUP BY title, artist "
				."HAVING SUM(CASE WHEN is_flagged = 0 THEN 1 ELSE 0 END) > 0"
				.") "
				."SELECT DISTINCT f.id, f.cover, f.title, f.artist, f.artist_title, f.language, f.year, f.genre, f. edition, f.youtube, f.Spotify, f.comment "
				."FROM flagged f "
				."LEFT JOIN clean_exists ce ON f.title = ce.title AND f.artist = ce.artist "
				."WHERE ce.title IS NULL OR f.is_flagged = 0";
            break;
            case 'year':
                $query[0] = "WITH song_versions AS ("
				."SELECT *, LOWER(COALESCE(comment, '')) AS comment_lower "
				."FROM songs "
				."WHERE Year LIKE '%$param2%'"
				."),"
				."flagged AS ("
				."SELECT *,"
				."CASE "
				."WHEN comment_lower LIKE '%karaoke%' OR comment_lower LIKE '%duet%' "
				."THEN 1 ELSE 0 "
				."END AS is_flagged "
				."FROM song_versions"
				."),"
				."clean_exists AS ("
				."SELECT title, artist "
				."FROM flagged "
				."GROUP BY title, artist "
				."HAVING SUM(CASE WHEN is_flagged = 0 THEN 1 ELSE 0 END) > 0"
				.") "
				."SELECT DISTINCT f.id, f.cover, f.title, f.artist, f.artist_title, f.language, f.year, f.genre, f. edition, f.youtube, f.Spotify, f.comment "
				."FROM flagged f "
				."LEFT JOIN clean_exists ce ON f.title = ce.title AND f.artist = ce.artist "
				."WHERE ce.title IS NULL OR f.is_flagged = 0";
            break;
            case 'date':
                $query[0] = "WITH song_versions AS ("
				."SELECT *, LOWER(COALESCE(comment, '')) AS comment_lower "
				."FROM songs "
				."WHERE date >= '$param2'"
				."),"
				."flagged AS ("
				."SELECT *,"
				."CASE "
				."WHEN comment_lower LIKE '%karaoke%' OR comment_lower LIKE '%duet%' "
				."THEN 1 ELSE 0 "
				."END AS is_flagged "
				."FROM song_versions"
				."),"
				."clean_exists AS ("
				."SELECT title, artist "
				."FROM flagged "
				."GROUP BY title, artist "
				."HAVING SUM(CASE WHEN is_flagged = 0 THEN 1 ELSE 0 END) > 0"
				.") "
				."SELECT DISTINCT f.id, f.cover, f.title, f.artist, f.artist_title, f.language, f.year, f.genre, f. edition, f.youtube, f.Spotify, f.comment "
				."FROM flagged f "
				."LEFT JOIN clean_exists ce ON f.title = ce.title AND f.artist = ce.artist "
				."WHERE ce.title IS NULL OR f.is_flagged = 0";
            break;
            case 'comment':
				if ($param2 == 'Rap'){
					$query[0] = "WITH song_versions AS ("
					."SELECT *, LOWER(COALESCE(comment, '')) AS comment_lower "
					."FROM songs "
					."WHERE Comment = '$param2'"
					."),"
					."flagged AS ("
					."SELECT *,"
					."CASE "
					."WHEN comment_lower LIKE '%karaoke%' OR comment_lower LIKE '%duet%' "
					."THEN 1 ELSE 0 "
					."END AS is_flagged "
					."FROM song_versions"
					."),"
					."clean_exists AS ("
					."SELECT title, artist "
					."FROM flagged "
					."GROUP BY title, artist "
					."HAVING SUM(CASE WHEN is_flagged = 0 THEN 1 ELSE 0 END) > 0"
					.") "
					."SELECT DISTINCT f.id, f.cover, f.title, f.artist, f.artist_title, f.language, f.year, f.genre, f. edition, f.youtube, f.Spotify, f.comment "
					."FROM flagged f "
					."LEFT JOIN clean_exists ce ON f.title = ce.title AND f.artist = ce.artist "
					."WHERE ce.title IS NULL OR f.is_flagged = 0";
				} else {
					$query[0] = "SELECT * FROM songs WHERE "
					. "Comment LIKE '%$param2%'";
				}
            break;
            case 'favourite':
				if (isset($_COOKIE['token'])){
					$token = $_COOKIE['token'];
					$favQuery = "SELECT favourites FROM users WHERE token = '$token'";
                    $i = 0;
                    
					$stmt = $db->query($favQuery);
                    
                    while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                        $dbFavourites = explode(",", $row['favourites']);
                    }
                    foreach ($dbFavourites as $key => $val){
                        $query[$i] = "SELECT * FROM songs WHERE Artist_Title = '$val'";
                        $i ++;
                    }
				} else {
					$array = json_decode($param2);
					if (!empty($array)){
						$i = 0;
						foreach ($array as $key => $val){
							$query[$i] = "SELECT * FROM songs WHERE Artist_Title = '$val'";
							$i ++;
						}
					} else {
						$query[0] = "SELECT * FROM songs WHERE Artist_Title = ''";
					}	
				}
            break;
            case 'recents':
                $array = json_decode($param2);
                if (!empty($array)){
                    $i = 0;
                    foreach ($array as $key => $val){
                        $query[$i] = "SELECT * FROM songs WHERE Artist_Title = '$val'";
                        $i ++;
                    }
                } else {
                    $query[0] = "SELECT * FROM songs WHERE Artist_Title = ''";
                }
                break;
            default:
                $query[0] = "WITH song_versions AS ("
				."SELECT *, LOWER(COALESCE(comment, '')) AS comment_lower "
				."FROM songs "
				."WHERE id LIKE '%$param2%' OR Artist LIKE '%$param2%' OR Title LIKE '%$param2%' "
                ."OR Language LIKE '%$param2%' OR Year LIKE '%$param2%' OR Genre LIKE '%$param2%' "
                ."OR Edition LIKE '%$param2%' OR Comment LIKE '%$param2%'"
				."),"
				."flagged AS ("
				."SELECT *,"
				."CASE "
				."WHEN comment_lower LIKE '%karaoke%' OR comment_lower LIKE '%duet%' "
				."THEN 1 ELSE 0 "
				."END AS is_flagged "
				."FROM song_versions"
				."),"
				."clean_exists AS ("
				."SELECT title, artist "
				."FROM flagged "
				."GROUP BY title, artist "
				."HAVING SUM(CASE WHEN is_flagged = 0 THEN 1 ELSE 0 END) > 0"
				.") "
				."SELECT DISTINCT f. id, f. cover, f.title, f.artist, f.artist_title, f.language, f.year, f.genre, f. edition, f.youtube, f.Spotify, f.comment "
				."FROM flagged f "
				."LEFT JOIN clean_exists ce ON f.title = ce.title AND f.artist = ce.artist "
				."WHERE ce.title IS NULL OR f.is_flagged = 0";
            break;
        }
                
       for ($i = 0; $i < count($query); $i++) {
            
			$stmt = $db->query($query[$i]);
			           
            while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                $output[$row['id']]['ID'] = $row['id'];
                $output[$row['id']]['Cover'] = $row['Cover'];
                $output[$row['id']]['Artist'] = $row['Artist'];
                $output[$row['id']]['Title'] = $row['Title'];
                $output[$row['id']]['Artist_Title'] = $row['Artist_Title'];
                $output[$row['id']]['Language'] = $row['Language'];
                $output[$row['id']]['Genre'] = $row['Genre'];
                $output[$row['id']]['Edition'] = $row['Edition'];
                $output[$row['id']]['Youtube'] = $row['Youtube'];
                $output[$row['id']]['Spotify'] = $row['Spotify'];
                $output[$row['id']]['Comment'] = $row['Comment'];

                if(isset($row['Comment'])){
                    if (stristr(trim(strtolower($row['Comment'])), "Duet")) {$output[$row['id']]['duet'] = true;} else {$output[$row['id']]['duet'] = false;}
                    if (stristr(trim(strtolower($row['Comment'])), "Rap")) {$output[$row['id']]['rap'] = true;} else {$output[$row['id']]['rap'] = false;}
					if (stristr(trim(strtolower($row['Comment'])), "karaoke")) {$output[$row['id']]['karaoke'] = true;} else {$output[$row['id']]['karaoke'] = false;}
                }
            }
        }
    } catch(PDOException $e){
        echo json_encode($e->getMessage());
    } 

    echo json_encode($output);
}


function SongDetails($param1, $param2) {
	
	try{
		switch ($param1){
			case 'song':
				$query = "SELECT * FROM songs WHERE id = '$param2'";
			break;
			case 'request':
				$query = "SELECT * FROM songs WHERE Artist_Title = '$param2'";
			break;
			case 'top40':
				$query = "SELECT * FROM songs WHERE Artist_Title = '$param2'";
			break;
		}
    
		$output = [];	
		
		$db = new PDO('sqlite:../db/DB.sqlite');

        $stmt = $db->query($query);
        
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output['ID'] = $row['id'];
            $output['Cover'] = $row['Cover'];
            $output['Artist'] = $row['Artist'];
            $output['Title'] = $row['Title'];
            $output['Artist_Title'] = $row['Artist_Title'];
            $output['Language'] = $row['Language'];
            $output['Year'] = $row['Year'];
            $output['Genre'] = $row['Genre'];
            $output['Edition'] = $row['Edition'];
            $output['Youtube'] = $row['Youtube'];
            $output['Spotify'] = $row['Spotify'];
            $output['Comment'] = $row['Comment'];

            if(isset($row['Comment'])){
                if (stristr(trim(strtolower($row['Comment'])), "duet")) {$output['duet'] = true;} else {$output['duet'] = false;}
                if (stristr(trim(strtolower($row['Comment'])), "rap")) {$output['rap'] = true;} else {$output['rap'] = false;}
				if (stristr(trim(strtolower($row['Comment'])), "karaoke")) {$output['karaoke'] = true;} else {$output['karaoke'] = false;}
                
            }
        }
    } catch(PDOException $e){
        echo json_encode($e->getMessage());
    } 
    echo json_encode($output);
}

function getRelatedSongs($param1, $param2, $param3) {
	
	try{
		
		$query = "SELECT * FROM songs "
			."WHERE Artist = '$param1' "
			."AND Title = '$param2' "
			."AND Artist_Title <> '$param3'";
			
		$db = new PDO('sqlite:../db/DB.sqlite');

        $stmt = $db->query($query);
		
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output[$row['id']]['ID'] = $row['id'];
            $output[$row['id']]['Cover'] = $row['Cover'];
            $output[$row['id']]['Artist'] = $row['Artist'];
            $output[$row['id']]['Title'] = $row['Title'];
            $output[$row['id']]['Artist_Title'] = $row['Artist_Title'];
            $output[$row['id']]['Language'] = $row['Language'];
            $output[$row['id']]['Year'] = $row['Year'];
            $output[$row['id']]['Genre'] = $row['Genre'];
            $output[$row['id']]['Edition'] = $row['Edition'];
            $output[$row['id']]['Youtube'] = $row['Youtube'];
            $output[$row['id']]['Spotify'] = $row['Spotify'];
            $output[$row['id']]['Comment'] = $row['Comment'];
			
			if(isset($row['Comment'])){
				if(preg_match('/(karaoke)/i', trim(strtolower($row['Comment']))) && preg_match('/(duet)/i', trim(strtolower($row['Comment'])))) {
					$output[$row['id']]['karaoke_duet'] = true;
				} else {
					if(preg_match('/(karaoke)/i', trim(strtolower($row['Comment'])))) {$output[$row['id']]['karaoke'] = true;}
					if(preg_match('/(duet)/i', trim(strtolower($row['Comment'])))) {$output[$row['id']]['duet'] = true;}
				}
			}
        }
		
		
    } catch(PDOException $e){
        echo json_encode($e->getMessage());
    } 
    echo json_encode($output);
}

function latestSongs(){

    $FileList = array();
    $Files = glob("../songs/*/*.{txt}", GLOB_BRACE);
    usort($Files, function($a, $b) {
        return filemtime($b) - filemtime($a);
    });
	$s = 0;
    
    for ($i = 0; $i < 10; $i++) {
        $lines = array_slice(file($Files[$i]), 0, 20);
        for ($y = 0; $y < count($lines); $y++) {
            if (strpos($lines[$y],'#ARTIST') !== false) {$FileList[$s]['Artist'] = preg_replace("/\r|\n/", "", substr($lines[$y], 8, strlen($lines[$y])));}
            if (strpos($lines[$y],'#TITLE') !== false) {$FileList[$s]['Title'] = preg_replace("/\r|\n/", "", substr($lines[$y], 7, strlen($lines[$y])));}
            if (strpos($lines[$y],'#COMMENT') !== false) {$FileList[$s]['Comment'] = preg_replace("/\r|\n/", "", substr($lines[$y], 9, strlen($lines[$y])));}
            $FileList[$s]['Artist_Title'] = base64_encode(encodeURIComponent(strtoupper($FileList[$s]['Artist']).'_'.strtoupper($FileList[$s]['Title']).'_'.strtoupper($FileList[$s]['Comment'])));
        } $s++;
    }
    
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
        
        for ($j = 0; $j < count($FileList); $j++) { 
            
            $ArtistTitle = $FileList[$j]['Artist_Title'];
            
            $query = "SELECT * FROM songs WHERE Artist_Title = '$ArtistTitle'";
            $stmt = $db->query($query);
            
            while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                $output[$row['id']]['ID'] = $row['id'];
                $output[$row['id']]['Cover'] = $row['Cover'];
                $output[$row['id']]['Artist'] = $row['Artist'];
                $output[$row['id']]['Title'] = $row['Title'];
                $output[$row['id']]['Artist_Title'] = $row['Artist_Title'];
                $output[$row['id']]['Language'] = $row['Language'];
                $output[$row['id']]['Year'] = $row['Year'];
                $output[$row['id']]['Genre'] = $row['Genre'];
                $output[$row['id']]['Edition'] = $row['Edition'];
                $output[$row['id']]['Youtube'] = $row['Youtube'];
                $output[$row['id']]['Spotify'] = $row['Spotify'];
                $output[$row['id']]['Comment'] = $row['Comment'];

                if(isset($row['Comment'])){
                    if (stristr(trim(strtolower($row['Comment'])), "duet")) {$output[$row['id']]['duet'] = true;} else {$output[$row['id']]['duet'] = false;}
                    if (stristr(trim(strtolower($row['Comment'])), "rap")) {$output[$row['id']]['rap'] = true;} else {$output[$row['id']]['rap'] = false;}
                    if (stristr(trim(strtolower($row['Comment'])), "karaoke")) {$output[$row['id']]['karaoke'] = true;} else {$output[$row['id']]['karaoke'] = false;}
                }
            }
        }
    } catch(PDOException $e){
        echo json_encode($e->getMessage());
    } 
    echo json_encode($output);
}

function encodeURIComponent($str) {
    $revert = array('%21'=>'!', '%2A'=>'*', '%27'=>"'", '%28'=>'(', '%29'=>')');
    return strtr(rawurlencode($str), $revert);
}

function latestRequests(){
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
        $Query = "SELECT * FROM requests ORDER BY id DESC LIMIT 6"; 
        
        $stmt = $db->query($Query);
        $output = [];
		
		$s = 0;

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
			$output[$s]['ID'] = $row['id'];
            $output[$s]['Artist'] = $row['Artist'];
            $output[$s]['Title'] = $row['Title'];
			$output[$s]['Comment'] = $row['Comment'];
			$output[$s]['Artist_Title'] = $row['Artist_Title'];
            $output[$s]['Progress'] = $row['Progress'];
				
			if(isset($row['Comment'])){
				if (stristr(trim(strtolower($row['Comment'])), "karaoke")) {$output[$s]['karaoke'] = true;} else {$output[$s]['karaoke'] = false;}
				if (stristr(trim(strtolower($row['Comment'])), "duet")) {$output[$s]['duet'] = true;} else {$output[$s]['duet'] = false;}
				if (stristr(trim(strtolower($row['Comment'])), "singalong")) {$output[$s]['singalong'] = true;} else {$output[$s]['singalong'] = false;}
			}
			
			$s+=1;
        }
		
    } catch(PDOException $e){
        echo ($e->getMessage());
    }
        
    echo json_encode($output);
}

function addFavourite($param){
	$token = $_COOKIE['token'];
	
	try{   
		$db = new PDO('sqlite:../db/DB.sqlite');
		$query = "SELECT * FROM users WHERE token = '$token'";
		$stmt = $db->query($query);
		
		while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)){
			$dbFavourites = explode (",", $row['favourites']);
			
			if (($key = array_search($param, $dbFavourites)) === false) {
				$newFavourites = $row['favourites'].','.$param;
				
				$updstmt = $db->prepare('UPDATE users SET favourites = :newFavourites WHERE token = :token');
				$updstmt->bindParam(':newFavourites', $newFavourites);
				$updstmt->bindParam(':token', $token);
				$updstmt->execute();
			}
		}
	} catch (PDOException $ex) {
		echo json_encode($ex);
	}
}

function removeFavourite($param){
	$token = $_COOKIE['token'];
	
	try{   
		$db = new PDO('sqlite:../db/DB.sqlite');
		$query = "SELECT * FROM users WHERE token = '$token'";
		$stmt = $db->query($query);
		
		while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)){
			$dbFavourites = explode (",", $row['favourites']);
			
			if (($key = array_search($param, $dbFavourites)) !== false) {
                unset($dbFavourites[$key]);
                
                $Newfavourites = implode(',', $dbFavourites);
                
                $updstmt = $db->prepare('UPDATE users SET favourites = :Newfavourites WHERE token = :token');
                $updstmt->bindParam(':Newfavourites', $Newfavourites );
                $updstmt->bindParam(':token', $token );
                $updstmt->execute();
            }
		}
	} catch (PDOException $ex) {
		echo json_encode($ex);
	}
}

function requestList(){
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
        $query = "SELECT requests.id, requests.Artist, requests.artist_title, requests.Comment, requests.Progress, requests.Title, users.firstname FROM requests INNER JOIN users ON requests.userId = users.id ORDER BY requests.id DESC"; 
        
        $stmt = $db->query($query);
        $output = [];
		$s = 0;

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output[$s]['ID'] = $row['id'];
            $output[$s]['Artist'] = $row['Artist'];
            $output[$s]['Title'] = $row['Title'];
			$output[$s]['Comment'] = $row['Comment'];
			$output[$s]['Artist_Title'] = $row['artist_title'];
            $output[$s]['Progress'] = $row['Progress'];
			
			if(isset($row['Comment'])){
				if (stristr(trim(strtolower($row['Comment'])), "karaoke")) {$output[$s]['karaoke'] = true;} else {$output[$s]['karaoke'] = false;}
				if (stristr(trim(strtolower($row['Comment'])), "duet")) {$output[$s]['duet'] = true;} else {$output[$s]['duet'] = false;}
			}
			
			$s += 1;
        }
    } catch(PDOException $e){
        echo ($e->getMessage());
    }
        
    echo json_encode($output);
}

function ActiveRequestList(){
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
        $query = "SELECT requests.id, requests.Artist, requests.Artist_Title, requests.Progress, requests.Title, users.firstname FROM requests INNER JOIN users ON requests.userId = users.id WHERE requests.Progress <> 100 ORDER BY requests.id DESC;"; 
        
        $stmt = $db->query($query);
        $output = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output[] = [
                'ID' => $row['id'],
                'Artist' => $row['Artist'],
                'Title' => $row['Title'],
				'Artist_Title' => $row['Artist_Title'],
                'Progress' => $row['Progress'],
				'requester' => $row['firstname']
            ];
        }
    } catch(PDOException $e){
        echo ($e->getMessage());
    }
        
    echo json_encode($output);
}

function requestDetails($param){
    
    $output = [];
    
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
		// $query = "SELECT requests.Artist, requests.Artist_Title, requests.Comment, requests.Progress, requests.Title, users.firstname FROM requests INNER JOIN users ON requests.userId = users.id WHERE requests.id = '$param'"; 
		$query = "SELECT requests.ID, requests.Artist, songs.ID as SongID, requests.Comment, requests.Progress, requests.Title, users.firstname FROM requests LEFT JOIN songs ON requests.Artist_Title = songs.Artist_Title INNER JOIN users ON requests.userId = users.id WHERE requests.id = '$param'"; 
        
        $stmt = $db->query($query);
        
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output['ID'] = $row['id'];
            $output['Artist'] = $row['Artist'];
			$output['SongID'] = $row['SongID'];
            $output['Title'] = $row['Title'];
			$output['Comment'] = $row['Comment'];
			$output['Artist_Title'] = $row['Artist_Title'];
            $output['Progress'] = $row['Progress'];
			$output['Requester'] = $row['firstname'];
			
			if(isset($row['Comment'])){
				if (stristr(trim(strtolower($row['Comment'])), "karaoke")) {$output['karaoke'] = true;} else {$output['karaoke'] = false;}
				if (stristr(trim(strtolower($row['Comment'])), "duet")) {$output['duet'] = true;} else {$output['duet'] = false;}
			}
        }
    } catch(PDOException $e){
        echo ($e->getMessage());
    }
        
    echo json_encode($output);
}

function top_genres() {
      
    $output = [];
    
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
   
        $query =    "SELECT songs.Genre,COUNT(songs.Genre) AS cnt FROM songs GROUP BY songs.Genre ORDER BY cnt DESC LIMIT 10;";
                
        $stmt = $db->query($query);
            
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output[] = [
                'Genre' => $row['Genre'],
                'cnt' => $row['cnt']
            ];
        }
    } catch(PDOException $e){
        echo json_encode($e->getMessage());
    } 
    echo json_encode($output);
}

function song_languages() {
      
    $output = [];
    
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
   
        $query =    "SELECT songs.Language,COUNT(songs.Language) AS cnt FROM songs GROUP BY songs.Language ORDER BY cnt DESC LIMIT 10;";
                
        $stmt = $db->query($query);
            
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output[] = [
                'Language' => $row['Language'],
                'cnt' => $row['cnt']
            ];
        }
    } catch(PDOException $e){
        echo json_encode($e->getMessage());
    } 
    echo json_encode($output);
}

function song_decades() {
      
    $output = [];
    
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
   
        $query =    "SELECT substr(songs.year,3,1) as decade,COUNT(substr(songs.year, 3,1)) AS cnt FROM songs GROUP BY decade ORDER BY decade DESC;";
                
        $stmt = $db->query($query);
            
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output[] = [
                'Decade' => $row['decade'],
                'cnt' => $row['cnt']
            ];
        }
    } catch(PDOException $e){
        echo json_encode($e->getMessage());
    } 
    echo json_encode($output);
}

function song_edition() {
      
    $output = [];
    
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
   
        $query =    "SELECT songs.Edition,COUNT(songs.Edition) AS cnt FROM songs WHERE songs.Edition <> '' GROUP BY songs.Edition ORDER BY cnt DESC;";
                
        $stmt = $db->query($query);
            
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output[] = [
                'Edition' => $row['Edition'],
                'cnt' => $row['cnt']
            ];
        }
    } catch(PDOException $e){
        echo json_encode($e->getMessage());
    } 
    echo json_encode($output);
}