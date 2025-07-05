<?php
session_start();
header('Content-Type: application/json');

// ✅ CORS Headers
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// ✅ Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ✅ Include DB config
require 'db_config.php';

// ✅ Read and sanitize input
$data = json_decode(file_get_contents('php://input'), true);
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

// ✅ Validate input
if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 6) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

// ✅ Check if user already exists
$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(['success' => false, 'message' => 'Email already registered']);
    exit;
}

// ✅ Hash password and insert
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare('INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())');
$stmt->execute([$name, $email, $hashedPassword]);

$userId = $pdo->lastInsertId();

// ✅ Store session
$_SESSION['user_id'] = $userId;
$_SESSION['name'] = $name;
$_SESSION['email'] = $email;
$_SESSION['joined'] = date("Y-m-d");

echo json_encode([
    'success' => true,
    'message' => 'Signup successful',
    'user' => [
        'id' => $userId,
        'name' => $name,
        'email' => $email,
    ]
]);
