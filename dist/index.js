#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import fg from "fast-glob";

const HELP_TEXT = `
a11y-safe-autofix
Apply safe accessibility autofixes (currently: missing img alt).

Usage:
  a11y-safe-autofix --paths src
  a11y-safe-autofix --paths . --write
  a11y-safe-autofix --paths . --check --json

Options:
  --paths <globs>     Comma-separated paths or glob patterns (default: .)
  --extensions <list> Comma-separated extensions (default: html,htm)
  --write             Write fixes to disk (default: dry-run)
  --dry-run           Do not modify files (default)
  --check             Exit 2 if issues are found
  --json              Emit machine-readable JSON
  -h, --help          Show help

Exit codes:
  0 success
  1 runtime/config error
  2 issues found (when --check is set)
`.trim();

function printHelp() {
  console.log(HELP_TEXT);
}

function parseArgs(argv) {
  const opts = {
    paths: ["."],
    extensions: ["html", "htm"],
    write: false,
    json: false,
    check: false,
    help: false
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") {
      opts.help = true;
      continue;
    }
    if (a === "--paths") {
      const value = argv[++i];
      if (!value) throw new Error("Missing value for --paths");
      opts.paths = value
        .split(",")
        .map(part => part.trim())
        .filter(Boolean);
      continue;
    }
    if (a === "--extensions") {
      const value = argv[++i];
      if (!value) throw new Error("Missing value for --extensions");
      opts.extensions = value
        .split(",")
        .map(part => part.trim().replace(/^\./, "").toLowerCase())
        .filter(Boolean);
      continue;
    }
    if (a === "--write") {
      opts.write = true;
      continue;
    }
    if (a === "--dry-run") {
      opts.write = false;
      continue;
    }
    if (a === "--check") {
      opts.check = true;
      continue;
    }
    if (a === "--json") {
      opts.json = true;
      continue;
    }
    if (a.startsWith("-")) {
      throw new Error(`Unknown option: ${a}`);
    }
  }
  return opts;
}

function hasGlob(value) {
  return /[*?[\]{}]/.test(value);
}

function normalizePatterns(pathsList, extensions) {
  const extPattern = extensions.length > 0 ? `**/*.{${extensions.join(",")}}` : "**/*";
  const patterns = [];
  for (const entry of pathsList) {
    const value = entry.trim();
    if (!value) continue;
    if (hasGlob(value)) {
      patterns.push(value);
      continue;
    }
    const absolute = path.resolve(value);
    if (fs.existsSync(absolute) && fs.statSync(absolute).isDirectory()) {
      const normalized = value.replace(/\\/g, "/").replace(/\/$/, "");
      patterns.push(`${normalized}/${extPattern}`);
      continue;
    }
    patterns.push(value);
  }
  return patterns;
}

function indexToLineCol(text, index) {
  const slice = text.slice(0, index);
  const lines = slice.split("\n");
  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
}

function fixHtml(content, file) {
  const issues = [];
  const imgRegex = /<img\b[^>]*>/gi;

  const updated = content.replace(imgRegex, (tag, offset) => {
    if (/\balt\s*=\s*/i.test(tag)) return tag;
    const location = indexToLineCol(content, offset);
    issues.push({
      file,
      line: location.line,
      column: location.column,
      rule: "img-alt",
      message: "Image tag missing alt attribute",
      fix: "Add alt=\"\""
    });
    return tag.replace(/\s*\/?>$/, match => ` alt=\"\"${match}`);
  });

  return { updated, issues };
}

async function main() {
  let opts;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
    printHelp();
    process.exit(1);
    return;
  }

  if (opts.help) {
    printHelp();
    return;
  }

  const patterns = normalizePatterns(opts.paths, opts.extensions);
  const files = await fg(patterns, {
    onlyFiles: true,
    unique: true,
    ignore: ["**/node_modules/**", "**/dist/**", "**/.git/**"]
  });

  if (files.length === 0) {
    console.error(`No files matched. Check --paths and --extensions.`);
    process.exit(1);
    return;
  }

  let totalIssues = 0;
  let fixedCount = 0;
  const allIssues = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const { updated, issues } = fixHtml(content, file);
    if (issues.length > 0) {
      totalIssues += issues.length;
      allIssues.push(...issues);
    }
    if (opts.write && updated !== content) {
      fs.writeFileSync(file, updated, "utf8");
      fixedCount += issues.length;
    }
  }

  if (opts.json) {
    console.log(
      JSON.stringify(
        {
          filesChecked: files.length,
          issuesFound: totalIssues,
          issuesFixed: opts.write ? fixedCount : 0,
          write: opts.write,
          issues: allIssues
        },
        null,
        2
      )
    );
  } else {
    console.log(`Checked ${files.length} file(s).`);
    console.log(`Issues found: ${totalIssues}`);
    if (opts.write) console.log(`Issues fixed: ${fixedCount}`);
    for (const issue of allIssues) {
      console.log(`${issue.file}:${issue.line}:${issue.column} ${issue.rule} - ${issue.message}`);
    }
  }

  if (opts.check && totalIssues > 0) {
    process.exit(2);
  }
}

main().catch(err => {
  console.error(err?.message || err);
  process.exit(1);
});
