<?php
$servername = "localhost";
$username = "root";
$password = "12345";
$dbname = "testdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$_DELETE = json_decode(file_get_contents('php://input'));

$sql = "DELETE FROM ToDo WHERE id = ?";
if ($result = $conn->prepare($sql)) {
    $id = $_DELETE->id;
    $result->bind_param(
        "s",
        $id
    );
    $result = $result->execute();
}

$conn->close();

header('Content-Type: application/json');
echo json_encode([
    'success' => $result
]);

?>
