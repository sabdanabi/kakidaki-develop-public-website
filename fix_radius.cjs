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

  // Downgrade excessive border radius to match the tighter look of the dashboard
  content = content.replace(/\brounded-2xl\b/g, 'rounded-xl');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully tweaked border radius: ${relativePath}`);
});
