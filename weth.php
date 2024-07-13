<?php

// Fungsi untuk menjalankan perintah shell
function runCommand($command)
{
    $output = null;
    $retval = null;
    exec($command, $output, $retval);
    return [
        'output' => $output,
        'retval' => $retval,
    ];
}

// Jumlah iterasi
$iterations = 30; // Ganti dengan jumlah iterasi yang Anda inginkan

// Interval waktu dalam detik (2 menit = 120 detik)
$interval = 30;

for ($i = 0; $i < $iterations; $i++) {
    echo "Iteration " . ($i + 1) . " of $iterations\n";

    // Jalankan deposit
    echo "Running deposit...\n";
    $depositResult = runCommand('node weth_deposit.js');
    print_r($depositResult['output']);

    if ($depositResult['retval'] === 0) {
        echo "Deposit successful, waiting for $interval seconds...\n";
        // Tunggu selama 2 menit (120 detik)
        sleep($interval);

        // Jalankan withdraw
        echo "Running withdraw...\n";
        $withdrawResult = runCommand('node weth_withdraw.js');
        print_r($withdrawResult['output']);

        if ($withdrawResult['retval'] === 0) {
            echo "Withdraw successful.\n";
        } else {
            echo "Withdraw failed.\n";
        }
    } else {
        echo "Deposit failed.\n";
    }

    // Tunggu lagi sebelum memulai iterasi berikutnya, jika bukan iterasi terakhir
    if ($i < $iterations - 1) {
        echo "Waiting for $interval seconds before next iteration...\n";
        sleep($interval);
    }
}

echo "All iterations completed.\n";
