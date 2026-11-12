import { mkdir, copyFile } from 'node:fs/promises';
import { dirname } from 'node:path';
const files = ['index.html', 'styles.css', 'app.js', 'content.js', 'clinical.js', 'sw.js', 'manifest.webmanifest', 'icon.svg', 'assets/colisao-aph-640.webp', 'assets/colisao-aph-960.webp'];
await mkdir('dist', { recursive: true });
await Promise.all(files.map(async file => {
  await mkdir(dirname(`dist/${file}`), { recursive: true });
  await copyFile(file, `dist/${file}`);
}));
console.log(`Build pronto: ${files.length} arquivos em dist/.`);
