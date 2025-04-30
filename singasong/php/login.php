<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (!empty($_POST['user']) || !empty($_POST['pass'])) {
			
			$username = strtolower($_POST['user']);
			$password = $_POST['pass'];
			
            try{
                $db = new PDO('sqlite:../db/DB.sqlite');
                $query = "SELECT * FROM users WHERE username = '$username'";
                
				$result = $db->query($query)->fetch(PDO::FETCH_ASSOC);
				if($result['id'] != NULL){
					if (password_verify($password, $result['password'])) {
						
						setcookie("token", $result['token'], time()+604800, "/", "singasong.fun"); 
						header('Location: /pages/profile.html');
						exit;
					} else {
						setcookie("login", "fail", time()+604800, "/", "singasong.fun"); 
						header('Location: /pages/login.html');
						
						exit;
					}
				} else {
					setcookie("login", "fail", time()+604800, "/", "singasong.fun"); 
					header('Location: /pages/login.html');
					
					exit;
				}
            } catch(PDOException){ }
        }
    }
?>	