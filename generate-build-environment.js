const path = require('path');
const fs = require('fs');

const packageJsonPath = path.resolve(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const buildTimestamp = new Date().toISOString();
const buildEnvironment = `
const buildEnvironment = {
  production: true,
  version: '${packageJson.version}',
  buildTimestamp: '${buildTimestamp}'
};

export default buildEnvironment;
`;

const outputPath = path.resolve(__dirname, 'src/environments/build-environment.ts');
fs.writeFileSync(outputPath, buildEnvironment, 'utf8');
console.log('Build environment file generated successfully!');
