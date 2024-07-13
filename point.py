import json
import requests

# Baca alamat dari taikoon.json
with open('user_data.json', 'r') as file:
    user_data = json.load(file)

# Extract all addresses from the user data
addresses = []
for user_id, user_info in user_data.items():
    if 'addresses' in user_info:
        addresses.extend(user_info['addresses'])

# Fungsi untuk mendapatkan rank dan score dari API
def get_rank_and_score(address):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, seperti Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    try:
        response = requests.get(f'https://trailblazer.mainnet.taiko.xyz/user/rank?address={address}', headers=headers)
        if response.status_code == 200:
            data = response.json()
            rank = data.get('rank')
            score = int(data.get('score', 0))  # Menghilangkan koma di belakang
            return {
                'address': address,
                'rank': rank,
                'score': score
            }
        else:
            print(f"Error fetching data for address {address}: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error fetching data for address {address}: {e}")
        return None

# Fungsi utama untuk mengumpulkan rank dan score untuk setiap alamat
def collect_rank_and_score():
    results = []
    for address in addresses:
        data = get_rank_and_score(address)
        if data:
            results.append(data)
            print(f"Address: {address} - Rank: {data['rank']}, Score: {data['score']}")
    # Urutkan hasil berdasarkan rank terbesar
    sorted_results = sorted(results, key=lambda x: x['rank'])
    # Simpan hasil ke dalam file JSON
    with open('data/pointUser.json', 'w') as file:
        json.dump(sorted_results, file, indent=2)
    print('Data saved to pointTaikoons.json')

# Jalankan fungsi utama
if __name__ == "__main__":
    collect_rank_and_score()
