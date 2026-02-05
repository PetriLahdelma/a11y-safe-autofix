import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const branding = JSON.parse(fs.readFileSync(path.join(root, 'branding.json'), 'utf8'));
const styles = fs.readFileSync(path.join(root, 'assets/styles.css'), 'utf8');
const template = fs.readFileSync(path.join(root, 'assets/before-after.html'), 'utf8');

function beforeAfterHtml(ba) {
  if (!ba) return '';
  return `
    <div class="card"><h4>Before</h4><p>${ba.before}</p></div>
    <div class="card"><h4>After</h4><p>${ba.after}</p></div>
  `;
}

const html = template
  .replace('{{STYLES}}', styles)
  .replace('{{W}}', '1200')
  .replace('{{H}}', '300')
  .replace('{{ACCENT_A}}', branding.accent?.[0] || '#6D28D9')
  .replace('{{ACCENT_B}}', branding.accent?.[1] || '#0EA5E9')
  .replace('{{BEFORE_AFTER}}', beforeAfterHtml(branding.beforeAfter));

const outHtml = path.join(root, 'assets/.before-after.html');
fs.writeFileSync(outHtml, html);

if (!branding.beforeAfter) process.exit(0);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 300 } });
await page.goto('file://' + outHtml, { waitUntil: 'networkidle' });
await page.screenshot({ path: path.join(root, 'assets/before-after.png') });
await browser.close();
