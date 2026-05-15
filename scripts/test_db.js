const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
const match = envContent.match(/MONGODB_URI="?([^\n"]+)"?/);
const uri = match ? match[1] : null;

async function testConnection() {
  if (!uri) {
    console.error('ERROR: MONGODB_URI bulunamadı.');
    process.exit(1);
  }
  try {
    console.log('Bağlanılıyor:', uri.replace(/:([^:@]+)@/, ':***@'));
    await mongoose.connect(uri);
    console.log('SUCCESS: Veritabanı bağlantısı BAŞARILI!');
    process.exit(0);
  } catch (err) {
    console.error('ERROR: Veritabanı bağlantısı BAŞARISIZ!');
    console.error(err.message);
    process.exit(1);
  }
}

testConnection();
