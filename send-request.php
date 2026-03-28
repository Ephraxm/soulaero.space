<?php

declare(strict_types=1);

$redirectBase = 'requests';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ' . $redirectBase);
    exit;
}

function clean_value(string $value, int $maxLen = 5000): string
{
    $value = trim($value);
    $value = str_replace(["\r", "\n"], ' ', $value);
    if (strlen($value) > $maxLen) {
        $value = substr($value, 0, $maxLen);
    }
    return $value;
}

$name = clean_value($_POST['name'] ?? '', 80);
$email = filter_var(trim((string) ($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$discord = clean_value($_POST['discord'] ?? '', 80);
$requestType = clean_value($_POST['request_type'] ?? '', 60);
$budget = clean_value($_POST['budget'] ?? '', 30);
$timeline = clean_value($_POST['timeline'] ?? '', 50);
$details = trim((string) ($_POST['details'] ?? ''));
$honeypot = trim((string) ($_POST['website'] ?? ''));

if ($honeypot !== '') {
    header('Location: ' . $redirectBase . '?status=success');
    exit;
}

if ($name === '' || $email === false || $requestType === '' || $details === '') {
    header('Location: ' . $redirectBase . '?status=invalid');
    exit;
}

if (strlen($details) > 7000) {
    $details = substr($details, 0, 7000);
}

$to = 'soulaero.space@gmail.com';
$subject = 'New Custom Request from ' . $name;

$bodyLines = [
    'You received a new custom request submission:',
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    'Discord: ' . ($discord !== '' ? $discord : 'N/A'),
    'Request Type: ' . $requestType,
    'Budget: ' . ($budget !== '' ? $budget : 'N/A'),
    'Timeline: ' . ($timeline !== '' ? $timeline : 'N/A'),
    '',
    'Details:',
    $details,
    '',
    '---',
    'Sent from requests form',
    'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown'),
];

$body = implode("\n", $bodyLines);
$headers = [
    'From: noreply@example.com',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    header('Location: ' . $redirectBase . '?status=success');
    exit;
}

header('Location: ' . $redirectBase . '?status=error');
exit;
