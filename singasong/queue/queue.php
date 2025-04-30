<?php

if(isset($_POST["functionname"])){
    switch ($_POST["functionname"]) {
        case 'getQueue':
            getQueue();
        break;
		case 'getSong':
            $param = $_POST["param"];
            getSong($param);
        break;
		case 'selectPlayers':
            selectPlayers();
        break;
        case 'addQueueItem':
            $param1 = $_POST["param1"];
            $param2 = $_POST["param2"];
            addQueueItem($param1, $param2);
        break;
    }
}

function getQueue(){
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
        $query = "SELECT queue.id, songs.Cover, songs.Comment, queue.Artist, queue.Title, queue.state, queue.players FROM queue INNER JOIN songs ON queue.songID = songs.Artist_Title ORDER BY queue.position;"; 
		       
        $stmt = $db->query($query);
        $output = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output[] = [
                'ID' => $row['id'],
				'Cover' => $row['Cover'],
				'Comment' => $row['Comment'],
				'Artist' => $row['Artist'],
				'Title' => $row['Title'],
				'Players' => $row['players'],
				'State' => $row['state']
            ];
        }
		
    } catch(PDOException $e){
        echo ($e->getMessage());
    }
        
    echo json_encode($output);
}

function getSong($param) {

    $output = [];
    $output['ID'] = '0';
    
    try{
		$db = new PDO('sqlite:../db/DB.sqlite');
        $query = "SELECT * FROM songs WHERE id = '$param'";
        $stmt = $db->query($query);
        
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output['ID'] = $row['id'];
            $output['Cover'] = $row['Cover'];
            $output['Artist'] = $row['Artist'];
            $output['Title'] = $row['Title'];
            $output['Language'] = $row['Language'];
            $output['Year'] = $row['Year'];
            $output['Genre'] = $row['Genre'];
            $output['Edition'] = $row['Edition'];
            
            if(isset($row['Comment'])){
                if (stristr(trim(strtolower($row['Comment'])), "duet")) {$output['duet'] = true;} else {$output['duet'] = false;}
                if (stristr(trim(strtolower($row['Comment'])), "rap")) {$output['rap'] = true;} else {$output['rap'] = false;}
				if (stristr(trim(strtolower($row['Comment'])), "karaoke")) {$output['karaoke'] = true;} else {$output['karaoke'] = false;}
            }
        }
		
		$db = null;
        
    } catch(PDOException){
        echo json_encode("Error in het zoeken van nummer");
    } 
        
    echo json_encode($output);
}

function selectPlayers() {

    $db = new PDO('sqlite:../db/DB.sqlite');
	$output = [];
    $i = 0;
    
    try{   
		$query = "SELECT * FROM users WHERE active = 1 ORDER BY firstname";
        $stmt = $db->query($query);
        
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output[$i] = $row['firstname'];
            $i++;
        }
		
		$db = null;
		        
    } catch(PDOException){
        echo json_encode("Error in het zoeken van spelers");
    } 
        
    echo json_encode($output);
}

function addQueueItem($param1, $param2) {
    
    try{   
        $db = new PDO('sqlite:../db/DB.sqlite');
		$query1 = "SELECT * FROM songs WHERE id = '$param1'"; 
        $result1 = $db->query($query1)->fetch(PDO::FETCH_ASSOC);
        
        if($result1['id'] != NULL){
			$query2 = "SELECT COUNT (*) FROM queue;";
			$result2 = $db->query($query2)->fetchColumn();
			
			$position = $result2 + 1;
			
			$query3 = "REPLACE INTO queue (position, songID, Artist, Title, submitter, players, state) VALUES ("
				.$db->quote($position).", "
				.$db->quote($result1['Artist_Title']).", "
				.$db->quote($result1['Artist']).", "
				.$db->quote($result1['Title']).", "
				.$db->quote('Scherm').", "
				.$db->quote($param2).", "
				.$db->quote(0).");";
			
			$count = $db->exec($query3);
				
			if ($count > 0){
				setcookie("queueResult_OK", "1", time()+3600, "/", "singasong.fun"); 
				exit;
			} else {
				setcookie("queueResult_NOK", "1", time()+3600, "/", "singasong.fun"); 
				exit;
			}	 
					
        } else {
			setcookie("queueResult_NOK", "2", time()+3600, "/", "singasong.fun"); 
			exit;
		}
    } catch(PDOException $e){}
}