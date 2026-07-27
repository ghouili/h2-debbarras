import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const publicDir = path.resolve(process.cwd(), "public");
const sourceLogo = path.join(publicDir, "logo.png");

async function ensureSource() {
  try {
    await fs.access(sourceLogo);
  } catch {
    throw new Error("Missing source logo at public/logo.png");
  }
}

async function writePng(outputPath, size) {
  await sharp(sourceLogo)
    .resize(size, size, { fit: "contain" })
    .png({ quality: 90 })
    .toFile(outputPath);
}

async function writeFavicon(outputPath) {
  const buffer = await sharp(sourceLogo)
    .resize(48, 48, { fit: "contain" })
    .png({ quality: 90 })
    .toBuffer();
  const ico = await pngToIco(buffer);
  await fs.writeFile(outputPath, ico);
}

async function main() {
  await ensureSource();

  await writePng(path.join(publicDir, "icon-192.png"), 192);
  await writePng(path.join(publicDir, "icon-512.png"), 512);
  await writePng(path.join(publicDir, "logo-512.png"), 512);
  await writePng(path.join(publicDir, "apple-touch-icon.png"), 180);
  await writeFavicon(path.join(publicDir, "favicon.ico"));

  console.log("Generated favicon and icon assets in /public");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
