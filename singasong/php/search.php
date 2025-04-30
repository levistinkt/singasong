<?php
	$dsn = 'sqlite:../db/DB.sqlite';

	try {
		$pdo = new PDO($dsn);
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} catch (PDOException $e) {
		echo json_encode(['error' => 'Database connection failed']);
		exit;
	}

	$query = isset($_GET['q']) ? trim($_GET['q']) : '';

	if ($query === '') {
		echo json_encode([]);
		exit;
	}
	
	$sql = "SELECT Artist as artist, Title as title FROM songs 
			WHERE id LIKE :query OR Artist LIKE :query OR Title LIKE :query 
			OR Language LIKE :query OR Year LIKE :query OR Genre LIKE :query 
			OR Edition LIKE :query OR Comment LIKE :query
			LIMIT 10";
	$stmt = $pdo->prepare($sql);
	$stmt->execute(['query' => "%$query%"]);

	// Fetch results
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($results);
?>
