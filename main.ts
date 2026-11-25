import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The epitaph: one line, original, no stage directions, no explanation.
// Twist: the first person ever to actually read the terms and conditions —
// and it bored him to death.
const ENTRY =
  "Here lies the first person to read the terms and conditions. He died of boredom.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, ENTRY, "utf8");

// Self-verification gate: fail hard if the written entry breaks any rule.
const written = readFileSync(outputPath, "utf8");
const charCount = [...written].length;
if (written !== ENTRY) throw new Error("entry mismatch after write");
if (charCount < 1 || charCount > 150) {
  throw new Error(`entry must be 1-150 characters, got ${charCount}`);
}
if (written.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (written.includes("\n") || written.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (written.endsWith("\n")) {
  throw new Error("entry must not end with a trailing newline");
}

console.log(`Wrote ${charCount} characters to ${outputPath}`);
