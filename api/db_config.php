<?php
// telemax/api/db_config.php

$host    = 'localhost';
$db      = 'telemax';
$user    = 'gerti';      // or 'root'
$pass    = '123';        // or '' for root on XAMPP
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
  $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode([
    'success' => false,
    'message' => 'DB connection failed: ' . $e->getMessage()
  ]);
  exit;
}
