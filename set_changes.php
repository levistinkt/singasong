<?php

header('Content-Type: application/json');
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// $api_key = "967619b1d500fb695e7d5137059b86cc"; 

// if ($_GET['api_key'] !== $api_key) {
	// http_response_code(403);
	// echo json_encode(["error" => "Unauthorized"]);
	// exit;
// }

if (!isset($data['changes'])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input"]);
    exit;
}

try {
	$db = new SQLite3('db/DB.sqlite');
    $db->exec('BEGIN TRANSACTION');

    foreach ($data['changes'] as $change) {
        if (!isset($change['state'])) { throw new Exception("Invalid change data"); }

        $stmt = $db->prepare('UPDATE queue SET state = :state WHERE id = :id');

        $stmt->bindValue(':id', $change['id'], SQLITE3_INTEGER);
        $stmt->bindValue(':state', $change['state'], SQLITE3_INTEGER);

        $stmt->execute();
    }

    $db->exec('COMMIT');
    echo json_encode(["success" => true]);

} catch (Exception $e) {
    $db->exec('ROLLBACK');
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
