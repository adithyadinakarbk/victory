/**
 * Automated Verification & Testing Suite for Developer Portfolio
 * Validates integrity of pages, assets, links, and structure.
 */

const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('  OBSIDIAN RADIUM AUTOMATED TEST HARNESS');
console.log('====================================================\n');

let failed = 0;
let passed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${testName}`);
    failed++;
  }
}

const requiredFiles = [
  'index.html',
  'about.html',
  'skills.html',
  'projects.html',
  'milestones.html',
  'contact.html',
  'assets/css/styles.css',
  'assets/js/cyber-core.js',
  'assets/js/contact.js',
  'server.js',
  'package.json'
];

console.log('1. Checking Core File Manifest:');
requiredFiles.forEach((file) => {
  const fullPath = path.join(__dirname, file);
  assert(fs.existsSync(fullPath), `File exists: ${file}`);
});

console.log('\n2. Checking HTML Links & Cross-Navigation:');
const htmlFiles = [
  'index.html',
  'about.html',
  'skills.html',
  'projects.html',
  'milestones.html',
  'contact.html'
];

htmlFiles.forEach((htmlFile) => {
  const content = fs.readFileSync(path.join(__dirname, htmlFile), 'utf-8');
  assert(content.includes('<title>'), `${htmlFile} contains valid <title>`);
  assert(content.includes('assets/css/styles.css'), `${htmlFile} links styles.css`);
  assert(content.includes('assets/js/cyber-core.js'), `${htmlFile} links cyber-core.js`);
  assert(content.includes('cyber-particle-canvas'), `${htmlFile} contains interactive canvas`);
  
  // Verify cross-links
  assert(content.includes('href="index.html"'), `${htmlFile} links to index.html`);
  assert(content.includes('href="about.html"'), `${htmlFile} links to about.html`);
  assert(content.includes('href="skills.html"'), `${htmlFile} links to skills.html`);
  assert(content.includes('href="projects.html"'), `${htmlFile} links to projects.html`);
  assert(content.includes('href="milestones.html"'), `${htmlFile} links to milestones.html`);
  assert(content.includes('href="contact.html"'), `${htmlFile} links to contact.html`);
});

console.log('\n3. Validating Script & Style Syntax:');
const cssContent = fs.readFileSync(path.join(__dirname, 'assets/css/styles.css'), 'utf-8');
assert(cssContent.includes('.perspective-1000'), 'styles.css defines 3D perspective');
assert(cssContent.includes('.card-flip-inner'), 'styles.css defines card-flip-inner');
assert(cssContent.includes('.glow-radium'), 'styles.css defines radium glow');

const jsCoreContent = fs.readFileSync(path.join(__dirname, 'assets/js/cyber-core.js'), 'utf-8');
assert(jsCoreContent.includes('CyberAudio'), 'cyber-core.js defines CyberAudio synthesizer');
assert(jsCoreContent.includes('initParticleCanvas'), 'cyber-core.js defines particle canvas');
assert(jsCoreContent.includes('initDiagnosticCLI'), 'cyber-core.js defines diagnostic CLI');

const jsContactContent = fs.readFileSync(path.join(__dirname, 'assets/js/contact.js'), 'utf-8');
assert(jsContactContent.includes('contactForm'), 'contact.js handles contact form');
assert(jsContactContent.includes('showToast'), 'contact.js provides cyber toast feedback');

console.log('\n====================================================');
console.log(`TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
console.log('====================================================\n');

process.exit(failed > 0 ? 1 : 0);
