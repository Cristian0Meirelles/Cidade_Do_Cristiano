import fs from "node:fs";
import path from "node:path";

const SRC = "src";
const DIST = "dist";
const LANGS = ["pt", "en", "es", "fr", "de", "ja"];
const HTML_LANG = { pt: "pt-BR" };
const PT_ONLY = ["terminal"];

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const source = path.join(from, entry.name);
    const target = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyDir(source, target);
    } else {
      fs.copyFileSync(source, target);
    }
  }
}

function toPattern(text) {
  return text
    .split(/(\s+|<br>)/)
    .map((part) => {
      if (/^\s+$/.test(part)) return "\\s+";
      if (part === "<br>") return "<br\\s*/?>";
      return part
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .replace(/>/g, "\\s*>\\s*")
        .replace(/</g, "\\s*<")
        .replace(/:/g, ":\\s*");
    })
    .join("");
}

function translate(html, entries, lang, used) {
  const byLength = [...entries].sort((a, b) => b.pt.length - a.pt.length);
  const pattern = new RegExp(
    "(?<![\\p{L}\\p{N}_])(?:" +
      byLength.map((entry) => `(${toPattern(entry.pt)})`).join("|") +
      ")(?![\\p{L}\\p{N}_])",
    "gu",
  );
  return html.replace(pattern, (match, ...groups) => {
    const index = groups.findIndex((group) => group !== undefined);
    used.add(byLength[index].pt);
    return byLength[index][lang];
  });
}

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST);

for (const item of [
  "index.html",
  "favicon.svg",
  "favicon.ico",
  "apple-touch-icon.png",
  "css",
  "js",
  "shared",
  "assets",
]) {
  const source = path.join(SRC, item);
  const target = path.join(DIST, item);
  if (fs.statSync(source).isDirectory()) {
    copyDir(source, target);
  } else {
    fs.copyFileSync(source, target);
  }
}

const unused = [];

for (const file of fs.readdirSync(path.join(SRC, "places"))) {
  const place = path.basename(file, ".html");
  const html = fs.readFileSync(path.join(SRC, "places", file), "utf8");
  const i18nFile = path.join(SRC, "i18n", `${place}.json`);
  const entries = fs.existsSync(i18nFile)
    ? JSON.parse(fs.readFileSync(i18nFile, "utf8"))
    : [];
  const used = new Set();

  for (const lang of LANGS) {
    if (lang !== "pt" && PT_ONLY.includes(place)) continue;

    let output = html;
    if (lang !== "pt") {
      output = translate(html, entries, lang, used).replace(
        '<html lang="pt-BR">',
        `<html lang="${HTML_LANG[lang] || lang}">`,
      );
    }

    const dir = path.join(DIST, lang, place);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), output);
  }

  for (const entry of entries) {
    if (!used.has(entry.pt)) unused.push(`${place}: ${entry.pt}`);
  }
}

if (unused.length) {
  console.warn(`Unused translations (${unused.length}):`);
  for (const line of unused) console.warn(`  ${line}`);
}

console.log("Build complete: dist/");
