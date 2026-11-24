import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Five stars: he asks me at 3 a.m. to explain his own code, then argues with the answer like he wrote it himself.";

function main() {
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
  }
  if (LINE.trim() !== LINE) {
    throw new Error("line must not start or end with whitespace");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const path = join(outDir, "entry.txt");
  writeFileSync(path, LINE, "utf8");
  const back = readFileSync(path, "utf8");
  if (back !== LINE) {
    throw new Error("round-trip check failed: file does not match the line");
  }
  console.log(`wrote ${LINE.length} characters to ${path}`);
  console.log(LINE);
}

main();
