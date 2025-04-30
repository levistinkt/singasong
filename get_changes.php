<?php
try {
	
	// $api_key = "967619b1d500fb695e7d5137059b86cc"; 
	
	// if ($_GET['api_key'] !== $api_key) {
		// http_response_code(403);
		// echo json_encode(["error" => "Unauthorized"]);
		// exit;
	// }
	
	$lastSyncedId = isset($_GET['last_synced_id']) ? intval($_GET['last_synced_id']) : 0;

	header('Content-Type: application/json');

	$pdo = new PDO('sqlite:db/DB.sqlite'); 
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$lastSyncedId = isset($_GET['last_synced_id']) ? intval($_GET['last_synced_id']) : 0;

	$query = "
		SELECT id, operation_type, record_id, position, songID, artist, title, players, state, submitter, timestamp
		FROM change_log
		WHERE id > :lastSyncedId
		ORDER BY position ASC
	";

	$stmt = $pdo->prepare($query);
	$stmt->bindParam(':lastSyncedId', $lastSyncedId, PDO::PARAM_INT);
	$stmt->execute();

	$changes = $stmt->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode($changes);
	
} catch (Exception $e) {
	http_response_code(500);
	echo json_encode(["error" => $e->getMessage()]);
}
?>