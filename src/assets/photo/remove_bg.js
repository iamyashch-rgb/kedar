import sharp from 'sharp';

const inputPath = 'd:/kedar/src/assets/photo/1.jpg';
const outputPath = 'd:/kedar/src/assets/photo/logo-transparent.png';
const publicPath = 'd:/kedar/public/logo-transparent.png';

async function processImage() {
  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const rgbaBuffer = Buffer.alloc(width * height * 4);

  let minX = width, minY = height, maxX = 0, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const targetIdx = (y * width + x) * 4;

      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

      let alpha = 255;
      if (brightness < 18) {
        alpha = 0;
      } else if (brightness < 60) {
        alpha = Math.round(((brightness - 18) / (60 - 18)) * 255);
      }

      rgbaBuffer[targetIdx] = r;
      rgbaBuffer[targetIdx + 1] = g;
      rgbaBuffer[targetIdx + 2] = b;
      rgbaBuffer[targetIdx + 3] = alpha;

      if (alpha > 30) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Exact 0px padding tight crop
  const cropLeft = Math.max(0, minX);
  const cropTop = Math.max(0, minY);
  const croppedWidth = Math.min(width - cropLeft, maxX - minX + 1);
  const croppedHeight = Math.min(height - cropTop, maxY - minY + 1);

  await sharp(rgbaBuffer, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .extract({
      left: cropLeft,
      top: cropTop,
      width: croppedWidth,
      height: croppedHeight,
    })
    .png()
    .toFile(outputPath);

  await sharp(outputPath).toFile(publicPath);

  console.log(`SUCCESS: Tight cropped logo (0px padding) saved to ${outputPath}`);
}

processImage().catch(console.error);
