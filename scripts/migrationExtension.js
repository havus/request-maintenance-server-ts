import fs from 'fs';

const targets = [
  './dist/config/typeorm.js',
];


function changeExtensionFile(filename) {
  const fileContents = fs.readFileSync(filename, 'utf8');

  if (targets.includes(filename)) {
    const newContents = fileContents.replace(/\.ts"/g, '.js"');

    fs.writeFileSync(filename, newContents);
  }
};

targets.forEach(changeExtensionFile);
