import { mkdir, copyFile } from 'node:fs/promises';
const files = ['index.html', 'styles.css', 'app.js', 'content.js', 'clinical.js', 'sw.js', 'manifest.webmanifest', 'icon.svg'];
await mkdir('dist', { recursive: true });
await Promise.all(files.map(file => copyFile(file, `dist/${file}`)));
console.log(`Build pronto: ${files.length} arquivos em dist/.`);
