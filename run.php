<?php
// Jumlah eksekusi
$executionCount = 0;
// Total eksekusi yang diinginkan
$totalExecutions = 10;
// Interval waktu dalam detik (2 menit = 120 detik)
$interval = 150;

while ($executionCount < $totalExecutions) {
    // Eksekusi skrip deposit.js menggunakan Node.js
    $output = shell_exec('node deposit.js');

    // Tampilkan output ke konsol
    echo "Execution " . ($executionCount + 1) . ":\n";
    echo $output . "\n";

    // Tingkatkan jumlah eksekusi
    $executionCount++;

    // Tunggu selama interval yang ditentukan
    sleep($interval);
}

echo "Completed " . $totalExecutions . " executions.\n";
