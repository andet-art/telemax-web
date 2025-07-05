<?php
// Extend session lifetime to 30 minutes
ini_set('session.gc_maxlifetime', 1800);
session_set_cookie_params([
    'lifetime' => 1800,
    'path' => '/',
    'secure' => false, // Set to true in production (HTTPS)
    'httponly' => true,
    'samesite' => 'Lax',
]);

session_start();
header('Content-Type: application/json');

// ✅ CORS headers
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// ✅ Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ✅ Check session
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => 'Not authenticated'
    ]);
    exit;
}

// ✅ Respond with session user data
echo json_encode([
    'success' => true,
    'user' => [
        'id'     => $_SESSION['user_id'],
        'name'   => $_SESSION['name'] ?? 'Unknown',
        'email'  => $_SESSION['email'] ?? '',
        'joined' => $_SESSION['joined'] ?? '',
    ]
]);
