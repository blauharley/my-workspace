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

$sql = "SELECT id, name, priority, UNIX_TIMESTAMP(date) as date FROM ToDo";
$result = $conn->query($sql);
$json = [];

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $json[] = ['id' => $row['id'], 'name' => $row['name'], 'date' => $row['date'], 'priority' => $row['priority']];
    }
} else {
    echo "0 results";
}
$conn->close();

header('Content-Type: application/json');
echo json_encode($json);

?>
