import GIFEncoder from 'gif-encoder-2';
import { createWriteStream, readFileSync } from 'fs';
import { PNG } from 'pngjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'docs', 'screenshots');
const outPath = path.join(outDir, 'homepage-scroll.gif');

// Read the full-page homepage screenshot and create a scrolling GIF
const fullPage = PNG.sync.read(readFileSync(path.join(outDir, 'homepage.png')));
const { width: srcW, height: srcH } = fullPage;

// Target GIF dimensions (scaled down for file size)
const gifW = Math.min(720, srcW);
const scale = gifW / srcW;
const viewH = Math.round(450 * (srcW / 1440)); // viewport height proportional
const gifH = Math.round(viewH * scale);

console.log(`Source: ${srcW}x${srcH}, GIF: ${gifW}x${gifH}, scale: ${scale.toFixed(2)}`);

// Generate frames by sliding a viewport window down the page
const scrollStep = Math.round(viewH * 0.7);
const frames = [];
for (let y = 0; y + viewH <= srcH; y += scrollStep) {
  frames.push(y);
}
// Add last frame at bottom
if (frames[frames.length - 1] + viewH < srcH) {
  frames.push(srcH - viewH);
}

console.log(`Generating ${frames.length} frames...`);

const encoder = new GIFEncoder(gifW, gifH);
const output = createWriteStream(outPath);
encoder.createReadStream().pipe(output);

encoder.start();
encoder.setDelay(600);
encoder.setRepeat(0);
encoder.setQuality(15);

for (let i = 0; i < frames.length; i++) {
  const y = frames[i];
  // Extract viewport region and scale
  const frameData = Buffer.alloc(gifW * gifH * 4);

  for (let gy = 0; gy < gifH; gy++) {
    for (let gx = 0; gx < gifW; gx++) {
      const srcX = Math.min(Math.round(gx / scale), srcW - 1);
      const srcY = Math.min(Math.round(gy / scale) + y, srcH - 1);
      const srcIdx = (srcY * srcW + srcX) * 4;
      const dstIdx = (gy * gifW + gx) * 4;
      frameData[dstIdx] = fullPage.data[srcIdx];
      frameData[dstIdx + 1] = fullPage.data[srcIdx + 1];
      frameData[dstIdx + 2] = fullPage.data[srcIdx + 2];
      frameData[dstIdx + 3] = fullPage.data[srcIdx + 3];
    }
  }

  encoder.addFrame(frameData);
  process.stdout.write(`\rFrame ${i + 1}/${frames.length}`);
}

encoder.finish();
console.log(`\nGIF saved: ${outPath}`);
await new Promise(resolve => output.on('finish', resolve));
