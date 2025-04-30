<?php

if(isset($_POST["functionname"])){
    switch ($_POST["functionname"]) {
        case 'artistSongs':
            $param = $_POST["param"];
            artistSongs($param);
        break;
        case 'artistList':
            $param = $_POST["param"];
            artistList($param);
        break;
        case 'artistRequests':
            $param = $_POST["param"];
            artistRequests($param);
        break;
        case 'top_artists':
            top_artists();
        break;
//        case 'artistsCovers':
//            $param = $_POST["param"];
//            artistsCovers($param);
//        break;
    }
}

function artistSongs($param) {
      
    $output = [];
    
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
   
        //$query = "SELECT * FROM songs WHERE Artist LIKE '%$param%' ";
		$query = "WITH song_versions AS ("
				."SELECT *, LOWER(COALESCE(comment, '')) AS comment_lower "
				."FROM songs "
				."WHERE Artist LIKE '%$param%'"
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
				if (stristr(trim(strtolower($row['Comment'])), "Karaoke")) {$output[$row['id']]['karaoke'] = true;} else {$output[$row['id']]['karaoke'] = false;}
            }
        }
    } catch(PDOException $e){
        echo json_encode($e->getMessage());
    } 
    echo json_encode($output);
}

function artistList($param) {
      
    $output = [];
    
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
   
        $query = "SELECT ID, Cover, Artist FROM (SELECT  *, ROW_NUMBER() OVER (PARTITION BY Artist) rn FROM songs WHERE Artist LIKE '%$param%') x WHERE x.rn = 1";
                
        $stmt = $db->query($query);
            
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output[$row['id']]['ID'] = $row['id'];
            $output[$row['id']]['Cover'] = $row['Cover'];
            $output[$row['id']]['Artist'] = $row['Artist'];
        }
    } catch(PDOException $e){
        echo json_encode($e->getMessage());
    } 
    echo json_encode($output);
}

function artistRequests($param) {
      
    $output = [];
    
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
   
        $query = "SELECT * FROM requests WHERE Progress <> 100 AND Artist LIKE '%$param%' ";
                
        $stmt = $db->query($query);
            
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output[$row['id']]['ID'] = $row['id'];
            $output[$row['id']]['Artist'] = $row['Artist'];
            $output[$row['id']]['Title'] = $row['Title'];
        }
    } catch(PDOException $e){
        echo json_encode($e->getMessage());
    } 
    echo json_encode($output);
}

function top_artists() {
      
    $output = [];
    
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
   
        $query =    "SELECT songs.Artist,COUNT(songs.Artist) AS cnt FROM songs GROUP BY songs.Artist ORDER BY cnt DESC LIMIT 6;";
                
        $stmt = $db->query($query);
            
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output[] = [
                'Artist' => $row['Artist'],
                'cnt' => $row['cnt']
            ];
        }
    } catch(PDOException $e){
        echo json_encode($e->getMessage());
    } 
    echo json_encode($output);
}