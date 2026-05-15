const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'assets', 'avatars');

async function convert() {
  for(let i=1; i<=10; i++) {
    const pngPath = path.join(dir, `avatar_${i.toString().padStart(2, '0')}.png`);
    const webpPath = path.join(dir, `avatar_${i.toString().padStart(2, '0')}.webp`);
    if(fs.existsSync(pngPath)) {
      await sharp(pngPath).webp().toFile(webpPath);
      fs.unlinkSync(pngPath);
      console.log(`Converted to ${webpPath}`);
    }
  }
}

convert().catch(console.error);
