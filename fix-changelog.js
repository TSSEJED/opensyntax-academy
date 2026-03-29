const fs = require('fs');

let content = fs.readFileSync('app/changelog/page.tsx', 'utf8');
content = content.replace(/`([^`]+)`/g, '<code>$1</code>');
fs.writeFileSync('app/changelog/page.tsx', content);
