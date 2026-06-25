import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const portfolioTs = path.join(root, "src/content/portfolio.ts");
const publicDir = path.join(root, "public");

const CARD_WIDTH = 640;

function toThumbPublicPath(imagePath) {
  const relative = imagePath.replace(/^\/images\/portfolio\//, "");
  const parsed = path.parse(relative);
  const dir = parsed.dir ? `${parsed.dir}/` : "";
  return `/images/portfolio/_thumbs/${dir}${parsed.name}.jpg`;
}

function toDiskPath(publicPath) {
  return path.join(publicDir, publicPath.replace(/^\//, ""));
}

async function collectCoverPaths() {
  const source = await readFile(portfolioTs, "utf8");
  const matches = source.matchAll(
    /"(\/images\/portfolio\/[^"]+\.(?:jpg|jpeg|png|webp))"/gi,
  );
  const paths = new Set();

  for (const match of matches) {
    paths.add(match[1]);
  }

  return [...paths];
}

async function generateThumbWithSips(imagePath) {
  const inputPath = toDiskPath(imagePath);
  const thumbPublicPath = toThumbPublicPath(imagePath);
  const outputPath = toDiskPath(thumbPublicPath);

  if (!existsSync(inputPath)) {
    throw new Error(`missing source ${inputPath}`);
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  execFileSync("sips", [
    "-Z",
    String(CARD_WIDTH),
    "-s",
    "format",
    "jpeg",
    "-s",
    "formatOptions",
    "72",
    inputPath,
    "--out",
    outputPath,
  ]);

  const inputStat = await stat(inputPath);
  const outputStat = await stat(outputPath);

  return {
    imagePath,
    thumbPublicPath,
    inputKb: Math.round(inputStat.size / 1024),
    outputKb: Math.round(outputStat.size / 1024),
  };
}

async function main() {
  if (process.platform !== "darwin") {
    console.log("skip thumb generation on non-macOS (use committed thumbs).");
    return;
  }

  const paths = await collectCoverPaths();
  const results = [];

  for (const imagePath of paths) {
    try {
      results.push(await generateThumbWithSips(imagePath));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`skip ${imagePath}:`, message);
    }
  }

  const manifest = Object.fromEntries(
    results.map(({ imagePath, thumbPublicPath }) => [imagePath, thumbPublicPath]),
  );

  await mkdir(path.join(root, "src/generated"), { recursive: true });
  await writeFile(
    path.join(root, "src/generated/portfolio-thumbs.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  const savedKb = results.reduce(
    (sum, item) => sum + item.inputKb - item.outputKb,
    0,
  );

  console.log(`Generated ${results.length} portfolio thumbs (~${savedKb} KB saved).`);
}

await main();
