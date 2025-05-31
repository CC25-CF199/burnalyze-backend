const treatments = {
  '1st degree burn': {
    class: 'Tingkat 1',
    desc: 'Terdeteksi adanya luka bakar kulit tingkat satu. Jenis luka bakar ini dapat menyebabkan pembengkakan dan peradangan ringan, kemerahan, dan nyeri ringan.',
    treatments: [
      'Bilas area terdampak dengan air dingin',
      'Hindari penggunaan es batu',
      'Tutup luka bakar dengan kain bersih atau perban steril',
      'Berikan olesan petroleum jelly atau gel lidah buaya untuk memberikan efek menyejukkan pada luka',
      'Hindari penggunaan minyak, losion, atau krim pada luka bakar',
    ],
  },
  '2nd degree burn': {
    class: 'Tingkat 2',
    desc: 'Terdeteksi adanya luka bakar kulit tingkat dua. Jenis luka bakar ini dapat menyebabkan kemerahan, bengkak, nyeri, dan bahkan kulit melepuh. Disarankan melakukan perawatan yang tepat guna mencegah infeksi.',
    treatments: [
      'Gunakan kompres atau rendam luka dalam air sejuk selama 10-15 menit',
      'Hindari penggunaan es batu',
      'Hindari memecahkan lepuhan luka untuk mencegah infeksi',
      'Tutup luka dengan perban steril',
      'Segera periksakan ke rumah sakit apabila luka bakar melebar',
    ],
  },
  '3rd degree burn': {
    class: 'Tingkat 3',
    desc: 'Terdeteksi adanya luka bakar kulit tingkat tiga. Jenis luka bakar ini merupakan yang paling parah karena mencakup kerusakan seluruh lapisan kulit hingga jaringan dibawahnya. Kami sangat menyarankan anda untuk segera menghubungi tenaga medis untuk mendapatkan penanganan yang tepat. Namun ada beberapa hal yang dapat anda lakukan sebelum mendapat pertolongan medis',
    treatments: [
      'Jauhkan korban dari sumber penyebab luka bakar',
      'Gunakan perban steril untuk menutupi area luka',
      'Hindari merendam luka bakar di dalam air',
      'Jangan oleskan salep atau krim tanpa anjuran dokter',
      'Pisahkan jari kaki atau tangan yang terluka menggunakan perban atau kain steril',
    ],
  },
};

module.exports = { treatments };
