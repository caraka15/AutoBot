require("dotenv").config();
const { ethers } = require("ethers");

// Konfigurasi provider untuk jaringan Taiko
const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.taiko.tools/"
);

// Private key dari .env file
const privateKey = process.env.PRIVATE_KEY;

// Menghubungkan wallet
const wallet = new ethers.Wallet(privateKey, provider);

// ABI dari smart contract, termasuk method depositNative dan ABI yang Anda berikan
const contractABI = [
  {
    inputs: [
      { internalType: "address", name: "_logic", type: "address" },
      { internalType: "address", name: "admin_", type: "address" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  { stateMutability: "payable", type: "fallback" },
  { stateMutability: "payable", type: "receive" },
  {
    inputs: [],
    name: "depositNative",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

// Alamat smart contract
const contractAddress = "0x1df2de291f909baa50c1456c87c71edf9fb199d5";

// Menghubungkan ke smart contract
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

function getRandomValue() {
  const baseValue = "0.05";
  const randomFactor = Math.floor(Math.random() * 100); // Menghasilkan angka acak antara 00 dan 99
  const randomValue = baseValue + randomFactor.toString().padStart(2, "0"); // Menggabungkan dengan base value
  return randomValue;
}

// Fungsi untuk melakukan transaksi depositNative
async function depositNative() {
  const randomAmount = getRandomValue();
  const amount = ethers.utils.parseEther("0.05"); // Jumlah deposit

  try {
    const tx = await contract.depositNative({
      value: amount, // Nilai yang dikirim dalam transaksi
      gasPrice: ethers.utils.parseUnits("0.09", "gwei"),
      gasLimit: 104817, // Menggunakan gas limit yang lebih tepat
    });

    console.log("Transaction Hash:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction was mined in block:", receipt.blockNumber);
    return receipt.blockNumber;
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error; // throw error to stop further transactions
  }
}

// Fungsi untuk mendapatkan saldo ETH
async function getBalance() {
  const balance = await wallet.getBalance();
  return ethers.utils.formatEther(balance);
}

async function main() {
  for (let i = 0; i < 10; i++) {
    try {
      const blockNumber = await depositNative();

      // Check balance before proceeding to next transaction
      let balance = await getBalance();
      console.log(
        `Waiting for balance to be above 0.05 ETH. Current balance: ${balance} ETH`
      );
      while (parseFloat(balance) <= 0.05) {
        await new Promise((resolve) => setTimeout(resolve, 20000)); // 20 seconds delay
        balance = await getBalance();
        console.log(`Current Balance: ${balance} ETH`);
      }

      console.log(
        `Balance is above 0.05 ETH. Proceeding to next transaction (${
          i + 1
        }/10).`
      );
    } catch (error) {
      console.error(`Error in transaction ${i + 1}:`, error);
      break; // Exit loop if a transaction fails
    }
  }
}

// Memanggil fungsi main
main().catch(console.error);
