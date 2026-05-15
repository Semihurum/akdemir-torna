const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(__dirname, 'public', 'assets', 'avatars');

const styles = ['bottts', 'bottts', 'bottts', 'bottts', 'bottts', 'bottts', 'bottts', 'bottts', 'bottts', 'bottts'];
const seeds = ['worker', 'welder', 'gear', 'metal', 'industry', 'robot', 'steel', 'factory', 'mechanic', 'engine'];

async function download() {
  for(let i=0; i<10; i++) {
    const filename = `avatar_${(i+1).toString().padStart(2, '0')}.png`;
    const filepath = path.join(dir, filename);
    const url = `https://api.dicebear.com/7.x/${styles[i]}/png?seed=${seeds[i]}&backgroundColor=f97316,333333,e2e8f0`;
    
    await new Promise((resolve) => {
      https.get(url, (res) => {
        const file = fs.createWriteStream(filepath);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded ${filename}`);
          resolve();
        });
      });
    });
  }
}

download().catch(console.error);
