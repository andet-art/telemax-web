<?php
session_start();
header('Content-Type: application/json');

// ✅ Allow frontend requests (adjust origin in production)
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// ✅ Handle preflight request (important for CORS with credentials)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ✅ Destroy session
session_unset();
session_destroy();

// ✅ Return JSON response
echo json_encode([
  "success" => true,
  "message" => "Logout successful"
]);
