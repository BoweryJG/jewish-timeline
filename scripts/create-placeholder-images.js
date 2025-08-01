const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// New events that need images
const newEvents = [
  { filename: 'october-7-attack.jpg', title: 'October 7 Hamas Attack', color: '#8B0000' },
  { filename: 'operation-swords-iron.jpg', title: 'Operation Swords of Iron', color: '#FF4500' },
  { filename: 'global-jewish-unity.jpg', title: 'Global Jewish Unity', color: '#FFD700' },
  { filename: 'hostage-release.jpg', title: 'First Hostage Release', color: '#4169E1' },
  { filename: 'israel-resilience-2024.jpg', title: 'Resilience and Rebuilding', color: '#228B22' }
];

// Create placeholder images
newEvents.forEach(event => {
  const width = 1200;
  const height = 800;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, event.color);
  gradient.addColorStop(1, '#000000');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add some visual texture
  for (let i = 0; i < 50; i++) {
    ctx.beginPath();
    ctx.arc(
      Math.random() * width,
      Math.random() * height,
      Math.random() * 100 + 50,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.05})`;
    ctx.fill();
  }

  // Add title text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  // Wrap text if needed
  const words = event.title.split(' ');
  const lines = [];
  let currentLine = words[0];
  
  for (let i = 1; i < words.length; i++) {
    const testLine = currentLine + ' ' + words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > width - 100) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  
  // Draw text lines
  const lineHeight = 60;
  const startY = height / 2 - (lines.length - 1) * lineHeight / 2;
  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, startY + index * lineHeight);
  });

  // Add date placeholder
  ctx.font = '24px Arial';
  ctx.fillStyle = '#CCCCCC';
  ctx.fillText('2023-2024', width / 2, height - 50);

  // Save the image
  const outputPath = path.join(__dirname, '..', 'frontend', 'public', 'images', 'events', event.filename);
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
  fs.writeFileSync(outputPath, buffer);
  console.log(`Created placeholder image: ${event.filename}`);
});

console.log('All placeholder images created!');