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

$sql = "INSERT INTO ToDo (name, priority, date) VALUES (?,?,?)";
if ($result = $conn->prepare($sql)) {
    $name = $_POST['name'];
    $priority = $_POST['priority'];
    $date = new DateTime();
    $date->setTimestamp($_POST['date']);
    $date = $date->format('Y-m-d H:i:s');
    $result->bind_param(
        "sss",
        $name,
        $priority,
        $date
    );
    $result = $result->execute();
}

$lastInsertedId = $conn->insert_id;

$conn->close();

header('Content-Type: application/json');
echo json_encode([
    'success' => $result,
    'id' => $lastInsertedId
]);

?>
