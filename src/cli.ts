#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { ESLint } from "eslint";
import plugin from "./index.js";

type Options = {
  apply: boolean;
  exts: string[];
  config?: string;
  paths: string[];
};

function parseArgs(argv: string[]): Options {
  const opts: Options = { apply: false, exts: [".ts", ".tsx", ".jsx"], paths: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--apply") opts.apply = true;
    else if (a === "--check") opts.apply = false;
    else if (a === "--ext") opts.exts = (argv[++i] || "").split(",").map(s => s.trim()).filter(Boolean);
    else if (a === "--config") opts.config = argv[++i];
    else if (!a.startsWith("--")) opts.paths.push(a);
  }
  if (opts.paths.length === 0) opts.paths = ["."];
  return opts;
}

function loadRuleOverrides(configPath?: string) {
  if (!configPath) return {};
  const raw = fs.readFileSync(configPath, "utf8");
  const json = JSON.parse(raw);
  return json.rules || {};
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const ruleOverrides = loadRuleOverrides(opts.config);

  const eslint = new ESLint({
    fix: opts.apply,
    useEslintrc: false,
    overrideConfig: {
      parser: "@typescript-eslint/parser",
      parserOptions: { ecmaVersion: 2022, sourceType: "module", ecmaFeatures: { jsx: true } },
      plugins: { "a11y-safe": plugin } as any,
      rules: {
        "a11y-safe/img-alt-empty-when-aria-hidden": "error",
        "a11y-safe/aria-label-from-title": "error",
        ...ruleOverrides
      }
    },
    extensions: opts.exts
  });

  const results = await eslint.lintFiles(opts.paths);
  if (opts.apply) await ESLint.outputFixes(results);

  const formatter = await eslint.loadFormatter("stylish");
  const text = formatter.format(results);
  if (text) console.log(text);

  const errorCount = results.reduce((sum: number, r: any) => sum + r.errorCount, 0);
  const fixed = results.reduce((sum: number, r: any) => sum + (r.output ? 1 : 0), 0);

  console.log(`${results.length} file(s) checked, ${fixed} fix(es) applied`);

  if (errorCount > 0 && !opts.apply) process.exit(2);
}

main().catch(err => {
  console.error(err?.message || err);
  process.exit(1);
});
