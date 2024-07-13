# Bot Auto Transaksi untuk Jaringan Taiko

Bot ini adalah bot auto transaksi untuk jaringan Taiko yang dapat melakukan transaksi deposit native, mengelola WETH, dan mengelola transaksi bridge. Bot ini dikontrol melalui perintah di Telegram.

## Fitur

- **Transaksi Deposit Native**: Mengirimkan transaksi deposit native ke kontrak pintar di jaringan Taiko.
- **Push WETH Transaction**: Mengirimkan dan menarik WETH.
- **Bridge Transaction**: Mengelola transaksi bridge menggunakan deposit dan withdraw ETH.

## Persyaratan

- Node.js
- npm (Node Package Manager)
- Akun Telegram untuk membuat bot
- Private key dari wallet Anda
- Smart contract address dan ABI

## Instalasi

1. **Clone repositori ini:**
    ```sh
    git clone https://github.com/caraka15/AutoBot.git
    cd AutoBot
    ```

2. **Instal dependensi:**
    ```sh
    npm install
    ```

3. **Buat file `.env` dan tambahkan private key dan token bot Telegram Anda:**
    ```sh
    echo "PRIVATE_KEY=your_private_key_here" > .env
    ```

4. **Pastikan Anda telah menginstal dotenv:**
    ```sh
    npm install dotenv
    ```
