import fs from 'node:fs';
import path from 'node:path';
import {JSDOM} from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  pretendToBeVisual: true,
});
global.window = dom.window;
global.document = dom.window.document;
Object.defineProperty(global, 'navigator', {
  value: dom.window.navigator,
  configurable: true,
});

const mermaid = (await import('mermaid')).default;
mermaid.initialize({startOnLoad: false});
const root = 'notes';

function findNotes(dir) {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return findNotes(full);
    return entry.isFile() && entry.name.endsWith('.md') ? [full] : [];
  });
}

const files = findNotes(root).sort();

let total = 0;
let failed = 0;

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n');
  let i = 0;
  let n = 0;
  while (i < lines.length) {
    if (lines[i].trim() === '```mermaid') {
      const start = i + 1;
      let j = start;
      while (j < lines.length && lines[j].trim() !== '```') j++;
      const code = lines.slice(start, j).join('\n');
      n++;
      total++;
      try {
        await mermaid.parse(code);
      } catch (err) {
        failed++;
        console.log(`FAIL ${file} block #${n} (line ${start + 1})`);
        console.log(`     ${String(err.message).split('\n')[0]}`);
      }
      i = j;
    }
    i++;
  }
  if (n) console.log(`  ${file}: ${n} mermaid diagram(s)`);
}

console.log(`\nTotal diagrams: ${total} | failed: ${failed}`);
process.exit(failed ? 1 : 0);
