import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distCli = path.join(root, "dist", "index.js");
const fixture = path.join(root, "test", "fixtures", "sample.html");

assert.ok(fs.existsSync(distCli), "dist CLI missing - run build first");
assert.ok(fs.existsSync(fixture), "fixture missing");

const run = args =>
  spawnSync(process.execPath, [distCli, ...args], {
    encoding: "utf8"
  });

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "a11y-safe-"));
const tmpFile = path.join(tmpDir, "sample.html");
fs.copyFileSync(fixture, tmpFile);

const jsonRun = run(["--paths", tmpDir, "--json"]);
assert.equal(jsonRun.status, 0, jsonRun.stderr);
const report = JSON.parse(jsonRun.stdout);
assert.equal(report.issuesFound, 1);

const writeRun = run(["--paths", tmpDir, "--write"]);
assert.equal(writeRun.status, 0, writeRun.stderr);
const updated = fs.readFileSync(tmpFile, "utf8");
assert.match(updated, /alt=""/);

const cleanRun = run(["--paths", tmpDir, "--json"]);
assert.equal(cleanRun.status, 0);
const cleanReport = JSON.parse(cleanRun.stdout);
assert.equal(cleanReport.issuesFound, 0);

const badFile = path.join(tmpDir, "bad.html");
fs.writeFileSync(badFile, "<img src=\"x.png\">");
const checkRun = run(["--paths", tmpDir, "--check"]);
assert.equal(checkRun.status, 2);

console.log("cli.test.js ok");
