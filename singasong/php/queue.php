<?php

if(isset($_POST["functionname"])){
    switch ($_POST["functionname"]) {
		case 'queuePlayers':
            queuePlayers();
        break;
		case 'addQueueItem':
            $param1 = $_POST["param1"];
            $param2 = $_POST["param2"];
			$param3 = $_POST["param3"];
			$param4 = $_POST["param4"];
            addQueueItem($param1, $param2, $param3, $param4);
        break;
		case 'updateQueueItem':
            $param1 = $_POST["param1"];
            $param2 = $_POST["param2"];
			$param3 = $_POST["param3"];
            updateQueueItem($param1, $param2, $param3);
        break;
		case 'updateQueueOrder':
            $param = $_POST["param"];
            updateQueueOrder($param);
        break;
		case 'removeQueueItem':
            $param = $_POST["param"];
            removeQueueItem($param);
        break;
		case 'queueOverview':
			queueOverview();
		break;
		case 'queueItemDetails':
			$param = $_POST["param"];
			queueItemDetails($param);
		break;
    }
}

function removeQueueItem($param){
	try{
		$db = new PDO('sqlite:../db/DB.sqlite');
		$query = "SELECT * FROM queue WHERE id = '$param'";
		 
		$result = $db->query($query)->fetch(PDO::FETCH_ASSOC);
		if($result['id'] != NULL){
			$query2 = "DELETE FROM queue WHERE id = '$param'";
			$count = $db->exec($query2);
			
			if ($count > 0){
				setcookie("deleteQueueResult_OK", "1", time()+3600, "/", "singasong.fun"); 
				exit;
			} else {
				setcookie("deleteQueueResult_NOK", "1", time()+3600, "/", "singasong.fun"); 
				exit;
			}
		}
	} catch(PDOException $e){
		setcookie("deleteQueueResult_ERR", "1", time()+3600, "/", "singasong.fun"); 
		exit;
	}
}

function queuePlayers(){
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
        $query = "SELECT * FROM users where active = 1 ORDER by firstname;"; 
		       
        $stmt = $db->query($query);
        $output = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output[] = [
                'ID' => $row['id'],
                'firstname' => $row['firstname']
            ];
        }
    } catch(PDOException $e){
        echo ($e->getMessage());
    }
        
    echo json_encode($output);
}

function addQueueItem($param1, $param2, $param3, $param4){
	try{
		$token = $_COOKIE['token'];
		$output = [];
		
		$db = new PDO('sqlite:../db/DB.sqlite');
		$query1 = "SELECT * FROM users WHERE token = '$token'";
		$result1 = $db->query($query1)->fetch(PDO::FETCH_ASSOC);
		
		if($result1['id'] != NULL){
			$query2 = "SELECT COUNT (*) FROM queue;";
			$result2 = $db->query($query2)->fetchColumn();
			// if($result2 > 0){
				$position = $result2 + 1;
				
				$firstname = $result1['firstname'];
				
				$query3 = "REPLACE INTO queue (position, songID, Artist, Title, submitter, players, state) VALUES ("
				.$db->quote($position).", "
				.$db->quote($param4).", "	
				.$db->quote($param1).", "
				.$db->quote($param2).", "
				.$db->quote($firstname).", "
				.$db->quote($param3).", "
				.$db->quote(0).");";
				
				$count = $db->exec($query3);
					
				if ($count > 0){
					setcookie("queueResult_OK", "1", time()+3600, "/", "singasong.fun"); 
					exit;
				} else {
					setcookie("queueResult_NOK", "1", time()+3600, "/", "singasong.fun"); 
					exit;
				}
			// }
		}
	} catch(PDOException $e){
		setcookie("queueResult_ERR", "1", time()+3600, "/", "singasong.fun"); 
		exit;
	}
}

function updateQueueItem($param1, $param2, $param3){
	try{
		$db = new PDO('sqlite:../db/DB.sqlite');
		$query = "SELECT * FROM queue WHERE id = '$param1'"; 
		$stmt = $db->query($query);
		
		while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)){
			$updstmt = $db->prepare('UPDATE queue SET players = :Players, state = :State WHERE id = :id');
			$updstmt->bindParam(':Players', $param2);
			$updstmt->bindParam(':State', $param3);
			$updstmt->bindParam(':id', $param1);
			
			$updstmt->execute();
				
			if ($updstmt->rowCount() > 0){
				setcookie("updateQueueResult_OK", "1", time()+3600, "/", "singasong.fun"); 
				exit;
			} else {
				setcookie("updateQueueResult_NOK", "1", time()+3600, "/", "singasong.fun"); 
				exit;
			}
		}
	} catch(PDOException $e){
		setcookie("updateQueueResult_ERR", "1", time()+3600, "/", "singasong.fun"); 
		exit;
	}
}

function queueOverview(){
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
        $query = "SELECT queue.id, songs.Cover, songs.Comment, queue.Artist, queue.Title, queue.state FROM queue INNER JOIN songs ON queue.SongID = songs.Artist_Title ORDER BY queue.position;"; 
		       
        $stmt = $db->query($query);
        $output = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output[] = [
                'ID' => $row['id'],
				'Cover' => $row['Cover'],
				'Comment' => $row['Comment'],
				'Artist' => $row['Artist'],
				'Title' => $row['Title'],
				'State' => $row['state']
            ];
        }
		
    } catch(PDOException $e){
        echo ($e->getMessage());
    }
        
    echo json_encode($output);
}

function queueItemDetails($param){
	try{
        $db = new PDO('sqlite:../db/DB.sqlite');
        $query = "SELECT queue.id, songs.id as SongID, songs.Cover, queue.Artist, queue.Title, queue.submitter, queue.players, queue.state FROM queue INNER JOIN songs ON queue.songID = songs.Artist_Title WHERE queue.id = '$param'"; 
		       
        $stmt = $db->query($query);

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
			
            $output = [
                'ID' => $row['id'],
				'SongID' => $row['SongID'],
				'Cover' => $row['Cover'],
				'Artist' => $row['Artist'],
				'Title' => $row['Title'],
				'Submitter' => $row['submitter'],
                'Players' => $row['players'],
				'State' => $row['state']
            ];
        }
		
    } catch(PDOException $e){
        echo ($e->getMessage());
    }
        
    echo json_encode($output);
}

function updateQueueOrder($param){
	$data = json_decode($param, true);
	$i = 0;
	try{
		$db = new PDO('sqlite:../db/DB.sqlite');
		
		foreach ($data['order'] as $key => $value) {
			$updstmt = $db->prepare('UPDATE queue SET position = :position WHERE id = :id');
			$updstmt->bindParam(':position', $value['rowPosition']);
			$updstmt->bindParam(':id', $value['dataId']);
			$updstmt->execute();
			
			$i += 1;
		}
		
		if (count($data['order']) ==  $i ){
			echo json_encode(['success' => true, 'message' => 'Order updated successfully.']);
		} else {
			echo json_encode(['success' => false, 'message' => 'Failed to update order: ']);
		}
	} catch(PDOException $e){
		echo json_encode(['success' => false, 'message' => 'Failed to update order: ']);
	}
}