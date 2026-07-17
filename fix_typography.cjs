const fs = require('fs');
const path = require('path');

const filesToProcess = [
  'app/pages/trainingDasboard.vue',
  'app/pages/weatherDasboard.vue',
  'app/pages/health.vue'
];

filesToProcess.forEach(relativePath => {
  const filePath = path.join(__dirname, relativePath);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Cap all font weights to font-medium (remove bold, semibold, extrabold, black)
  content = content.replace(/\bfont-(semibold|bold|extrabold|black)\b/g, 'font-medium');

  // 2. Remove tracking-wide, tracking-wider, tracking-widest so it defaults to tight
  content = content.replace(/\btracking-(wide|wider|widest)\b/g, '');

  // Clean up any double spaces created by removing classes
  content = content.replace(/ +"/g, '"');
  content = content.replace(/" +/g, '"');
  content = content.replace(/  +/g, ' ');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully processed: ${relativePath}`);
});
