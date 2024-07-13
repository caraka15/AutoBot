require("dotenv").config();
const { ethers } = require("ethers");

async function increaseGasLimitAndGasPriceForPendingTx(
  provider,
  signer,
  pendingTxHash,
  newGasLimit,
  newGasPriceInGwei
) {
  try {
    // Ambil transaksi yang tertunda
    const pendingTx = await provider.getTransaction(pendingTxHash);
    if (!pendingTx) {
      console.log("Transaksi tidak ditemukan.");
      return;
    }

    // Pastikan transaksi belum ditambang
    if (pendingTx.confirmations > 0) {
      console.log("Transaksi sudah ditambang.");
      return;
    }

    // Konversi gas price baru dari Gwei ke Wei
    const newGasPriceInWei = ethers.utils.parseUnits(
      newGasPriceInGwei.toString(),
      "gwei"
    );

    // Buat ulang transaksi dengan gas limit dan gas price yang lebih tinggi
    const newTx = {
      to: pendingTx.to,
      value: pendingTx.value,
      gasPrice: newGasPriceInWei, // Gas price baru
      gasLimit: ethers.BigNumber.from(newGasLimit), // Gas limit baru
      nonce: pendingTx.nonce,
      data: pendingTx.data,
      chainId: pendingTx.chainId,
    };

    // Tandatangani transaksi baru
    const signedTx = await signer.signTransaction(newTx);

    // Kirim transaksi baru
    const sentTx = await provider.sendTransaction(signedTx);

    console.log("Transaksi baru berhasil dikirim:", sentTx.hash);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Contoh penggunaan
(async () => {
  // Provider (menggunakan RPC Taiko)
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.taiko.xyz"
  );

  const privateKey = process.env.PRIVATE_KEY;

  // Wallet signer (menggunakan private key)
  const signer = new ethers.Wallet(privateKey, provider);

  // Hash transaksi yang tertunda
  const pendingTxHash =
    "0x8862959f0e5cee183f6ac5db3377bda7fb91601c8e35d1bf3d5539e197780ae5";

  // Gas limit baru yang ingin Anda tetapkan
  const newGasLimit = 100000;

  // Gas price baru yang ingin Anda tetapkan (dalam Gwei)
  const newGasPriceInGwei = 0.1;

  await increaseGasLimitAndGasPriceForPendingTx(
    provider,
    signer,
    pendingTxHash,
    newGasLimit,
    newGasPriceInGwei
  );
})();
