// import React, { useState } from 'react';
import { useState } from 'react';
import './SurahVerseSelector.css'

const verseIntSelector = {
    1: 7,    // Surah Al-Fatiha
    2: 286,  // Surah Al-Baqarah
    3: 200,  // Surah Aal-E-Imran
    4: 176,  // Surah An-Nisa
    5: 120,  // Surah Al-Ma'idah
    6: 165,  // Surah Al-An'am
    7: 206,  // Surah Al-A'raf
    8: 75,   // Surah Al-Anfal
    9: 129,  // Surah At-Tawbah
    10: 109, // Surah Yunus
    11: 123, // Surah Hud
    12: 111, // Surah Yusuf
    13: 43,  // Surah Ar-Ra'd
    14: 52,  // Surah Ibrahim
    15: 99,  // Surah Al-Hijr
    16: 128, // Surah An-Nahl
    17: 111, // Surah Al-Isra
    18: 110, // Surah Al-Kahf
    19: 98,  // Surah Maryam
    20: 135, // Surah Ta-Ha
    21: 112, // Surah Al-Anbiya
    22: 78,  // Surah Al-Hajj
    23: 118, // Surah Al-Mu'minun
    24: 64,  // Surah An-Nur
    25: 77,  // Surah Al-Furqan
    26: 227, // Surah Ash-Shu'ara
    27: 55,  // Surah An-Naml
    28: 88,  // Surah Al-Qasas
    29: 69,  // Surah Al-Ankabut
    30: 60,  // Surah Ar-Rum
    31: 34,  // Surah Luqman
    32: 30,  // Surah As-Sajda
    33: 73,  // Surah Al-Ahzab
    34: 54,  // Surah Saba
    35: 45,  // Surah Fatir
    36: 83,  // Surah Ya-Sin
    37: 182, // Surah As-Saffat
    38: 88,  // Surah Sad
    39: 75,  // Surah Az-Zumar
    40: 85,  // Surah Ghafir
    41: 54,  // Surah Fussilat
    42: 53,  // Surah Ash-Shura
    43: 89,  // Surah Az-Zukhruf
    44: 59,  // Surah Ad-Dukhan
    45: 37,  // Surah Al-Ahqaf
    46: 35,  // Surah Al-Ahqaf
    47: 38,  // Surah Muhammad
    48: 29,  // Surah Al-Fath
    49: 18,  // Surah Al-Hujurat
    50: 45,  // Surah Qaf
    51: 60,  // Surah Adh-Dhariyat
    52: 49,  // Surah At-Tur
    53: 62,  // Surah An-Najm
    54: 55,  // Surah Al-Qamar
    55: 78,  // Surah Ar-Rahman
    56: 96,  // Surah Al-Waqi'a
    57: 29,  // Surah Al-Hadid
    58: 14,  // Surah Al-Mujadila
    59: 24,  // Surah Al-Hashr
    60: 13,  // Surah Al-Mumtahina
    61: 14,  // Surah As-Saff
    62: 11,  // Surah Al-Jumu'a
    63: 11,  // Surah Al-Munafiqun
    64: 18,  // Surah At-Taghabun
    65: 12,  // Surah At-Talaq
    66: 12,  // Surah At-Tahrim
    67: 30,  // Surah Al-Mulk
    68: 52,  // Surah Al-Qalam
    69: 52,  // Surah Al-Haqqah
    70: 44,  // Surah Al-Ma'arij
    71: 28,  // Surah Nuh
    72: 28,  // Surah Al-Jinn
    73: 20,  // Surah Al-Muzzammil
    74: 56,  // Surah Al-Muddathir
    75: 40,  // Surah Al-Qiyama
    76: 31,  // Surah Al-Insan
    77: 50,  // Surah Al-Mursalat
    78: 40,  // Surah An-Naba
    79: 46,  // Surah An-Nazi'at
    80: 42,  // Surah Abasa
    81: 29,  // Surah At-Takwir
    82: 19,  // Surah Al-Infitar
    83: 36,  // Surah Al-Mutaffifin
    84: 25,  // Surah Al-Inshiqaq
    85: 22,  // Surah Al-Buruj
    86: 17,  // Surah At-Tariq
    87: 19,  // Surah Al-A'la
    88: 26,  // Surah Al-Ghashiyah
    89: 30,  // Surah Al-Fajr
    90: 20,  // Surah Al-Balad
    91: 15,  // Surah Ash-Shams
    92: 21,  // Surah Al-Lail
    93: 11,  // Surah Ad-Duha
    94: 8,   // Surah Ash-Sharh
    95: 8,   // Surah At-Tin
    96: 19,  // Surah Al-Alaq
    97: 5,   // Surah Al-Qadr
    98: 8,   // Surah Al-Bayyina
    99: 8,   // Surah Az-Zalzalah
    100: 11,  // Surah Al-Adiyat
    101: 11,  // Surah Al-Qari'ah
    102: 8,   // Surah At-Takathur
    103: 3,   // Surah Al-Asr
    104: 9,   // Surah Al-Humazah
    105: 5,   // Surah Al-Fil
    106: 4,   // Surah Quraish
    107: 7,   // Surah Al-Ma'un
    108: 3,   // Surah Al-Kawthar
    109: 6,   // Surah Al-Kafirun
    110: 3,   // Surah An-Nasr
    111: 5,   // Surah Al-Masad
    112: 4,   // Surah Al-Ikhlas
    113: 9,   // Surah Al-Falaq
    114: 6    // Surah An-Nas
  };
  

const SurahVerseSelector = ({ onChange }) => {
  const [selectedSurah, setSelectedSurah] = useState('');
  const [selectedVerse, setSelectedVerse] = useState('');

  const handleSurahChange = (event) => {
    const surah = event.target.value ? parseInt(event.target.value) : null; // <-- convert to integer
    setSelectedSurah(surah);
    setSelectedVerse(''); // Reset verse when Surah changes
    onChange(surah, null); // send integer (or null) to parent
  };
  
  const handleVerseChange = (event) => {
    const verse = event.target.value ? parseInt(event.target.value) : null; // <-- convert to integer
    setSelectedVerse(verse);
    onChange(selectedSurah, verse); // send integers to parent
  };

  const verseOptions = selectedSurah
    ? Array.from({ length: verseIntSelector[selectedSurah] }, (_, i) => i + 1)
    : [];

  return (
    <div className='surah-verse-selector'>
      <select value={selectedSurah} onChange={handleSurahChange}>
        <option value="">Select Surah</option>
        {Object.keys(verseIntSelector).map((surah) => (
          <option key={surah} value={surah}>
            Surah {surah}
          </option>
        ))}
      </select>

      {selectedSurah && (
        <select value={selectedVerse} onChange={handleVerseChange}>
          <option value="">Select Verse</option>
          {verseOptions.map((verse) => (
            <option key={verse} value={verse}>
              Verse {verse}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SurahVerseSelector;
