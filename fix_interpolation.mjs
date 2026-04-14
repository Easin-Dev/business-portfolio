import fs from 'fs';
let content = fs.readFileSync('src/app/pricing/page.jsx', 'utf8');
content = content.replace(/\\\$/g, '$');
fs.writeFileSync('src/app/pricing/page.jsx', content);
