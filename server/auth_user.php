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

$sql = "SELECT token FROM users WHERE email = ? AND password = ?";
$success = false;
$token = '';
if ($result = $conn->prepare($sql)) {
    $username = $_POST['username'];
    $pass = $_POST['password'];
    $result->bind_param(
        "ss",
        $username,
        $pass
    );
    $result->execute();
    $result->bind_result($token);
    $success = $result->fetch();
}

$conn->close();

header('Content-Type: application/json');
echo json_encode([
    'success' => $success,
    'token' => $token
]);

?>
