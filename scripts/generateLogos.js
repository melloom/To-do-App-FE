import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import Logo from '../src/components/common/Logo';

// Define the sizes for the logos
const sizes = [
  { name: 'logo192.png', size: 192 },
  { name: 'logo512.png', size: 512 },
  { name: 'favicon.ico', size: 48 }
];

// Create the public directory if it doesn't exist
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate SVG for each size
sizes.forEach(({ name, size }) => {
  const svg = ReactDOMServer.renderToString(
    <Logo width={size} height={size} />
  );
  
  const outputPath = path.join(publicDir, name);
  
  // For simplicity, we're just writing the SVG directly
  // In a real project, you might want to convert SVG to PNG or ICO
  fs.writeFileSync(outputPath.replace(/\.png|\.ico$/, '.svg'), svg);
  
  console.log(`Created ${name.replace(/\.png|\.ico$/, '.svg')}`);
});

// Update manifest.json to use SVG files instead
const manifestPath = path.join(publicDir, 'manifest.json');
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  
  manifest.icons = [
    {
      "src": "favicon.svg",
      "sizes": "48x48",
      "type": "image/svg+xml"
    },
    {
      "src": "logo192.svg",
      "type": "image/svg+xml",
      "sizes": "192x192"
    },
    {
      "src": "logo512.svg",
      "type": "image/svg+xml",
      "sizes": "512x512"
    }
  ];
  
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('Updated manifest.json');
}