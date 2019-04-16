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

$_PUT = json_decode(file_get_contents('php://input'));

$sql = "UPDATE ToDo SET name = ?, priority = ?, date = ? WHERE id = ?";
if ($result = $conn->prepare($sql)) {
    $name = $_PUT->name;
    $priority = $_PUT->priority;
    $date = new DateTime();
    $date->setTimestamp($_PUT->date);
    $date = $date->format('Y-m-d H:i:s');
    $id = $_PUT->id;
    $result->bind_param(
        "ssss",
        $name,
        $priority,
        $date,
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
