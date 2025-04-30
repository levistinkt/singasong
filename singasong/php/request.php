<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	if (!empty($_POST['artist']) && !empty($_POST['title'])) {
		if ($_POST["action"] == "add") {
			try{
				$db = new PDO('sqlite:../db/DB.sqlite');
				$token = $_COOKIE["token"];
				
				$query = "SELECT * FROM users WHERE token = '$token'"; 
				$stmt = $db->query($query);
				
				while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
					$userID = $row['id'];
					$artist = $_POST['artist'];
					$title = $_POST['title'];
					$comment = $_POST['comment'];
					
					if ($_POST['singalong']){
						$singalong = 'singalong';
					};
					if ($_POST['karaoke']){
						$karaoke = 'karaoke';
					};
					if ($_POST['duet']){
						$duet = 'duet';
					};
					
					$artist_title = base64_encode(encodeURIComponent(strtoupper($artist).'_'.strtoupper($title)));
					
					error_log('Artist = ' .$artist);
					error_log('Title = ' .$title);
					error_log('Artist_Title = ' .$artist_title);
					error_log('Comment = ' .$comment);
					error_log('userId = ' .$userID);
					
					$query2 = "REPLACE INTO requests (Artist, Title, Artist_Title, Comment, Progress, userId) VALUES ("
						.$db->quote($artist).", "
						.$db->quote($title).", "
						.$db->quote($artist_title).", "
						.$db->quote($singalong . ' ' . $karaoke . ' ' . $duet . ' ' . $comment).", "
						.$db->quote(0).", "
						.$db->quote($userID).");";
					try {
						$count = $db->exec($query2);
						
						if ($count > 0){
							setcookie("requestResult", "OK", time()+3600, "/", "singasong.fun"); 
							header('Location: /pages/request.html');
							exit;
						}
					} catch(PDOException $e){
						echo $e->getMessage();
					}
					setcookie("requestResult", "OK", time()+3600, "/", "singasong.fun"); 
					header('Location: /pages/request.html');
					exit;
				}
			} catch(PDOException $e){
				setcookie("requestResult", "Error in het aanmaken van een verzoek.", time()+3600, "/", "singasong.fun"); 
				header('Location: /pages/request.html');
				exit;
			}
		}
		
		if ($_POST["action"] == "edit") {
			try{
				$db = new PDO('sqlite:../db/DB.sqlite');
				
				$id = $_POST['id'];
				$artist = $_POST['artist'];
				$title = $_POST['title'];
				$comment = $_POST['comment'];
				$progress = $_POST['range'];
				$requester = $_POST['requester'];
				
				if (!empty($_POST['song'])){
					$song = $_POST['song'];	
					$query = "SELECT * FROM songs WHERE id = '$song'"; 
					$result = $db->query($query)->fetch(PDO::FETCH_ASSOC);
					if($result['id'] != NULL){
						$artist_title = $result['Artist_Title'];
					} else {
						$artist_title = '';
					}
				} else {
					$artist_title = '';
				}
				
				$query1 = "SELECT * FROM users WHERE firstname = '$requester'"; 
				$result1 = $db->query($query1)->fetch(PDO::FETCH_ASSOC);
				if($result1['id'] != NULL){
					$query2 = "SELECT * FROM requests WHERE id = '$id'"; 
					$stmt = $db->query($query2);
					
					while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)){
						$updstmt = $db->prepare('UPDATE requests SET Artist = :Artist, Title = :Title, Artist_Title = :Artist_Title, Comment = :Comment, Progress = :Progress, userId = :userId WHERE id = :id');
						$updstmt->bindParam(':Artist', $artist);
						$updstmt->bindParam(':Title', $title);
						$updstmt->bindParam(':Artist_Title', $artist_title);
						$updstmt->bindParam(':Comment', $comment);
						$updstmt->bindParam(':Progress', $progress);
						$updstmt->bindParam(':userId', $result1['id']);
						$updstmt->bindParam(':id', $id);
						
						$updstmt->execute();

						if ($updstmt->rowCount() > 0){
							setcookie("requestResult", "OK", time()+3600, "/", "singasong.fun"); 
							header('Location: /pages/request.html');
							exit;
						}
					}
				}
			} catch(PDOException $e){
				setcookie("requestResult", "Error in het updaten van het verzoek.", time()+3600, "/", "singasong.fun"); 
				header('Location: /pages/request.html');
				exit;
			}	
		}
		
		if ($_POST["action"] == "delete") {
			try{
				$id = $_POST['id'];
				$db = new PDO('sqlite:../db/DB.sqlite');
				$query = "SELECT * FROM requests WHERE id = '$id'";
				 
				$result = $db->query($query)->fetch(PDO::FETCH_ASSOC);
				if($result['id'] != NULL){
					$query2 = "DELETE FROM requests WHERE id = '$id'";
					try {
						$count = $db->exec($query2);
						
						if ($count > 0){
							setcookie("requestResult", "OK", time()+3600, "/", "singasong.fun"); 
							header('Location: /pages/request.html');
							exit;
						}
					} catch(PDOException $e){
						echo $e->getMessage();
					}
				} else {
					setcookie("requestResult", "Verzoek niet gevonden.", time()+3600, "/", "singasong.fun"); 
					header('Location: /pages/request.html');
					exit;
				}
			} catch(PDOException $e){
				setcookie("requestResult", "Error in het verwijderen van het verzoek.", time()+3600, "/", "singasong.fun"); 
				header('Location: /pages/request.html');
				exit;
			}
		}
	}
}

function encodeURIComponent($str) {
    $revert = array('%21'=>'!', '%2A'=>'*', '%27'=>"'", '%28'=>'(', '%29'=>')');
    return strtr(rawurlencode($str), $revert);
}