require("dotenv").config();
const { ethers } = require("ethers");

// Konfigurasi provider untuk jaringan Taiko
const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.taiko.tools/"
);

// Private key dari wallet Anda
const privateKey = process.env.PRIVATE_KEY;

// Menghubungkan wallet
const wallet = new ethers.Wallet(privateKey, provider);

// ABI dari smart contract
const contractABI = [
  // Definisi method withdrawNativeV2
  {
    inputs: [
      { internalType: "address payable", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "string", name: "nonce", type: "string" },
      { internalType: "bytes", name: "signature", type: "bytes" },
    ],
    name: "withdrawNativeV2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Alamat smart contract
const contractAddress = "0x1Df2De291F909baA50C1456C87C71Edf9Fb199D5";

// Menghubungkan ke smart contract
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Fungsi untuk membuat tanda tangan
async function createSignature(to, amount, nonce) {
  const message = ethers.utils.solidityKeccak256(
    ["address", "uint256", "string"],
    [to, amount, nonce]
  );
  const signature = await wallet.signMessage(ethers.utils.arrayify(message));
  return signature;
}

// Fungsi untuk melakukan transaksi withdrawNativeV2
async function withdrawNativeV2() {
  const amount = ethers.utils.parseEther("0.0003"); // Jumlah withdraw
  const toAddress = "0x28b8A9aC47E3E43e3A0872028476ef898055871C"; // Alamat penerima
  const nonce = "v3-1720874138.527"; // Nonce dari aplikasi atau contract
  const signature = await createSignature(toAddress, amount, nonce); // Buat tanda tangan

  try {
    const tx = await contract.withdrawNativeV2(
      toAddress,
      amount,
      nonce,
      signature
    );

    console.log("Transaction Hash:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction was mined in block:", receipt.blockNumber);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
}

// Memanggil fungsi withdrawNativeV2
withdrawNativeV2().catch(console.error);
