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
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Fix Colors
  content = content.replace(/\bbg-primary\b/g, 'bg-[#023C23]');
  content = content.replace(/\bbg-primary-(\d+)\b/g, 'bg-[#023C23]/$1'); // handle opacity if any, though standard is bg-green-700
  content = content.replace(/\btext-primary\b/g, 'text-[#023C23]');
  content = content.replace(/\bborder-primary\b/g, 'border-[#023C23]');
  content = content.replace(/\bring-primary\b/g, 'ring-[#023C23]');
  content = content.replace(/\bbg-primary-600\b/g, 'bg-emerald-700');
  content = content.replace(/\btext-primary-600\b/g, 'text-emerald-700');

  content = content.replace(/\btext-danger\b/g, 'text-red-500');
  content = content.replace(/\bbg-danger\b/g, 'bg-red-500');
  content = content.replace(/\bfrom-danger-800\b/g, 'from-red-900');
  content = content.replace(/\bto-primary-800\b/g, 'to-[#023C23]');

  // 2. Fix Font Sizes from custom config to Tailwind standards
  content = content.replace(/\btext-display-hero-mobile md:text-display-hero\b/g, 'text-4xl md:text-5xl lg:text-6xl');
  content = content.replace(/\btext-display-hero\b/g, 'text-5xl lg:text-6xl');
  content = content.replace(/\btext-headline-lg\b/g, 'text-3xl md:text-4xl');
  content = content.replace(/\btext-headline-md\b/g, 'text-2xl md:text-3xl');
  content = content.replace(/\btext-headline-sm\b/g, 'text-xl md:text-2xl');
  content = content.replace(/\btext-body-lg\b/g, 'text-base md:text-lg');
  content = content.replace(/\btext-body-md\b/g, 'text-sm md:text-base');
  content = content.replace(/\btext-body-sm\b/g, 'text-sm');
  content = content.replace(/\btext-label-bold\b/g, 'text-xs md:text-sm');
  content = content.replace(/\btext-label-md\b/g, 'text-xs md:text-sm');

  // Fix button radius (convert rounded-lg or rounded-3xl to standard rounded-xl or 2.5rem if needed, but safe replace: buttons)
  content = content.replace(/rounded-lg bg-\[#023C23\]/g, 'rounded-xl bg-[#023C23]');
  content = content.replace(/rounded-lg border border-slate-200/g, 'rounded-xl border border-slate-200');

  // Clean up double spaces
  content = content.replace(/ +"/g, '"');
  content = content.replace(/" +/g, '"');
  content = content.replace(/  +/g, ' ');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully processed colors and spacing: ${relativePath}`);
});
