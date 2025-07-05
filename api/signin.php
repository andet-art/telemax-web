<?php
session_start();

// ✅ Set response type
header('Content-Type: application/json');

// ✅ CORS headers (adjust for production)
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// ✅ Handle preflight (important!)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ✅ Require DB
require 'db_config.php';

// ✅ Get and sanitize input
$data = json_decode(file_get_contents('php://input'), true);
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

// ✅ Input validation
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || empty($password)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    exit;
}

// ✅ Query user
$stmt = $pdo->prepare('SELECT id, name, email, password, created_at FROM users WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    // ✅ Save to session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['name'] = $user['name'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['joined'] = $user['created_at'] ?? date("Y-m-d");

    echo json_encode([
        'success' => true,
        'message' => 'Sign in successful',
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
        ]
    ]);
} else {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
}
