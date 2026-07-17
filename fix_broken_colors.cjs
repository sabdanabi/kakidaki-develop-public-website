const fs = require('fs');
const path = require('path');

const filesToProcess = [
  'app/pages/index.vue',
  'app/pages/login.vue',
  'app/pages/register.vue',
  'app/pages/onboarding.vue'
];

filesToProcess.forEach(relativePath => {
  const filePath = path.join(__dirname, relativePath);
  if (!fs.existsSync(filePath)) {
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix broken color classes
  content = content.replace(/bg-\[#023C23\]-(\d+)/g, 'bg-emerald-$1');
  content = content.replace(/text-\[#023C23\]-(\d+)/g, 'text-emerald-$1');
  content = content.replace(/bg-red-500-(\d+)/g, 'bg-red-$1');
  content = content.replace(/text-red-500-(\d+)/g, 'text-red-$1');

  fs.writeFileSync(filePath, content, 'utf8');
});
