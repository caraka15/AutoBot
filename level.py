import json

# Baca data dari pointTaikoons.json
with open('data/pointTaikoons.json', 'r') as file:
    data = json.load(file)

# Sortir data berdasarkan rank dari terkecil ke terbesar
sorted_data = sorted(data, key=lambda x: x['rank'])

# Inisialisasi level 14 dan level 13
level_14 = []
level_13 = []

# Kelompokkan data ke dalam level 14 dan level 13
for entry in sorted_data:
    if entry['rank'] <= 50:
        level_14.append(entry)
    elif 51 <= entry['rank'] <= 500:
        level_13.append(entry)

# Buat dictionary untuk hasilnya
sorted_taikoons = {
    "level_14": level_14,
    "level_13": level_13
}

# Simpan hasil ke dalam sortedTaikoons.json
with open('data/sortedTaikoons.json', 'w') as file:
    json.dump(sorted_taikoons, file, indent=4)

# Log jumlah address
total_500 = len(level_14) + len(level_13)
level_14_count = len(level_14)
level_13_count = len(level_13)

print(f"Holder Taikoons yang masuk dalam 500 besar berjumlah {total_500} address")
print(f"Level 14: {level_14_count} address")
print(f"Level 13: {level_13_count} address")

# Output to a log file (optional)
with open('data/taikoons_log.txt', 'w') as log_file:
    log_file.write(f"Holder Taikoons yang masuk dalam 500 besar berjumlah {total_500} address\n")
    log_file.write(f"Level 14: {level_14_count} address\n")
    log_file.write(f"Level 13: {level_13_count} address\n")
