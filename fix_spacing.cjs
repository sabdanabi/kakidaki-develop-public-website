const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Reduce gaps
  content = content.replace(/\bgap-(8|10|12|14|16)\b/g, 'gap-5');
  content = content.replace(/\bgap-6\b/g, 'gap-4');
  
  // Reduce margins
  content = content.replace(/\bmb-(8|10|12|14|16|20|24)\b/g, 'mb-6');
  content = content.replace(/\bmt-(8|10|12|14|16|20|24)\b/g, 'mt-6');
  content = content.replace(/\bmy-(8|10|12|14|16|20|24)\b/g, 'my-6');
  
  // Reduce paddings
  content = content.replace(/\bp-(8|10|12|14|16|20)\b/g, 'p-6');
  content = content.replace(/\bpy-(10|12|14|16|20|24)\b/g, 'py-8');
  content = content.replace(/\bpx-(10|12|14|16|20|24)\b/g, 'px-8');

  // Reduce space-y/x
  content = content.replace(/\bspace-y-(8|10|12)\b/g, 'space-y-5');
  content = content.replace(/\bspace-x-(8|10|12)\b/g, 'space-x-5');

  // Standardize font sizes
  // Avoid massive fonts:
  content = content.replace(/\btext-7xl\b/g, 'text-4xl');
  content = content.replace(/\btext-6xl\b/g, 'text-4xl');
  content = content.replace(/\btext-5xl\b/g, 'text-3xl');
  content = content.replace(/\btext-4xl\b/g, 'text-2xl');
  
  // We already fixed text-[9px] etc in the previous script to text-xs, but let's make sure
  content = content.replace(/\btext-\[1[0-2]px\]\b/g, 'text-xs');
  content = content.replace(/\btext-\[9px\]\b/g, 'text-xs');
  content = content.replace(/\btext-\[8px\]\b/g, 'text-xs');

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
