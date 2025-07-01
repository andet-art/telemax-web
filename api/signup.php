<?php
// telemax/api/signup.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit; // CORS preflight
}

require __DIR__ . '/db_config.php';

$input = json_decode(file_get_contents('php://input'), true);
$name     = trim($input['name'] ?? '');
$email    = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

// 1) Name required
if (empty($name)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Name is required']);
  exit;
}

// 2) Valid email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Invalid email address']);
  exit;
}

// 3) Password length
if (strlen($password) < 6) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Password must be ≥ 6 characters']);
  exit;
}

// 4) Email uniqueness
$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
  http_response_code(409);
  echo json_encode(['success' => false, 'message' => 'Email already registered']);
  exit;
}

// 5) Insert user
$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
if ($stmt->execute([$name, $email, $hash])) {
  echo json_encode(['success' => true, 'message' => 'User registered!']);
} else {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Registration failed']);
}
