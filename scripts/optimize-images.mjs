import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(process.cwd(), "public");
const outputRoot = path.join(root, "optimized");

const heroImages = [
  { src: "after.png", name: "hero-after" },
  { src: "hero-before.png", name: "hero-before" },
];

const beforeAfterImages = [
  { src: "before-paris-arrart-01.png", name: "before-paris-arrart-01" },
  { src: "after-paris-arrart-01.png", name: "after-paris-arrart-01" },
  { src: "top-appar-before.png", name: "top-appar-before" },
  { src: "top-appar-after.png", name: "top-appar-after" },
  { src: "clean-empty-basement-before-clearance.png", name: "clean-empty-basement-before-clearance" },
  { src: "clean-empty-basement-after-clearance.png", name: "clean-empty-basement-after-clearance" },
  { src: "clean-empty-house-before-clearance.png", name: "clean-empty-house-before-clearance" },
  { src: "clean-empty-house-after-clearance.jpg", name: "clean-empty-house-after-clearance" },
];

const iconImages = [
  { src: "special-icon.png", name: "special-icon" },
  { src: "departement-icon.png", name: "departement-icon" },
  { src: "devis-icon.png", name: "devis-icon" },
  { src: "devis-icon-white.png", name: "devis-icon-white" },
];

const heroWidths = [320, 480, 640, 800, 1024, 1200];
const galleryWidths = [320, 480, 640, 800, 1024];
const iconWidths = [16, 20, 32, 40];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function generateVariants({ src, name }, widths, outDir, formats) {
  const inputPath = path.join(root, src);
  const image = sharp(inputPath);
  const meta = await image.metadata();

  const validWidths = widths.filter((w) => !meta.width || w <= meta.width);

  for (const width of validWidths) {
    for (const format of formats) {
      const fileName = `${name}-w${width}.${format}`;
      const outputPath = path.join(outDir, fileName);
      const pipeline = sharp(inputPath).resize({ width, withoutEnlargement: true });

      if (format === "avif") {
        await pipeline.avif({ quality: 45, effort: 6 }).toFile(outputPath);
      } else if (format === "webp") {
        await pipeline.webp({ quality: 70, effort: 6 }).toFile(outputPath);
      } else if (format === "png") {
        await pipeline.png({ compressionLevel: 9 }).toFile(outputPath);
      } else if (format === "jpg" || format === "jpeg") {
        await pipeline.jpeg({ quality: 80, mozjpeg: true }).toFile(outputPath);
      }
    }
  }
}

async function main() {
  const heroDir = path.join(outputRoot, "hero");
  const beforeAfterDir = path.join(outputRoot, "before-after");
  const iconDir = path.join(outputRoot, "icons");

  await Promise.all([ensureDir(heroDir), ensureDir(beforeAfterDir), ensureDir(iconDir)]);

  for (const image of heroImages) {
    await generateVariants(image, heroWidths, heroDir, ["avif", "webp"]);
  }

  for (const image of beforeAfterImages) {
    await generateVariants(image, galleryWidths, beforeAfterDir, ["avif", "webp"]);
  }

  for (const image of iconImages) {
    await generateVariants(image, iconWidths, iconDir, ["png"]);
  }

  console.log("Image optimization complete.");
  console.log("Outputs in /public/optimized");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
