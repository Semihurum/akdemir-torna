const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'avatars');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

(async () => {
  try {
    const seeds = ["robot", "gear", "welder", "metal", "orange", "mascot", "icon", "worker", "sparks", "steel"];
    for(let i=1; i<=10; i++) {
      const seed = seeds[i-1];
      const url = `https://api.dicebear.com/7.x/bottts/png?seed=${seed}&backgroundColor=f97316,333333`;
      // We download PNG and name it webp just as a placeholder, or we can use an API that returns webp.
      // Dicebear supports png/svg/json. We will save as .webp extension although it's png, browsers will render it, 
      // but to be clean, let's use webp endpoint if available, actually dicebear 7.x supports webp:
      const webpUrl = `https://api.dicebear.com/7.x/bottts/webp?seed=${seed}&backgroundColor=f97316,333333`;
      const filename = `avatar_${i.toString().padStart(2, '0')}.webp`;
      await download(webpUrl, path.join(dir, filename));
      console.log('Downloaded', filename);
    }
  } catch(e) {
    console.error(e);
  }
})();
