const fs = require('fs');
const path = require('path');

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove 'uppercase' class
  content = content.replace(/\buppercase\b\s*/g, '');

  // 2. Fix small arbitrary text sizes
  content = content.replace(/text-\[9px\]/g, 'text-xs');
  content = content.replace(/text-\[10px\]/g, 'text-xs');
  content = content.replace(/text-\[11px\]/g, 'text-xs');

  // 3. Find font-heading and replace font weights > medium with font-medium
  content = content.replace(/class="([^"]*)"/g, (match, classes) => {
    if (classes.includes('font-heading')) {
      classes = classes.replace(/\b(font-semibold|font-bold|font-extrabold|font-black)\b/g, 'font-medium');
    }
    return `class="${classes}"`;
  });

  // 4. Fix ALL CAPS text nodes. Find text inside > TEXT < and convert to Title Case.
  content = content.replace(/>([^<]+)</g, (match, text) => {
    if (text.trim().length > 0 && text.trim() === text.trim().toUpperCase() && /[A-Z]/.test(text)) {
      return `>${toTitleCase(text)}<`;
    }
    return match;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed: ${filePath}`);
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.vue')) {
      processFile(fullPath);
    }
  }
}

const targetDir = process.argv[2] || 'app/pages';
walk(path.join(__dirname, targetDir));
