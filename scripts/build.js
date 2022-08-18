import { promises as fs } from 'node:fs';
import { URL } from 'node:url';

let mod = await fs.readFile(new URL('../index.js', import.meta.url), 'utf-8');

mod = mod.replace(
    'export default',
    'module.exports ='
);

await fs.writeFile(new URL('../index.cjs', import.meta.url), mod);
