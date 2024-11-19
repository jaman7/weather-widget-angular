const path = require('path');
const fs = require('fs');

// Read package.json
const packageJsonPath = path.resolve(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Generate build environment details
const buildTimestamp = new Date().toISOString();
const buildEnvironment = `
const buildEnvironment = {
  production: true,
  version: '${packageJson.version}',
  buildTimestamp: '${buildTimestamp}'
};

export default buildEnvironment;
`;

// Write to src/environments/build-environment.ts
const outputPath = path.resolve(__dirname, 'src/environments/build-environment.ts');
fs.writeFileSync(outputPath, buildEnvironment, 'utf8');
console.log('Build environment file generated successfully!');
