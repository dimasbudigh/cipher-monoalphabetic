// script.js

// Abjad Standar (untuk pemetaan)
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Fungsi untuk memvalidasi kunci substitusi.
 * @param {string} key - Kunci yang dimasukkan pengguna.
 * @returns {boolean} - True jika kunci valid, false jika tidak.
 */
function validateKey(key) {
  if (key.length !== 26) {
    return false;
  }
  const upperKey = key.toUpperCase();
  const uniqueChars = new Set(upperKey.split(""));

  // Cek apakah semua karakter adalah huruf dan unik
  if (uniqueChars.size !== 26) {
    return false;
  }
  for (let char of uniqueChars) {
    if (!ALPHABET.includes(char)) {
      return false;
    }
  }
  return true;
}

/**
 * Fungsi utama untuk melakukan Monoalphabetic Cipher.
 * @param {string} text - Teks input (plaintext atau ciphertext).
 * @param {string} key - Kunci substitusi (26 huruf).
 * @param {boolean} encryptMode - true untuk enkripsi, false untuk dekripsi.
 * @returns {string} - Hasil enkripsi atau dekripsi.
 */
function monoalphabeticCipher(text, key, encryptMode) {
  const KEY_UPPER = key.toUpperCase();
  let result = "";

  // Tentukan pemetaan:
  let sourceMap = encryptMode ? ALPHABET : KEY_UPPER; // Sumber: ALPHABET (enkripsi) atau KEY (dekripsi)
  let targetMap = encryptMode ? KEY_UPPER : ALPHABET; // Target: KEY (enkripsi) atau ALPHABET (dekripsi)

  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    let upperChar = char.toUpperCase();
    let charIndex = sourceMap.indexOf(upperChar); // Cari posisi karakter di abjad sumber

    if (charIndex !== -1) {
      // Karakter adalah huruf
      let newChar = targetMap[charIndex]; // Ambil karakter baru dari abjad target

      // Pertahankan kasus (case) asli dari karakter
      if (char === upperChar) {
        // Huruf Kapital
        result += newChar;
      } else {
        // Huruf Kecil
        result += newChar.toLowerCase();
      }
    } else {
      // Bukan huruf (angka, spasi, tanda baca), biarkan tidak berubah
      result += char;
    }
  }
  return result;
}

function enkripsi() {
  const plaintext = document.getElementById("plaintext").value;
  const key = document.getElementById("key").value.trim();

  if (!validateKey(key)) {
    alert("Kunci tidak valid! Pastikan kunci terdiri dari 26 huruf unik.");
    return;
  }

  const ciphertext = monoalphabeticCipher(plaintext, key, true);
  document.getElementById("ciphertext").value = ciphertext;
}

function dekripsi() {
  const ciphertext = document.getElementById("ciphertext").value;
  const key = document.getElementById("key").value.trim();

  if (!validateKey(key)) {
    alert("Kunci tidak valid! Pastikan kunci terdiri dari 26 huruf unik.");
    return;
  }

  const plaintext = monoalphabeticCipher(ciphertext, key, false);
  document.getElementById("plaintext").value = plaintext;
}
