const fs = require('fs');
const path = require('path');

function fixFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixFiles(fullPath);
        } else if (fullPath.endsWith('page.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Replace double backslash + backtick with single backslash + backtick
            content = content.replace(/\\\\`/g, '\\`');
            fs.writeFileSync(fullPath, content);
        }
    }
}

fixFiles('app/courses');
