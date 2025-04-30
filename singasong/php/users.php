<?php

if(isset($_POST["functionname"])){
    switch ($_POST["functionname"]) {
		case 'checkToken':
            $param = $_POST["param"];
            checkToken($param);
        break;
		case 'getUserDetails':
            $param = $_POST["param"];
            getUserDetails($param);
        break;
		case 'userDetails':
            $param = $_POST["param"];
            userDetails($param);
        break;
		case 'userList':
            userList();
        break;
		case 'getUserFavourites':
            $param = $_POST["param"];
            getUserFavourites($param);
        break;
		case 'getUserRequests':
            $param = $_POST["param"];
            getUserRequests($param);
        break;
		case 'PassFavourites':
            $param = $_POST["param"];
            PassFavourites($param);
        break;
		case 'toggleActiveUser':
            $param1 = $_POST["param1"];
            $param2 = $_POST["param2"];
            toggleActiveUser($param1, $param2);
        break;
		case 'UpdateAllUserTokens':
            UpdateAllUserTokens();
        break;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	if ($_POST["action"] == "add") {
		
		$username = $_POST['username'];
		$firstname = $_POST['firstname'];
		$lastname = $_POST['lastname'];
		$role = $_POST['role'];
		$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
		$token = generateNewToken();
		
		try {		
			$db = new PDO('sqlite:../db/DB.sqlite');
			$query = "REPLACE INTO users (username, firstname, lastname, password, token, role, active) VALUES ("
				.$db->quote($username).", "
				.$db->quote($firstname).", "
				.$db->quote($lastname).", "
				.$db->quote($password).", "
				.$db->quote($token).", "
				.$db->quote($role).", "
				.$db->quote(0).");";
			
			$count = $db->exec($query);
			
			if ($count > 0){
				setcookie("userResult", "OK", time()+3600, "/", "singasong.fun"); 
				header('Location: /pages/users.html');
				exit;
			}
		} catch(PDOException $e){
			setcookie("userResult", "Error in het aanamken van de gebruiker", time()+3600, "/", "singasong.fun"); 
			header('Location: /pages/users.html');
			exit;
		}
	}
	
	if ($_POST["action"] == "edit") {
		try{
			$db = new PDO('sqlite:../db/DB.sqlite');
			
			$id = $_POST['id'];
			$username = $_POST['username'];
			$firstname = $_POST['firstname'];
			$lastname = $_POST['lastname'];
			$role = $_POST['role'];
			$resetPass = $_POST['checkbox1'];
			$resetToken = $_POST['checkbox2'];
			
			$query = "SELECT * FROM users WHERE id = '$id'"; 
			$stmt = $db->query($query);
			
			while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)){
				$updstmt = $db->prepare('UPDATE users SET username = :Username, firstname = :Firstname, lastname = :Lastname, role = :Role, active = :Active WHERE id = :id');
				$updstmt->bindParam(':Username', $username);
				$updstmt->bindParam(':Firstname', $firstname);
				$updstmt->bindParam(':Lastname', $lastname);
				$updstmt->bindParam(':Role', $role);
				$updstmt->bindParam(':Active', $active);
				$updstmt->bindParam(':id', $id);
				
				$updstmt->execute();
				
				if ($resetPass === 'on'){
					$password = password_hash('123', PASSWORD_DEFAULT);
					$token = generateNewToken();
					
					$updstmt2 = $db->prepare('UPDATE users SET password = :password, token = :token WHERE id = :id');	
					$updstmt2->bindParam(':password', $password);
					$updstmt2->bindParam(':token', $token);
					$updstmt2->bindParam(':id', $id);
					
					$updstmt2->execute();
				}
				
				if ($resetToken === 'on'){

					$token = generateNewToken();
					
					$updstmt3 = $db->prepare('UPDATE users SET token = :token WHERE id = :id');	
					$updstmt3->bindParam(':token', $token);
					$updstmt3->bindParam(':id', $id);
					
					$updstmt3->execute();
				}

				if ($updstmt->rowCount() > 0 || $updstmt2->rowCount() > 0 || $updstmt3->rowCount() > 0){
					setcookie("userResult", "OK", time()+3600, "/", "singasong.fun"); 
					header('Location: /pages/users.html');
					exit;
				} else {
					setcookie("userResult", "Gebruiker niet geupdate", time()+3600, "/", "singasong.fun"); 
					header('Location: /pages/users.html');
					exit;
				}
			}
		} catch(PDOException $e){
			setcookie("userResult", "Error in het updaten van de gebruiker", time()+3600, "/", "singasong.fun"); 
			header('Location: /pages/users.html');
			exit;
		}
	}
	
	if ($_POST["action"] == "delete") {
		try{
			$id = $_POST['id'];
			$db = new PDO('sqlite:../db/DB.sqlite');
			$query = "SELECT * FROM users WHERE id = '$id'";
			 
			$result = $db->query($query)->fetch(PDO::FETCH_ASSOC);
			if($result['id'] != NULL){
				$query2 = "DELETE FROM users WHERE id = '$id'";
				$count = $db->exec($query2);
				
				if ($count > 0){
					setcookie("userResult", "OK", time()+3600, "/", "singasong.fun"); 
					header('Location: /pages/users.html');
					exit;
				}
			} else {
				header('Location: /pages/users.html');
				exit;
			}
		} catch(PDOException $e){
			header('Location: /pages/users.html');
			exit;
		}
	}
	
	if ($_POST["action"] == "changePass") {
		$token = $_POST['id'];
		$pw1 = $_POST['current_password'];
		$pw2 = $_POST['new_password1'];
		$pw3 = $_POST['new_password2'];
		
		try{
			$db = new PDO('sqlite:../db/DB.sqlite');
			$query = "SELECT * FROM users WHERE token = '$token'";                
			$result = $db->query($query)->fetch(PDO::FETCH_ASSOC);
			
			if($result['id'] != NULL){
				error_log($pw1);
				if (password_verify($pw1, $result['password'])) {
					if($pw1 != $pw2){
						if($pw2 === $pw3){
					
							$pw2 = password_hash($_POST['new_password1'], PASSWORD_DEFAULT);
							$token2 = generateNewToken();
							
							$db = new PDO('sqlite:../db/DB.sqlite');
							$query = "SELECT * FROM users WHERE token = '$token'";
							
							$stmt = $db->query($query);
							while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)){
								$updstmt = $db->prepare('UPDATE users SET password = :Newpassword, token = :Newtoken WHERE token = :token');
								$updstmt->bindParam(':Newpassword', $pw2 );
								$updstmt->bindParam(':Newtoken', $token2 );
								$updstmt->bindParam(':token', $token );
								$updstmt->execute();
								
								if ($updstmt->rowCount() > 0){
									setcookie("token", $token2, time()+604800, "/", "singasong.fun"); 
									// setcookie("token2", $token2, time()+604800, "/", "singasong.fun"); 
									setcookie("pwchangeResult", "OK", time()+3600, "/", "singasong.fun"); 
									header('Location: /pages/profile.html');
									exit;
								} else {
									setcookie("pwchangeResult", "Er is iets mis gegaan", time()+3600, "/", "singasong.fun"); 
									header('Location: /pages/profile.html');
									exit;
								}
							}
						} else {
							setcookie("pwchangeResult", "Nieuwe wachtwoorden zijn ongelijk", time()+3600, "/", "singasong.fun"); 
							header('Location: /pages/profile.html');
							exit;
						}
					} else {
						setcookie("pwchangeResult", "Nieuw wachtwoord is gelijk aan huidig", time()+3600, "/", "singasong.fun"); 
						header('Location: /pages/profile.html');
						exit;
					}
				} else {
					setcookie("pwchangeResult", "Opgegeven wachtwoord onjuist", time()+3600, "/", "singasong.fun"); 
					header('Location: /pages/profile.html');
					exit;
				}
			} else {
				setcookie("pwchangeResult", "Er is iets mis gegaan", time()+3600, "/", "singasong.fun"); 
				header('Location: /pages/profile.html');
				exit;
			}
		} catch(PDOException $e){
			setcookie("pwchangeResult", "Er is iets mis gegaan", time()+3600, "/", "singasong.fun"); 
			header('Location: /pages/profile.html');
			exit;
		}
	}
	
	if ($_POST["action"] == "login") {
		$username = strtolower($_POST['user']);
		$password = $_POST['pass'];
		
		try{
			$db = new PDO('sqlite:../db/DB.sqlite');
			$query = "SELECT * FROM users WHERE username = '$username'";
			
			$result = $db->query($query)->fetch(PDO::FETCH_ASSOC);
			if($result['id'] != NULL){
				if (password_verify($password, $result['password'])) {
					
					setcookie("token", $result['token'], time()+604800, "/", "singasong.fun"); 
					setcookie("login", 'OK', time()+604800, "/", "singasong.fun");
					header('Location: /pages/profile.html');
					exit;
				} else {
					setcookie("login", 'NOK', time()+604800, "/", "singasong.fun");
					header('Location: /pages/login.html');
					exit;
				}
			} else {
				setcookie("login", 'NOK', time()+604800, "/", "singasong.fun");
				header('Location: /pages/login.html');
				exit;
			}
		} catch(PDOException){ 
			header('Location: /pages/login.html');
			setcookie("login", 'Error tijdens het inloggen', time()+604800, "/", "singasong.fun");
			exit;
		}
	}
}

function userList(){
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
        $query = "SELECT * FROM users ORDER by firstname;"; 
        
        $stmt = $db->query($query);
        $output = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $output[] = [
                'ID' => $row['id'],
                'firstname' => $row['firstname'],
                'lastname' => $row['lastname'],
				'username' => $row['username'],
                'role' => $row['role'],
				'active' => $row['active']
            ];
        }
    } catch(PDOException $e){
        echo ($e->getMessage());
    }
        
    echo json_encode($output);
}

function checkToken($param){
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
        $query = "SELECT * FROM users WHERE token = '$param'";
		$result = $db->query($query)->fetch(PDO::FETCH_ASSOC);
		
        if ($result['id'] != NULL) {
				$output['login'] = 'true';
				$output['role'] = $result['role'];
        } else {
            $output['login'] = 'false';
        }
    }
    catch(PDOException $e){
		$output['login'] = 'false';
    } 
    echo json_encode($output);
}

function toggleActiveUser($param1, $param2){
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
        $query = "SELECT id FROM users WHERE id = '$param1'";
		$stmt = $db->query($query);
		
		while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)){
			$updstmt = $db->prepare('UPDATE users SET active = :Active WHERE id = :id');
			$updstmt->bindParam(':Active', $param2);
			$updstmt->bindParam(':id', $param1);
			
			$updstmt->execute();
		}
    }
    catch(PDOException $e){
    } 
}

function getUserDetails($param){
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
        $query = "SELECT id, firstname, lastname, username, role, active FROM users WHERE token = '$param'";
		$result = $db->query($query)->fetch(PDO::FETCH_ASSOC);
		
        if ($result['id'] != NULL) {
			
			$output[] = [
                'id' => $result['id'],
                'firstname' => $result['firstname'],
                'lastname' => $result['lastname'],
                'username' => $result['username'],
                'role' => $result['role'],
				'active' => $result['active']
            ];
        } else {
            $output = [];
        }
    }
    catch(PDOException $e){
         $output = 'error';
    } 
    echo json_encode($output);
}

function userDetails($param){
    try{
        $db = new PDO('sqlite:../db/DB.sqlite');
        $query = "SELECT id, firstname, lastname, username, role, active FROM users WHERE id = '$param'";
		$result = $db->query($query)->fetch(PDO::FETCH_ASSOC);
		
        if ($result['id'] != NULL) {
			
			$output = [
                'id' => $result['id'],
                'firstname' => $result['firstname'],
                'lastname' => $result['lastname'],
                'username' => $result['username'],
				'role' => $result['role'],
                'active' => $result['active']
            ];
        } else {
            $output = [];
        }
    }
    catch(PDOException $e){
         $output = 'error';
    } 
    echo json_encode($output);
}

function getUserFavourites($param){
    try{
		$db = new PDO('sqlite:../db/DB.sqlite');
		$query1 = "SELECT favourites FROM users WHERE token = '$param'";
		$stmt = $db->query($query1);
		
		$query = [];
		$i = 0;
		
		while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
			$favourites = explode(",", $row['favourites']);
		}
		
		foreach ($favourites as $key => $val){
			$query[$i] = "SELECT * FROM songs WHERE Artist_Title = '$val'";
			$i ++;
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
                }
                
                if(isset($_COOKIE['Username'])){
                    if (in_array($row['Artist_Title'], $favourites)) { $output[$row['id']]['favourite'] = true; } else { $output[$row['id']]['favourite'] = false; }
                }
            }
        }
    }
    catch(PDOException $e){

    } 
    echo json_encode($output);
}

function getUserRequests($param){
    try{
		$db = new PDO('sqlite:../db/DB.sqlite');
		$query1 = "SELECT id FROM users WHERE token = '$param'";   
		$result = $db->query($query1)->fetch(PDO::FETCH_ASSOC);
		
		$output = [];
		
		if($result['id'] != NULL){
			$userId = $result['id'];
			$query2 = "SELECT * FROM requests WHERE userId = '$userId' ORDER by id DESC";
            try {
				$stmt = $db->query($query2);
            
				while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
					$output[$row['id']]['ID'] = $row['id'];
					$output[$row['id']]['Artist'] = $row['Artist'];
					$output[$row['id']]['Title'] = $row['Title'];
					$output[$row['id']]['Comment'] = $row['Comment'];
					$output[$row['id']]['Artist_Title'] = $row['Artist_Title'];
					$output[$row['id']]['Progress'] = $row['Progress'];
					
					if(isset($row['Comment'])){
						if (stristr(trim(strtolower($row['Comment'])), "karaoke")) {$output[$row['id']]['karaoke'] = true;} else {$output[$row['id']]['karaoke'] = false;}
						if (stristr(trim(strtolower($row['Comment'])), "duet")) {$output[$row['id']]['duet'] = true;} else {$output[$row['id']]['duet'] = false;}
					}
				}
            } catch(PDOException $e){
                echo $e->getMessage();
            }
		}
	}
    catch(PDOException $e){

    } 
    echo json_encode($output);
}

function PassFavourites($param){ 
          
    $cookieFavourites = json_decode($param);
	$token = $_COOKIE['token'];
	
	try {
		$db = new PDO('sqlite:../db/DB.sqlite');
		$query = "SELECT * FROM users WHERE token = '$token'";
		$stmt = $db->query($query);
		
		while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)){
			$dbFavourites = explode (",", $row['favourites']);
						
			if($row['favourites'] == null){
				$newFavourites = substr($param,0,-1);
				error_log($newFavourites);
			} else {
				$dif = array_diff($cookieFavourites, $dbFavourites);
				
				if ($dif){
					$newFavourites = $row['favourites'] . ',' . implode(',', $dif);
				} 
			}
			if ($newFavourites){
				$updstmt = $db->prepare('UPDATE users SET favourites = :newFavourites WHERE token = :token');
				$updstmt->bindParam(':newFavourites', $newFavourites);
				$updstmt->bindParam(':token', $token);
				$updstmt->execute();
			}
		}
	}
	catch(PDOException $e){
		return;
	}
}

function UpdateAllUserTokens() {
	try {
		$db = new PDO('sqlite:../db/DB.sqlite');
		$stmt = $db->prepare("UPDATE users SET token = :newToken WHERE id = :userId");
		$users = $db->query("SELECT id FROM users WHERE token IS NOT NULL")->fetchAll(PDO::FETCH_ASSOC);

		foreach ($users as $user) {
			$newToken = generateNewToken();
			
			$stmt->bindParam(':newToken', $newToken);
			$stmt->bindParam(':userId', $user['id']);
			$stmt->execute();
		}
		
		setcookie("tokenUpdateResult", "OK", time()+3600, "/", "singasong.fun"); 
	} catch (PDOException $e) {
		echo "Database error: " . $e->getMessage();
	}
}

function generateNewToken() {
	return bin2hex(random_bytes(16)); // Generates a 32-character hex token
}